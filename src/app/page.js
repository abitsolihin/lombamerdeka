import React from "react"
import { getPostsByKategori } from "@/utils/Fetching"
import { BiFilter } from "react-icons/bi"
import ButtonFilter from "@/components/Button/ButtonFilter"
import Card from "@/components/card/Card"
import Image from "next/image"
import Search from "@/components/Search/Search"
import RadialGradient from "@/components/Decoration/RadialGradient"


export default async function Home({ searchParams }) {
  const {post} = await getPostsByKategori(searchParams)

  return (
    <div className=" w-full flex flex-col min-h-screen pt-12">
      <RadialGradient position={`-top-48 -left-48 -z-10`} />
      <RadialGradient position={`bottom-20 -right-48 -z-10`} />
      <div className="relative w-full min-h-[200px] lg:min-h-[300px] bg-gray-200 rounded-md outline outline-1 my-10 -z-10">
        <div className="absolute top-0 left-0 w-full h-full duration-200 ease-in-out">
          <Image
            src={`/pattern.svg`} // Replace with the actual image path
            alt="Image Alt Text"
            fill
            objectFit="cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="text-center max-w-[1000px] px-4">
            <h2 className="text-slate-900 text-3xl lg:text-7xl font-semibold">Cari Inspirasi Lomba Untuk Acara 17 Agustus</h2>
          </div>
        </div>
        <Search data={post} />
      </div>
      <div className="bottom w-full flex flex-col items-center justify-center h-auto">
        <div className="filter-wraper flex w-full p-2">
          <div className="left sm:flex items-center flex-1 hidden">
            <BiFilter size={32} />
            <span>Filter Lomba</span>
          </div>
          <ButtonFilter />
        </div>
        <Card data={post} />
      </div>
    </div >
  )
}
