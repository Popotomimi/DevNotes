// Axios
import axios from "axios";

// Navigation
import { useLocation, Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Search = () => {
  const location = useLocation();
  const search = location.state?.search || "Escreva antes de pesquisar";

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.post(
          "https://devnotesreact.netlify.app/notes/search",
          {
            content: search,
          }
        );
        setNotes(response.data.notes);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getNotes();
  }, [search]);

  return (
    <div className="search">
      <h1>Resultado da pesquisa: "{search}"</h1>
      <div className="notes-container">
        {notes.map((note) => (
          <div className={`note ${note.fixed ? "fixed" : ""}`} key={note._id}>
            <textarea defaultValue={note.content}></textarea>
          </div>
        ))}
      </div>
      <Link to="/">
        <button className="export-notes">Voltar para a Home</button>
      </Link>
    </div>
  );
};

export default Search;
