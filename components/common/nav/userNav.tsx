import Link from "next/link";
import React, { FC } from "react";
import Logo from "../Logo";
import { APP_NAME } from "../apphead";
import { HiLightBulb } from "react-icons/hi";
import { GithubAuthButton } from "@/components/button";

interface Props {
    
}

const UserNav: FC<Props> = (): JSX.Element => {
    return <div className="flex items-center justify-between bg-primary-dark p-3">
        
        <Link href={'/'} className="flex space-x-2 text-highlight-dark ">
            <Logo className="fill-highlight-dark" />
            <span className="text-xl font-semibold"> {APP_NAME} </span>
        </Link>

        <div className="flex items-center space-x-5">
            <button className="dark:text-secondary-dark text-secondary-light">
                <HiLightBulb size={34} />
            </button>
            <GithubAuthButton lightOnly />
        </div>
    </div>
}

export default UserNav;