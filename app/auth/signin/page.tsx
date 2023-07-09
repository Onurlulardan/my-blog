"use client";
import { GithubAuthButton } from "@/components/button";
import { NextPage } from "next";

interface Props {}

const Signin: NextPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
      <GithubAuthButton />
    </div>
  );
};

export default Signin;
