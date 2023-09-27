'use client'
import useCustomRouter from "@/middleware/useCustomRouter";
import React from "react";

const ButtonFilter = () => {

    const {query, pushQuery} = useCustomRouter()

    const handleClick = (kategori) => {
        pushQuery({...query, kategori})
    }

    return <div className="right flex items-center flex-1 justify-center sm:justify-end gap-4">
        <span onClick={() => handleClick('Trend TikTok')} className="cursor-pointer">Trend TikTok</span>
        <span onClick={() => handleClick('Dewasa')} className="cursor-pointer">Dewasa</span>
        <span onClick={() => handleClick('Anak-Anak')} className="cursor-pointer">Anak-Anak</span>
    </div>;
};

export default ButtonFilter;
