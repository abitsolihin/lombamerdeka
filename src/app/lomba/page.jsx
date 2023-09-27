import Card from "@/components/card/Card";
import React from "react";
import { BiFilter } from 'react-icons/bi'
import { getPosts, getPostsByKategori } from "@/utils/Fetching";
import ButtonFilter from "@/components/Button/ButtonFilter";

const Lomba = async ({searchParams}) => {
    const data = await getPostsByKategori(searchParams)

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
                        <ButtonFilter/>
                    </div>
                    <Card data={data.post} />
                </div>
            </div >
        )
   
    
};

export default Lomba;
