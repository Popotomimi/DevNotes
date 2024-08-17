// Navigation
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import AddNote from "./components/AddNote";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

// Message
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<AddNote />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
