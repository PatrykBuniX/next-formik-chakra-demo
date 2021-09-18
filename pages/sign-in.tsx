import type { NextPage } from "next";
import Link from "next/link";

const SignIn: NextPage = () => {
  return (
    <main>
      <h1>Sign in</h1>
      <Link href="/">
        <a>back to home</a>
      </Link>
    </main>
  );
};

export default SignIn;
