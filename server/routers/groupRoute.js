const express = require("express");
const isAuthenticate = require("../middleware");
const {
  createGroup,
  addNewMember,
  removeMember,
  makeAdmin,
  removeAdmin,
  getAllGroupMembers,
} = require("../controllers/groupController");


const router = express.Router();



router.post("/new-group", isAuthenticate, createGroup);
router.put("/add-new-member", isAuthenticate, addNewMember);
router.put("/remove-member", isAuthenticate, removeMember);
router.put("/make-admin", isAuthenticate, makeAdmin);
router.put("/remove-admin", isAuthenticate, removeAdmin);
router.get(
  "/all-group-members/:conversation_id",
  isAuthenticate,
  getAllGroupMembers
);



module.exports = router;
