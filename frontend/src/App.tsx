import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navigation/Navbar";
import Review from "./Pages/Review";
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
      <Route path="/review/:id" element={<Review />} />
    </Routes>
  );
};
export default App;
