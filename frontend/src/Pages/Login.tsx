import { SignInButton } from "@clerk/clerk-react";
const Login = () => {
  return (
    <>
      <section>
        <h1 className="text-center">Login</h1>
        <p>Please login if you want to review a game. Login by GitHub</p>
        <SignInButton />
      </section>
    </>
  );
};

export default Login;
