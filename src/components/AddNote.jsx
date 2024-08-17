// Hooks
import { useState, useEffect } from "react";

// Axios
import axios from "axios";

// Message
import { toast } from "react-toastify";

// Icons
import { BiPlus, BiPin, BiX, BiSolidFilePlus } from "react-icons/bi";

const AddNote = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("http://localhost:8800/notes");

        setNotes(response.data.notes);
      } catch (error) {
        toast.error(error);
      }
    };
    getNotes();
  }, [notes]);

  const addNote = async () => {
    if (text === "") {
      toast.warn("Adicione o que deseja anotar!");
      return;
    }

    const newNote = {
      content: text,
      fixed: false,
    };

    const response = await axios.post(
      "http://localhost:8800/notes/addnote",
      newNote
    );

    toast.success(response.data.message);
    setText("");
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/notes/delete/${id}`
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePin = async (id, currentFixed) => {
    try {
      await axios.put(`http://localhost:8800/notes/updatefixed/${id}`, {
        fixed: !currentFixed,
      });
      setNotes(
        notes.map((note) =>
          note._id === id ? { ...note, fixed: !currentFixed } : note
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const duplicateNote = async (content, fixed) => {
    const newNote = {
      content,
      fixed,
    };

    try {
      const response = await axios.post(
        "http://localhost:8800/notes/duplicate",
        newNote
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const updateNote = async (id, content) => {
    try {
      const response = await axios.put(
        `http://localhost:8800/notes/update/${id}`,
        {
          content,
        }
      );
      setNotes(
        notes.map((note) => (note._id === id ? { ...note, content } : note))
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="add-note-container">
        <input
          type="text"
          value={text}
          placeholder="O que deseja anotar?"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNote} className="add-note">
          <BiPlus />
        </button>
      </div>
      <div className="notes-container">
        {notes.length > 0 ? (
          <>
            {notes.map((note) => (
              <div
                className={`note ${note.fixed ? "fixed" : ""}`}
                key={note._id}>
                <textarea
                  defaultValue={note.content}
                  onBlur={(e) =>
                    updateNote(note._id, e.target.value)
                  }></textarea>
                <BiPin
                  className="pin"
                  title="Fixar nota!"
                  onClick={() => togglePin(note._id, note.fixed)}
                />
                <BiX
                  className="x"
                  title="Excluir Nota!"
                  onClick={() => deleteNote(note._id)}
                />
                <BiSolidFilePlus
                  className="plus"
                  title="Duplicar Nota!"
                  onClick={() => duplicateNote(note.content, note.fixed)}
                />
              </div>
            ))}
          </>
        ) : (
          <p>Você ainda não tem notas...</p>
        )}
      </div>
    </div>
  );
};

export default AddNote;
