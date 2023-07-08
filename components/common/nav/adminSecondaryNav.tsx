import React, { FC } from "react";
import DropdownOptions, { dropdownOptions } from "../DropdownOptions";
import ProfileHead from "../profileHead";
import { useRouter } from "next/navigation";
import useDarkMode from "@/hooks/useDarkMode";
import { signOut } from "next-auth/react";
import SearchBar from "../searchBar";

interface Props {}

const SecondaryAdminNav: FC<Props> = (): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();

  const navigateToCreateNewPost = () => router.push("admin/post/create");

  const handleLogOut = async () => await signOut();


  const options: dropdownOptions = [
    {
      label: "Add New Post",
      onClick: navigateToCreateNewPost,
    },
    {
      label: "Change Theme",
      onClick: toggleTheme,
    },
    {
      label: "Log Out",
      onClick: handleLogOut,
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <DropdownOptions head={<ProfileHead NameInitial="J" />} options={options} />
    </div>
  );
};

export default SecondaryAdminNav;
