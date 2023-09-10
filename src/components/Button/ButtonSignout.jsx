'use client'
import React from "react";
import { signOut } from "next-auth/react";

const ButtonSignout = () => {

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' })
  }

  return <button className=" bg-gray-900 rounded-md px-5 py-2 text-white" onClick={handleLogout}>Keluar</button>;
};

export default ButtonSignout;
