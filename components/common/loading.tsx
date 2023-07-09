import React, { FC } from "react";
import Logo from "./Logo";
import { APP_NAME } from "./apphead";
import { CgSpinner } from "react-icons/cg";

interface Props {}

const Loading: FC<Props> = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary dark:bg-primary-dark">
      <div>
        {" "}
        <CgSpinner
          size={60}
          className="animate-spin text-primary-dark dark:text-primary"
        />{" "}
      </div>
      <div className="flex items-end justify-center space-x-2 mt-8">
        <Logo className="fill-highlight-light dark:fill-highlight-dark" />
        <span className="text-xl text-primary-dark dark:text-primary font-semibold">
          {" "}
          {APP_NAME}...{" "}
        </span>
      </div>
    </div>
  );
};

export default Loading;
