import Card from "@/components/card/Card";
import React from "react";
import { BiFilter } from 'react-icons/bi'
import { getPosts } from "@/utils/Fetching";

const Lomba = async () => {

    const data = await getPosts()

        return (
            <div className="w-full flex flex-col min-h-screen pt-20">
                <div div className="top w-full flex items-center justify-center h-[300px]" >
                    <div className="wrapper w-[800px]">
                        <h1 className="font-light text-center text-4xl sm:text-[64px] lg:text-[80px] leading-tight">Cari Inspirasi Lomba
                            Untuk Acara 17 Agustus</h1>
                    </div>
                </div >
                <div className="bottom w-full flex flex-col items-center justify-center h-auto">
                    <div className="filter-wraper flex w-full p-2">
                        <div className="left sm:flex items-center flex-1 hidden">
                            <BiFilter size={32} />
                            <span>Filter Lomba</span>
                        </div>
                        <div className="right flex items-center flex-1 justify-center sm:justify-end gap-4">
                            <span className="cursor-pointer">Trend TikTok</span>
                            <span className="cursor-pointer">Dewasa</span>
                            <span className="cursor-pointer">Anak-Anak</span>
                        </div>
                    </div>
                    <Card data={data.post} />
                </div>
            </div >
        )
   
    
};

export default Lomba;
