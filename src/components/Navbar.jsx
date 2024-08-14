import { BiSearch, BiDownload } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <h1>Dev notes</h1>
        </li>
        <li>
          <div className="search-container">
            <BiSearch />
            <input
              type="text"
              className="search-input"
              placeholder="Busque por uma nota"
            />
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
