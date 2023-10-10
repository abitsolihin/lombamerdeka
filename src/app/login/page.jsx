"use client"

import React, { useState } from "react";
import { signIn } from 'next-auth/react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';

const Signin = () => {
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        const email = e.target[0].value
        const password = e.target[1].value

        signIn("credentials", {
            redirect: false,
            email,
            password
        })
            .then(async({ error }) => {
                setLoading(false)
                if (error) {
                    toast.error(error, {
                        position: 'top-right',
                        autoClose: 3000,
                    })
                }else{
                    toast.success("Berhasil Masuk", {
                        position: 'top-right',
                        autoClose: 2000,
                    })
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Menunggu 3 detik
                    router.push('/');
                }
            })
            .catch((error) => console.log(error));
    }

    return <div className="flex items-center justify-center min-h-screen">
        <ToastContainer />
        <div className="w-full max-w-md">
            <form className="rounded px-8 py-6 border-[1px] border-gray-800" onSubmit={handleSubmit}>
                <div className="title w-full text-center my-4">
                    <h1 className="font-semibold text-2xl">Login Untuk Membuat Post Lomba</h1>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm mb-2" htmlFor="username">
                        Email :
                    </label>
                    <input
                        className="border-[1px] border-gray-800 bg-transparent rounded-full w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        id="Email"
                        type="Email"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm mb-2" htmlFor="password">
                        Kata Sandi :
                    </label>
                    <input
                        className="border-[1px] border-gray-800 bg-transparent rounded-full w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Kata Sandi"
                    />
                </div>
                <div className="flex items-center justify-between w-full">
                    <button
                        className="bg-gray-800 text-white font-bold py-3 px-4 my-4 rounded-full  focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        {isLoading? 'Loading...' : 'Masuk'}
                    </button>
                </div>
                <div className="register w-full text-center">
                    <Link href={'/register'} className="cursor-pointer">Belum punya akun? Daftar disini!</Link>
                </div>
            </form>
        </div>
        <Image className="absolute bottom-0 left-0 right-0 w-full -z-20" src={'/flag.svg'} alt="balap karung" width='378' height='378' priority />

    </div>;
};

export default Signin;
