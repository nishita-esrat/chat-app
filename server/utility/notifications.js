const Notification = require("../modal/notificationModal");

const createNotification = async (recipients, sender_id, type,content) => {
  const notification = await Notification.create({
    recipients,
    sender_id,
    type,
    content,
  });

  return notification;
};

module.exports = {createNotification}