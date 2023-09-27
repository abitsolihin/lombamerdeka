import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ data }) => {
    return (
        <div className="cards w-full h-full grid lg:grid-cols-5 grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-max py-2">
            {data.map((item) => (
                <Link className="group" key={item.id} href={`lomba/${item.id}`}>
                    <div className="relative aspect-square bg-gray-200 rounded-md overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full brightness-50 group-hover:scale-110 group-hover:brightness-100 duration-200 ease-in-out">
                            <Image
                                src={`${item.imgurl}`} // Replace with the actual image path
                                alt="Image Alt Text"
                                fill
                                objectFit="cover"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-white group-hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-lg sm:text-2xl font-normal group-hover:scale-125 duration-200">{item.title}</h2>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Card;