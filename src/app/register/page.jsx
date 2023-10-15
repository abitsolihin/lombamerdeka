"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [isErr, setErr] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value.trim();
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
          password,
        }),
      });

      if (res.status === 201) {
        toast.success("Akun Berhasil dibuat", {
          position: "top-right",
          autoClose: 3000,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/login");
      }
    } catch (error) {
      setErr(true);
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle username input change
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    if (username.includes(" ")) {
      setUsernameError("Username tidak boleh mengandung spasi");
      setButtonDisabled(true);
    } else {
      setUsernameError("");
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="w-96 rounded-lg shadow-md relative">
        <form
          className="rounded px-8 py-6 border-[1px] border-gray-800"
          onSubmit={handleSubmit}
        >
          <div className="title w-full text-center my-4">
            <h1 className="font-semibold text-2xl">Buat Akun</h1>
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 text-sm mb-2" htmlFor="nama">
              Username:
            </label>
            <input
              className="border-[1px] border-gray-800 bg-transparent rounded-full w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text" // Change input type to "text"
              placeholder="Username"
              onChange={handleUsernameChange} // Add onChange event handler
            />
            {usernameError && <p className="text-red-500">{usernameError}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm mb-2"
              htmlFor="password"
            >
              Password :
            </label>
            <input
              className="border-[1px] border-gray-800 bg-transparent rounded-full w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            {isLoading ? (
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-md"
                disabled
              >
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              </button>
            ) : (
              <button
                className={`bg-gray-800 text-white font-bold py-3 px-4 my-4 rounded-full focus:outline-none focus:shadow-outline w-full ${
                  isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                }`}
                type="submit"
                disabled={isButtonDisabled} // Menambahkan atribut disabled
              >
                Buat Akun
              </button>
            )}
          </div>
        </form>
        {isErr && "Error something wrong!"}
      </div>
      <Image
        className="absolute bottom-0 left-0 right-0 w-full -z-20"
        src={"/flag.svg"}
        alt="balap karung"
        width="378"
        height="378"
        priority
      />
    </div>
  );
};

export default Register;
