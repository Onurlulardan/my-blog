"use client";
import Link from "next/link";
import React, { FC } from "react";
import Logo from "../Logo";
import { APP_NAME } from "../apphead";
import { HiLightBulb } from "react-icons/hi";
import { GithubAuthButton } from "@/components/button";
import ProfileHead from "../profileHead";
import DropdownOptions, { dropdownOptions } from "../DropdownOptions";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/utils/types";
import useDarkMode from "@/hooks/useDarkMode";

interface Props {}

const defaultOptions: dropdownOptions = [
  {
    label: "Logout",
    async onClick() {
      await signOut();
    },
  },
];

const UserNav: FC<Props> = (): JSX.Element => {
  const router = useRouter();
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const profile = data?.user as UserProfile | undefined;
  const isAdmin = profile && profile.role === "admin";

  const dropDownoptions: dropdownOptions = isAdmin
    ? [
        {
          label: "Dashboard",
          onClick() {
            router.push("/admin");
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;

  const { toggleTheme } = useDarkMode();

  return (
    <div className="flex items-center justify-between bg-primary-dark p-3">
      <Link href={"/"} className="flex space-x-2 text-highlight-dark ">
        <Logo className="fill-highlight-dark" />
        <span className="text-xl font-semibold"> {APP_NAME} </span>
      </Link>

      <div className="flex items-center space-x-5">
        <button
          onClick={toggleTheme}
          className="dark:text-secondary-dark text-secondary-light"
        >
          <HiLightBulb size={34} />
        </button>
        {isAuth ? (
          <DropdownOptions
            options={dropDownoptions}
            head={<ProfileHead NameInitial="O" lightOnly />}
          />
        ) : (
          <GithubAuthButton lightOnly />
        )}
      </div>
    </div>
  );
};

export default UserNav;
