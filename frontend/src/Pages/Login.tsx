import { SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  return (
    <>
      <main>
        <section className="text-center">
          {isSignedIn && (
            <>
              {" "}
              <h1>Hello {user.username}</h1>
              <p>
                Go to <Link to="/">home</Link> page, to start reviewing games
              </p>
            </>
          )}
          {!isSignedIn && (
            <>
              {" "}
              <h1>Login</h1>
              <p>Please login if you want to review a game. Login by GitHub</p>
              <SignInButton />
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Login;
