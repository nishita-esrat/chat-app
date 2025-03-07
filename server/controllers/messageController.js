const cloudinaryUploadImage = require("../utility/uploadImage");
const Conversation = require("../modal/conversationModal");
const Message = require("../modal/messageModal");
const { createNotification } = require("../utility/notifications");

// send message
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
      receiver_id,
      sender_id,
      "message",
      content
    );

    return res.status(201).json({
      success: true,
      data: newMessage,
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

module.exports = { sendMessage, markSeenMessage };
