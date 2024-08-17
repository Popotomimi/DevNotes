// Icons
import { BiSearch, BiDownload } from "react-icons/bi";

// Navigation
import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// Message
import { toast } from "react-toastify";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search === "") {
      toast.warn("Digite algo para poder pesquisar!");
      return;
    }
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
              onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearch onClick={handleSearch} />
          </div>
        </li>
        <li>
          <button className="export-notes">
            Exportar CSV <BiDownload />{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
