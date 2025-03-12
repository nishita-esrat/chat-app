const Conversation = require("../modal/conversationModal");
const { createNotification } = require("../utility/notifications");

const createGroup = async (req, res) => {
  try {
    const { group_name, participants } = req.body;
    const admin = req.id;

    if (!group_name || !participants || participants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Group name and participants are required",
      });
    }

    if (!participants.includes(admin)) {
      participants.push(admin);
    }

    const group = await Conversation.create({
      type: "group",
      group_name,
      participants,
      admin_ids: [admin],
    });

    const notification = await createNotification(
      participants,
      admin,
      "group_activity",
      `You have been added to the group ${group.group_name}`
    );

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: group,
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { createGroup };
