// Icons
import { BiSearch, BiDownload } from "react-icons/bi";

// Axios
import axios from "axios";

// Navigation
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useState, useRef, useEffect } from "react";

// Message
import { toast } from "react-toastify";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef("");

  const handleSearch = () => {
    if (search === "") {
      toast.warn("Digite algo para poder pesquisar!");
      return;
    } else {
      setSearch(null);
      navigate("/search", { state: { search } });
      inputRef.current.value = "";
    }
  };

  const exportNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8800/notes");
      setNotes(response.data.notes);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (notes.length > 0) {
      exportData();
    }
  }, [notes]);

  const exportData = () => {
    const notas = notes;
    const csvString = [
      ["ID", "Conteúdo", "Fixado?"],
      ...notas.map((note) => [note._id, note.content, note.fixed]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const element = document.createElement("a");

    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);

    element.target = "_blank";

    element.download = "notes.csv";

    element.click();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h1>Dev notes</h1>
          </Link>
        </li>
        <li>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Busque por uma nota"
              ref={inputRef}
              onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearch onClick={handleSearch} />
          </div>
        </li>
        <li>
          <button className="export-notes" onClick={exportNotes}>
            Exportar CSV <BiDownload />{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
