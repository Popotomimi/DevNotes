import { BiPlus, BiPin, BiX, BiSolidFilePlus } from "react-icons/bi";

const AddNote = () => {
  return (
    <div>
      <div className="add-note-container">
        <input type="text" placeholder="O que deseja anotar?" />
        <button className="add-note">
          <BiPlus />
        </button>
      </div>
      <div className="notes-container">
        <div className="note">
          <textarea placeholder="Adicione algum texto"></textarea>
          <BiPin className="pin" />
          <BiX className="x" />
          <BiSolidFilePlus className="plus" />
        </div>
        <div className="note">
          <textarea placeholder="Adicione algum texto"></textarea>
          <BiPin className="pin" />
          <BiX className="x" />
          <BiSolidFilePlus className="plus" />
        </div>
        <div className="note fixed">
          <textarea placeholder="Adicione algum texto"></textarea>
          <BiPin className="pin" />
          <BiX className="x" />
          <BiSolidFilePlus className="plus" />
        </div>
      </div>
    </div>
  );
};

export default AddNote;
