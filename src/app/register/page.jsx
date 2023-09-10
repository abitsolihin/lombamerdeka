'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
    const [isErr, setErr] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            setLoading(true);

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (res.status === 201) {
                router.push("/");
            }
        } catch (error) {
            setErr(true);
            console.log(error.message);
        } finally {
            setLoading(false); // Menonaktifkan status loading setelah permintaan selesai diproses
        }
    };

    return <div className="flex items-center justify-center min-h-screen">
        <div className="w-96 rounded-lg shadow-md relative">
            <form className="rounded px-8 py-6 border-[1px] border-gray-800" onSubmit={handleSubmit}>
                <div className="title w-full text-center my-4">
                    <h1 className="font-semibold text-2xl">Buat Akun</h1>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm mb-2" htmlFor="nama">
                        Username :
                    </label>
                    <input
                        className="border-[1px] border-gray-800 bg-transparent rounded-full w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        id="nama"
                        type="nama"
                        placeholder="nama"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm mb-2" htmlFor="username">
                        Email :
                    </label>
                    <input
                        className="border-[1px] border-gray-800 bg-transparent rounded-full w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="username"
                        placeholder="Username"
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
                    {isLoading ? (
                        <button
                            type="submit"
                            className="bg-gray-800 text-white px-4 py-2 rounded-md"
                        >
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        </button>
                    ) : (
                        <button
                            className="bg-gray-800 text-white font-bold py-3 px-4 my-4 rounded-full  focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Buat Akun
                        </button>
                    )}
                </div>
            </form>
            {isErr && "Error something wrong!"}
        </div>
        <Image className="absolute bottom-0 left-0 right-0 w-full -z-20" src={'/flag.svg'} alt="balap karung" width='378' height='378' priority />
    </div>
};

export default Register;
