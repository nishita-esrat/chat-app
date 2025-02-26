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

// delete note
const deleteNote = async (req, res) => {
  try {
    const id = req.id;
    const { noteId } = req.params;

    const note = await Note.findOneAndDelete({ user_id: id, _id: noteId });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or does not belong to you",
      });
    }

    res.status(200).json({
      success: true,
      message: "note deleted successfully",
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { createNote, deleteNote };
