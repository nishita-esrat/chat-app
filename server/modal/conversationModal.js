const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["one-to-one", "group"], required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    group_name: { type: String },
    admin_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
