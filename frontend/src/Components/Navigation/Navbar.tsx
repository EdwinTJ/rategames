import { Link } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
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
              <div className="nav-link">
                <Link to="/" className="nav-link-router">
                  Home
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link to="/about" className="nav-link-router">
                  About
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link to="/login" className="nav-link-router">
                  Login
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
