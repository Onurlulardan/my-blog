"use client";
import classNames from "classnames";
import Image from "next/image";
import React, { FC, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
  Avatar?: string;
  NameInitial?: string;
}

const commonClass =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";

const ProfileHead: FC<Props> = ({
  lightOnly,
  Avatar,
  NameInitial,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "text-primary-dark bg-primary"
      : "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]);

  return (
    <div className="flex items-center ">
      <div className={classNames(commonClass, getStyle())}>
        {Avatar ? <Image src={Avatar} fill alt="Avatar" /> : NameInitial}
      </div>
      <AiFillCaretDown
        className={
          lightOnly ? "text-primary " : "text-primary-dark dark:text-primary"
        }
      />
    </div>
  );
};

export default ProfileHead;
