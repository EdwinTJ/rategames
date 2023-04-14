import { SignInButton, useUser } from "@clerk/clerk-react";
const Login = () => {
  const { isSignedIn, user } = useUser();
  return (
    <>
      <main>
        <section className="text-center">
          {isSignedIn && (
            <>
              {" "}
              <h1>Hello {user.username}</h1>
              <p>Go to review games Link </p>
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
