'use client'

import React from "react";
import { GrFormPrevious } from "react-icons/gr"
import Link from "next/link";

const ButtonBack = () => {
    return <Link href={'/lomba'}  className="group flex gap-2 items-center text-xl text-gray-700 cursor-pointer pb-4"><GrFormPrevious className="border-[1px] border-solid rounded-full border-gray-500" color="#ffffff" fill="#ffffff" size={24} /><span className="group-hover:translate-x-2 duration-100 ease-in-out">Back</span></Link>;
};

export default ButtonBack;
