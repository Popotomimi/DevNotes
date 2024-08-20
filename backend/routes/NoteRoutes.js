const express = require("express");
const router = express.Router();
const NoteController = require("../controllers/NoteControllers");

router.get("/", NoteController.getAllNotes);
router.post("/addnote", NoteController.addNote);
router.post("/duplicate", NoteController.duplicateNote);
router.post("/search", NoteController.searchNotes);
router.delete("/delete/:id", NoteController.deleteNote);
router.put("/updatefixed/:id", NoteController.updateNoteFixed);
router.put("/update/:id", NoteController.updateNote);

module.exports = router;
