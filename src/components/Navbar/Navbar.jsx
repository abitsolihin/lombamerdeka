'use client'

import React from "react";
import Link from "next/link";
import ButtonSignin from "../Button/ButtonSignin";
import ButtonSignout from "../Button/ButtonSignout";
import ButtonRegister from "../Button/ButtonRegister";
import HamburgerButton from "../Button/HamburgerButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { session, status } = useSession();

    const router = usePathname()

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Ide Lomba', href: '/lomba' },
        { name: 'Post Ide Lomba', href: '/post' },
    ]

    const underlineAnimation =
        `relative after:content-[''] after:bottom-0 after:h-[2px] hover:after:w-full after:w-0 after:absolute after:bg-gray-900 flex flex-col justify-center items-center after:duration-200`;

    const underLine = `relative after:content-[''] after:bottom-0 after:h-[2px] after:w-full after:absolute after:bg-gray-900 flex flex-col justify-center items-center`

    const isPostRoute = router === "/post";

    return (
        <header
            className={`absolute top-0 left-0 right-0 py-4 mx-4 md:mx-24 ${isPostRoute ? "hidden" : "flex"
                }`}
        >
            <div className="wrapper-title">
                <h1 className="title font-normal text-4xl">LombaMerdeka</h1>
            </div>
            <div className="hidden lg:flex w-full items-center justify-end">
                <nav className="w-full mr-10 flex-1">
                    <ul className="flex items-center justify-end gap-5">
                        {navLinks.map((link) => {
                            const isActive = router === link.href
                            return <Link className={isActive ? `${underLine}` : `${underlineAnimation}`} href={link.href} key={link.name}>{link.name}</Link>
                        })}
                    </ul>
                </nav>
                <div className="button flex items-center justify-center gap-4 w-auto">
                    {status === "authenticated" ? <ButtonSignout /> : <> <ButtonSignin /> <ButtonRegister /></>}
                </div>
            </div>
            <HamburgerButton session={session} navLinks={navLinks}/>
        </header>
    );
};

export default Navbar;
