import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import axios from "axios";

// Pages
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const Review = lazy(() => import("./Pages/Review"));

// UI Elements
const Navbar = lazy(() => import("./Components/Navigation/Navbar"));
const Footer = lazy(() => import("./Components/Navigation/Footer"));
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
