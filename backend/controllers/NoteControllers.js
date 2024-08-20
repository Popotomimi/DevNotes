const Note = require("../models/Notes");

// Helpers
const ObjectId = require("mongoose").Types.ObjectId;

exports.addNote = async (req, res) => {
  const { content, fixed } = req.body;

  if (content === "") {
    res.status(422).json({ message: "Adicione o que deseja anotar!" });
    return;
  }

  const note = new Note({
    content,
    fixed,
  });

  try {
    await note.save();
    res.status(200).json({ message: "Nota adicionada!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;

  // Check if id is valid
  if (!ObjectId.isValid(id)) {
    res.status(422).json({ message: "ID inválido!" });
    return;
  }

  // Check if note exists
  const note = await Note.findOne({ _id: id });

  if (!note) {
    res.status(404).json({ message: "Nota não encontrado!" });
    return;
  }

  await Note.findByIdAndDelete(id);

  res.status(200).json({ message: "Nota removida com sucesso!" });
};

exports.searchNotes = async (req, res) => {
  const { content } = req.body;

  try {
    const notes = await Note.find({
      content: { $regex: content, $options: "i" },
    });
    if (!notes.length) {
      res.status(400).json({ message: `Não encontramos nada com ${content}` });
      return;
    } else {
      res.status(200).json({ notes });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNoteFixed = async (req, res) => {
  const { id } = req.params;
  const { fixed } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(id, { fixed }, { new: true });
    if (!note) {
      return res.status(404).json({ message: "Nota não encontrada" });
    }
    res.status(200).json({ message: "Pin atualizado com sucesso!", note });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o Pin", error });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(id, { content }, { new: true });
    if (!note) {
      return res.status(404).json({ message: "Nota não encontrada" });
    }
    res.status(200).json({ message: "Nota atualizada com sucesso!", note });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.duplicateNote = async (req, res) => {
  const { content, fixed } = req.body;

  const note = new Note({
    content,
    fixed,
  });

  try {
    await note.save();
    res.status(200).json({ message: "Nota Duplicada." });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ notes });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
