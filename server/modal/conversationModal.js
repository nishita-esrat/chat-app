const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["one-to-one", "group"], required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    group_name: { type: String },
    group_avatar: {
      image: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    admin_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);


// Add validation for max 2 admins
conversationSchema.path("admin_ids").validate(function (value) {
  return value.length <= 2;
}, "A group can have a maximum of two admins.");
 

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
