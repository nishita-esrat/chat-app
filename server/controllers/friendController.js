const Friend = require("../modal/friendModal");
const { createNotification } = require("../utility/notifications");

// sent friend request
const sendFriendReq = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.body;

    const isFriend = await Friend.findOne({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id },
      ],
    });

    if (isFriend) {
      return res.status(200).json({
        success: false,
        message: "Friend request already exists",
      });
    }

    const newFriendReq = await Friend.create({ sender_id, receiver_id });

    const populatedRequest = await Friend.findById(newFriendReq._id)
      .populate({
        path: "sender_id",
        select: "name avatar.image",
      })
      .populate({
        path: "receiver_id",
        select: "name avatar.image",
      });

    const notification = await createNotification(
      receiver_id,
      sender_id,
      "friend_request",
      `${populatedRequest.sender_id.name} sent you friend requested`
    );

    return res.status(201).json({
      success: true,
      message: "Friend request sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// accepted friend request
const acceptedFriendReq = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.body;

    const isFriend = await Friend.findOne({
      sender_id: receiver_id,
      receiver_id: sender_id,
    });

    if (!isFriend) {
      return res.status(200).json({
        success: false,
        message: "Friend request not found",
      });
    }

    isFriend.status = "accepted";
    await isFriend.save({ validateBeforeSave: false });

    const populatedRequest = await Friend.findById(isFriend._id)
      .populate({
        path: "sender_id",
        select: "name avatar.image",
      })
      .populate({
        path: "receiver_id",
        select: "name avatar.image",
      });

    const notification = await createNotification(
      receiver_id,
      sender_id,
      "friend_request",
      `${populatedRequest.receiver_id.name} accepted your friend request`
    );

    return res.status(201).json({
      success: true,
      message: "Friend request accepted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// rejected friend request
const rejectedFriendReq = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.body;

    const isFriend = await Friend.findOne({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id },
      ],
    });

    if (!isFriend) {
      return res.status(200).json({
        success: false,
        message: "Friend request not found",
      });
    }

    await Friend.deleteOne({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Friend request rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// get all friend request
const allFriendReq = async (req, res) => {
  try {
    const id = req.id;

    const friends = await Friend.find({ receiver_id: id, status: "pending" })
      .populate({
        path: "sender_id",
        select: "name avatar.image",
      })
      .populate({
        path: "receiver_id",
        select: "name avatar.image",
      });

    return res.status(200).json({
      success: true,
      friends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// get all friend
const allFriends = async (req, res) => {
  try {
    const id = req.id;

    const friends = await Friend.find({
      $or: [{ sender_id: id }, { receiver_id: id }],
      status: "accepted",
    }).populate("sender_id receiver_id", "name avatar.image");

    res.status(200).json({
      success: true,
      friends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = {
  sendFriendReq,
  acceptedFriendReq,
  rejectedFriendReq,
  allFriendReq,
  allFriends,
};
