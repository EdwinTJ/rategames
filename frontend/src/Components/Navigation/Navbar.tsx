import { Link } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import Icon from "/icon.svg";
const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand">
          {isSignedIn && (
            <>
              <UserButton />
            </>
          )}
          {!isSignedIn && (
            <>
              <SignInButton />
            </>
          )}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link">
                <Link to="/" className="link">
                  Home
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link to="/about" className="link">
                  About
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link to="/login" className="link">
                  Login
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
