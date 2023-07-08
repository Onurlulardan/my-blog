import React, { FC, ReactNode } from "react";
import AppHead from "../common/apphead";
import UserNav from "../common/nav/userNav";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ desc, title, children }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen bg-primary dark:bg-primary-dark transition">
        <UserNav />
        <div className="max-w-4xl mx-auto"> { children } </div>
      </div>
    </>
  );
};

export default DefaultLayout;
