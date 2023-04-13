import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navigation/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </>
  );
}

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default App;
