"use client";
import { FC, ReactNode } from "react";
import AdminNav from "../common/nav/adminNav";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from "react-icons/ai";
import Link from "next/link";
import AppHead from "../common/apphead";
import SecondaryAdminNav from "../common/nav/adminSecondaryNav";

interface Props {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { href: "/admin", icon: AiOutlineDashboard, label: "Dashboard" },
  { href: "/admin/post", icon: AiOutlineContainer, label: "Post" },
  { href: "/admin/users", icon: AiOutlineTeam, label: "Users" },
  { href: "/admin/comments", icon: AiOutlineMail, label: "Comments" },
  { href: "/admin/contacts", icon: AiOutlineContacts, label: "Contact" },
];

const AdminLayOut: FC<Props> = ({ children, title }): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex">
        <AdminNav navItems={navItems} />
        <div className="flex-1 p-4 dark:bg-primary-dark bg-primary">
          <SecondaryAdminNav />
          {children}
        </div>
        <Link
          href={"/admin/post/create"}
          className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition"
        >
          <AiOutlineFileAdd size={24} />
        </Link>
      </div>
    </>
  );
};

export default AdminLayOut;
