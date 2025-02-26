const Note = require("../modal/noteModal");


// new note
const createNote = async (req, res) => {
  try {
    const id = req.id;
    const { text, not_allowed_users } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }


    const note = await Note.findOneAndUpdate(
      { user_id: id },
      { $set: { text, not_allowed_users: not_allowed_users || [] } },
      { new: true, upsert: true }
    );


    res.status(201).json({
      success: true,
      message: "note created successfully",
      note,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { createNote };
