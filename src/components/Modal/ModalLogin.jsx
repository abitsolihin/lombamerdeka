import Link from "next/link";
import React from "react";
import { BiSolidMessageSquareError } from 'react-icons/bi'

const ModalLogin = () => {


    return <div className="flex items-center justify-center h-full w-full">
        <div className="wrapper-notification border-2 border-solid border-black p-4 sm:p-14 relative rounded-md bg-white flex items-center justify-center flex-col">
            <p className="text-center">Maaf, akses ke halaman ini hanya tersedia untuk pengguna yang sudah masuk. <br /> Silahkan login terlebih dahulu untuk mengaksesnya. Terima kasih!</p>
            <Link href={'/login'} className="mt-5 flex items-center justify-center w-full py-2 bg-black text-white rounded-full text-lg sm:text-xl">Login</Link>
            <BiSolidMessageSquareError className="absolute -top-4 sm:-top-10 text-[32px] sm:text-[64px]" />
        </div>
    </div>;
};

export default ModalLogin;
