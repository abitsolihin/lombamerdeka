'use client'
import useCustomRouter from "@/middleware/useCustomRouter";
import React from "react";

const ButtonFilter = () => {

    const { query, pushQuery } = useCustomRouter()

    const handleClick = (kategori) => {
        pushQuery({ ...query, kategori })
    }

    return <div className="right flex items-center flex-1 justify-between sm:justify-end gap-4">
        <span onClick={() => handleClick('')} className={query.kategori === undefined ? "cursor-pointer text-white bg-slate-900 px-2 py-1 rounded" : "cursor-pointer text-slate-900"}>All</span>
        <span onClick={() => handleClick('Trend TikTok')} className={query.kategori === "Trend TikTok" ? "cursor-pointer text-white bg-slate-900 px-2 py-1 rounded" : "cursor-pointer text-slate-900"}>Trend TikTok</span>
        <span onClick={() => handleClick('Dewasa')} className={query.kategori === "Dewasa" ? "cursor-pointer text-white bg-slate-900 px-2 py-1 rounded" : "cursor-pointer text-slate-900"}>Dewasa</span>
        <span onClick={() => handleClick('Anak-Anak')} className={query.kategori === "Anak-Anak" ? "cursor-pointer text-white bg-slate-900 px-2 py-1 rounded" : "cursor-pointer text-slate-900"}>Anak-Anak</span>
    </div>;
};

export default ButtonFilter;
