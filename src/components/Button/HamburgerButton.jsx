'use client'

import Link from "next/link";
import React, { useState } from "react";
import ButtonSignout from "./ButtonSignout";
import ButtonSignin from "./ButtonSignin";
import ButtonRegister from "./ButtonRegister";
import { usePathname } from "next/navigation";

const HamburgerButton = ({ session, navLinks }) => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = usePathname()

    // Function to toggle the mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const underlineAnimation = "relative after:content-[''] after:bottom-0 after:h-[2px] hover:after:w-full after:w-0 after:absolute after:bg-gray-900 flex flex-col justify-center items-center after:duration-200"

    const underLine = `relative after:content-[''] after:bottom-0 after:h-[2px] after:w-full after:absolute after:bg-gray-900 flex flex-col justify-center items-center`

    return <>
        <div className="lg:hidden wrapper flex flex-col w-full">
            <div className="lg:hidden w-full justify-end flex items-center">
                {/* Hamburger menu */}
                <button
                    className="flex items-center px-3 py-2 border rounded text-primary border-primary"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        className="w-5 h-5"
                        fill="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="#000000"
                    >
                        <path d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isMobileMenuOpen && (
                <div className="lg:hidden p-2 absolute top-14 right-0 left-0 border-[1px] border-gray-900 rounded flex flex-col items-center sm:flex-row justify-between h-auto w-full gap-2 bg-primary z-10">
                    <ul className="flex flex-row md:items-center justify-center sm:justify-start w-full h-full md:w-auto md:h-auto gap-3 text-gray-900 flex-1">
                        {navLinks.map((link) => {
                            const isActive = router === link.href
                            return <Link className={isActive ? `${underLine}` : `${underlineAnimation}`} href={link.href} key={link.name}>{link.name}</Link>
                        })}
                    </ul>
                    <div className="button flex items-center justify-start sm:justify-end gap-4 w-auto flex-1">
                        {session === "authenticated" ? <ButtonSignout /> : <> <ButtonSignin /> <ButtonRegister /></>}
                    </div>
                </div>
            )}
        </div>
    </>

};

export default HamburgerButton;
