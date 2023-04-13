import { Link } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">
          {isSignedIn && (
            <>
              <UserButton />
            </>
          )}
          {!isSignedIn && (
            <>
              Not signed in
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
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page">
              <Link to="/">Home</Link>
            </a>
            <a className="nav-link" href="#">
              <Link to="/login">Login</Link>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
