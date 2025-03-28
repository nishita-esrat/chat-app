const cloudinaryUploadImage = require("../utility/uploadImage");
const Conversation = require("../modal/conversationModal");
const Message = require("../modal/messageModal");
const { createNotification } = require("../utility/notifications");
const cloudinaryDeleteImage = require("../utility/deleteImage");

// send message one-one and group msg
const sendMessage = async (req, res) => {
  try {
    const { conversation_id, receiver_id, shared_from, text, attachment } =
      req.body;
    const sender_id = req.id;
    const messageData = { sender_id };
    let notification_msg;

    if (text) {
      messageData.text = text;
      notification_msg = text.slice(0, 15);
    }

    if (attachment) {
      // Upload new image to Cloudinary
      const uploadedImage = await cloudinaryUploadImage(
        attachment,
        "attachment"
      );
      if (!uploadedImage || !uploadedImage.url || !uploadedImage.public_id) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      } // Update user avatar with new image details
      messageData.attachment = {
        image: uploadedImage.url,
        public_id: uploadedImage.public_id,
      };
      notification_msg = "sent a photo";
    }

    if (shared_from) {
      messageData.shared_from = shared_from;
      notification_msg = "shared message";
    }

    let conversation = conversation_id
      ? await Conversation.findById(conversation_id)
      : await Conversation.create({
          type: "one-to-one",
          participants: [sender_id, receiver_id],
        });

    messageData.conversation_id = conversation._id;
    // Create the new message
    const newMessage = await new Message(messageData).save();

    const populatedMessage = await Message.findById(newMessage._id)
      .populate({
        path: "sender_id",
        select: "name", // Populate sender with only specific fields
      })
      .exec();

    // **Emit message via Socket.io**
    // if receiver_id offline or receiver_id online but don't see msg.then send notification
    const content = `${populatedMessage.sender_id.name} : ${notification_msg}`;
    const notification = await createNotification(
      receiver_id
        ? receiver_id
        : conversation.participants.filter((receiver) => receiver != sender_id),
      sender_id,
      "message",
      content
    );

    return res.status(201).json({
      success: true,
      data: newMessage,
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// mark as unseen msg into seen msg
const markSeenMessage = async (req, res) => {
  try {
    const { conversation_id } = req.body;
    const receiver_id = req.id;

    const seenMsg = await Message.updateMany(
      {
        conversation_id,
        sender_id: { $ne: receiver_id },
        is_seen: { $nin: [receiver_id] },
      },
      { $push: { is_seen: receiver_id } }
    );

    return res.status(200).json({
      success: true,
      message: "Messages marked as seen.",
      modifiedCount: seenMsg.modifiedCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// delete message by admin or sender id
const deleteMessage = async (req, res) => {
  try {
    const { message_id } = req.params;
    const user_id = req.id; // Assuming req.id is the authenticated user's ID

    // Find the message first
    const message = await Message.findById(message_id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // Find the conversation
    const conversation = await Conversation.findById(message.conversation_id);
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }

    // Check if user is an admin or the sender of the message
    const isAdmin =
      Array.isArray(conversation.admin_ids) &&
      conversation.admin_ids.includes(user_id);
    const isSender = message.sender_id.toString() === user_id;

    if (isAdmin || isSender) {
      if (message.attachment.image && message.attachment.public_id) {
        const deleteImage = await cloudinaryDeleteImage(
          message.attachment.public_id
        );
        if (deleteImage !== "ok") {
          return res.status(500).json({
            success: false,
            message: "Failed to delete image from Cloudinary",
          });
        }
      }

      await Message.deleteOne({ _id: message_id });
      return res
        .status(200)
        .json({ success: true, message: "Message deleted successfully" });
    }

    // If the user is neither admin nor sender, deny access
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this message",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// update message
const updateMessage = async (req, res) => {
  try {
    const { message_id } = req.params;
    const { text } = req.body;
    const sender_id = req.id;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Message text is required" });
    }

    // Find the message first
    const message = await Message.findById(message_id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // Check if the sender is updating their own message
    if (message.sender_id.toString() === sender_id) {
      const updatedMessage = await Message.findByIdAndUpdate(
        message_id,
        { $set: { text, is_updated: true } },
        { new: true } // Returns the updated document
      );

      return res.status(200).json({
        success: true,
        message: "Message updated successfully",
        data: updatedMessage,
      });
    }

    // Unauthorized case
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this message",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// message reaction
const reactionsMessage = async (req, res) => {
  try {
    const { message_id } = req.params;
    const { type } = req.body;
    const sender_id = req.id; // Authenticated user's ID

    // Validate input
    if (!type) {
      return res
        .status(400)
        .json({ success: false, message: "Reaction type is required" });
    }

    // Find the message first
    const message = await Message.findById(message_id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // Check if the user has already reacted with the same type
    const reactionIndex = message.reactions.findIndex(
      (r) => r.user_id.toString() === sender_id && r.type === type
    );

    let updatedMessage;
    if (reactionIndex !== -1) {
      // Remove existing reaction
      updatedMessage = await Message.findByIdAndUpdate(
        message_id,
        { $pull: { reactions: { user_id: sender_id, type } } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Your reaction was removed",
        updatedMessage,
      });
    }

    // Add new reaction
    updatedMessage = await Message.findByIdAndUpdate(
      message_id,
      { $push: { reactions: { user_id: sender_id, type } } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "You reacted to this message",
      updatedMessage,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// get all reacted user
const reactionUser = async (req, res) => {
  try {
    const { message_id } = req.params;

    // Find the message first
    const message = await Message.findById(message_id).populate({
      path: "reactions.user_id", // Assuming user_id references the User model
      select: "name avatar", // Customize fields you want to include
    });
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Reactions retrieved successfully",
      total_reactions: message.reactions.length,
      data: message.reactions,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

module.exports = {
  sendMessage,
  markSeenMessage,
  deleteMessage,
  updateMessage,
  reactionsMessage,
  reactionUser,
};
