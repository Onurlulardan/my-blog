"use client";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import React, { FC, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
}

const commonClass =
  "flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-[0.97] transition duration-100 ";

export const GithubAuthButton: FC<Props> = ({
  lightOnly,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return "text-primary-dark bg-primary";
    return "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]);

  const handleClick = async () => await signIn('github');

  return (
    <button onClick={() => handleClick()} className={classNames(commonClass, getStyle())}>
      <span> Continue with </span>
      <AiFillGithub size={24} />
    </button>
  );
};
