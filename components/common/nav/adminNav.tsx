"use client";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

interface Props {
  navItems: {
    label: string;
    href: string;
    icon: IconType;
  }[];
}

const navOpenWidth = "w-60";
const navcloseWidth = "w-12";
const navVisibility = "nav-visibilty";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  const toggleNav = (visibilty: boolean) => {
    const currentNav = navRef.current;

    if (!currentNav) return;
    if (visibilty) {
      currentNav.classList.remove(navOpenWidth);
      currentNav.classList.add(navcloseWidth);
    } else {
      currentNav.classList.add(navOpenWidth);
      currentNav.classList.remove(navcloseWidth);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(navVisibility, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(navVisibility);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0"
    >
      <div>
        <Link href={"/admin"} className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          {visible && (
            <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none">
              Admin
            </span>
          )}
        </Link>
        <div className="space-y-6">
          {navItems.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center text-highlight-light dark:text-highlight-dark text-xl font-semibold p-3 hover:scale-[0.98] transition"
              >
                <item.icon size={24} />
                {visible && (
                  <span className="ml-2 leading-none"> {item.label} </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => updateNavState()}
        className="text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end"
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
