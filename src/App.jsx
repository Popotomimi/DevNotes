// Components
import AddNote from "./components/AddNote";
import Navbar from "./components/Navbar";

// Message
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position="top-center" />
      <Navbar />
      <AddNote />
    </>
  );
}

export default App;
