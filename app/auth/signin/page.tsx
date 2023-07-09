"use client";
import { GithubAuthButton } from "@/components/button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";

interface Props {}

const Signin: NextPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
      <GithubAuthButton
        onClick={() => {
          signIn("github");
        }}
      />
    </div>
  );
};

export default Signin;
