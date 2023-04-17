import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import axios from "axios";
// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Review from "./Pages/Review";
// UI Elements
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Navigation/Footer";
import LoadingSpinner from "./Components/UIElements/LoadingSpinner";
function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          <Navbar />
          <Routing />
          <Footer />
        </Suspense>
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
