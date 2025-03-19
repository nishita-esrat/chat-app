const Conversation = require("../modal/conversationModal");
const { createNotification } = require("../utility/notifications");
const mongoose = require("mongoose");

// new group
const createGroup = async (req, res) => {
  try {
    const { group_name, participants } = req.body;
    const admin = req.id;
    const notification_participants = [...participants];

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
      notification_participants,
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

// add member
const addNewMember = async (req, res) => {
  try {
    const { new_member, conversation_id } = req.body;
    const user_id = req.id;

    const conversation = await Conversation.findById(conversation_id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Check if user is an admin
    if (!conversation.admin_ids.includes(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add members to this group",
      });
    }

    // Check if the new member is already in the group
    if (conversation.participants.includes(new_member)) {
      return res.status(400).json({
        success: false,
        message: "User is already a participant in the group",
      });
    }

    // Add new member
    const group = await Conversation.findByIdAndUpdate(
      conversation_id,
      { $push: { participants: new_member } },
      { new: true } // Return updated conversation
    );

    const notification = await createNotification(
      new_member,
      user_id,
      "group_activity",
      `You have been added to the group ${group.group_name}`
    );

    return res.status(200).json({
      success: true,
      message: `User added successfully to ${group.group_name}`,
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

// remove member
const removeMember = async (req, res) => {
  try {
    const { member, conversation_id } = req.body;
    const user_id = req.id;

    const conversation = await Conversation.findById(conversation_id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Check if user is an admin
    if (!conversation.admin_ids.includes(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to remove members from this group",
      });
    }

    // Prevent admins from removing another admin
    if (conversation.admin_ids.includes(member)) {
      return res.status(403).json({
        success: false,
        message: "You cannot remove another admin from the group",
      });
    }

    // Check if the new member is already in the group
    if (!conversation.participants.includes(member)) {
      return res.status(400).json({
        success: false,
        message: "User is not a participant in the group",
      });
    }

    // remove new member
    const group = await Conversation.findByIdAndUpdate(
      conversation_id,
      { $pull: { participants: member } },
      { new: true } // Return updated conversation
    );

    const notification = await createNotification(
      member,
      user_id,
      "group_activity",
      `You have been removed to the group ${group.group_name}`
    );

    return res.status(200).json({
      success: true,
      message: `User removed successfully to ${group.group_name}`,
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

// make admin
const makeAdmin = async (req, res) => {
  try {
    const { member, conversation_id } = req.body;
    const user_id = req.id;

    const conversation = await Conversation.findById(conversation_id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Check if user is an admin
    if (!conversation.admin_ids.includes(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to make admin this person",
      });
    }

    // Check if the member is already in the group
    if (!conversation.participants.includes(member)) {
      return res.status(400).json({
        success: false,
        message: "User is not a participant in the group",
      });
    }

    // Prevent admins to make admin who is already admin
    if (conversation.admin_ids.includes(member)) {
      return res.status(403).json({
        success: false,
        message: "User is already an admin",
      });
    }

    const group = await Conversation.findByIdAndUpdate(
      conversation_id,
      { $addToSet: { admin_ids: member } },
      { new: true } // Return updated conversation
    );

    const notification = await createNotification(
      member,
      user_id,
      "group_activity",
      `You have been made an admin in the group ${group.group_name}`
    );

    return res.status(200).json({
      success: true,
      message: `User made admin successfully in ${group.group_name}`,
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

// remove from admin
const removeAdmin = async (req, res) => {
  try {
    const { member, conversation_id } = req.body;
    const user_id = req.id;

    const conversation = await Conversation.findById(conversation_id);

    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }


    if (!conversation.admin_ids.includes(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to remove an admin",
      });
    }

    if (!conversation.admin_ids.includes(member)) {
      return res
        .status(400)
        .json({ success: false, message: "User is not an admin" });
    }

    // Ensure at least one admin remains
    if (conversation.admin_ids.length === 1) {
      return res
        .status(403)
        .json({ success: false, message: "Cannot remove the last admin" });
    }

    // Update the conversation and remove the admin
    const group = await Conversation.findByIdAndUpdate(
      conversation_id,
      { $pull: { admin_ids: member } }, // Removes member from admin_ids
      { new: true }
    );

    notification = await createNotification(
      member,
      user_id,
      "group_activity",
      `You have been removed as an admin from the group ${group.group_name}`
    );

    return res.status(200).json({
      success: true,
      message: `User removed as admin successfully from ${group.group_name}`,
      data: group,
      notification,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// get all group members
const getAllGroupMembers = async (req, res) => {
  try {
    const { conversation_id } = req.params;
    const user_id = req.id;

    // Find the conversation where the user is a participant
    const conversation = await Conversation.findOne({
      _id: conversation_id,
      participants: user_id,
    })
      .populate("participants", "name avatar.image")
      .lean();

    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }

    return res.status(200).json({
      success: true,
      members: conversation.participants,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

module.exports = {
  createGroup,
  addNewMember,
  removeMember,
  makeAdmin,
  removeAdmin,
  getAllGroupMembers,
};
