// Hooks
import { useState } from "react";

// Icons
import { BiPlus, BiPin, BiX, BiSolidFilePlus } from "react-icons/bi";

const AddNote = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [id, setId] = useState(0);

  const addNote = () => {
    if (text === "") {
      alert("Adicione o que deseja anotar");
      return;
    }

    const noteObject = {
      id: generateId(),
      content: text,
      fixed: false,
    };

    setNotes([...notes, noteObject]);

    setText("");
  };

  const generateId = () => {
    setId(Math.floor(Math.random() * 5000));
    return id;
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
              <div className="note" key={note.id}>
                <textarea>{note.content}</textarea>
                <BiPin className="pin" />
                <BiX className="x" />
                <BiSolidFilePlus className="plus" />
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
