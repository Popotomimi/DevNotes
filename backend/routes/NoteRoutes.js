const express = require("express");
const router = express.Router();
const NoteController = require("../controllers/NoteControllers");

router.get("/", NoteController.getAllNotes);
router.post("/addnote", NoteController.addNote);
router.delete("/delete/:id", NoteController.deleteNote);
router.put("/update/:id", NoteController.updateNoteFixed);

module.exports = router;
