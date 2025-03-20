const Notification = require("../modal/notificationModal");

// all notifications
const allNotifications = async (req, res) => {
  try {
    const user_id = req.id;

    const notifications = await Notification.find({
      recipients: user_id,
    });

    return res.status(201).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

//delete notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// update notification
const readNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.id;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { $push: { is_read_by: user_id } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { allNotifications, deleteNotification, readNotification };
