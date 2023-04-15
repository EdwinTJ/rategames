import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navigation/Navbar";
import Review from "./Pages/Review";
import LoadingSpinner from "./Components/UIElements/LoadingSpinner";
function App() {
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
