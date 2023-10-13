import React from "react";
import { getDetailPost } from "@/utils/Fetching";
import ButtonBack from "@/components/Button/ButtonBack";
import BlogList from "@/components/BlogList";
import Image from "next/image";
import LineDashed from "@/components/Decoration/LineDashed";
import ScrollBar from "@/components/Decoration/ScrollBar";

const getYouTubeVideoID = (url) => {
    const videoIdMatch = url.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
    if (videoIdMatch) {
        return videoIdMatch[1];
    }
    return null;
};

const DetailLomba = async ({ params }) => {
    const {lomba} = await getDetailPost(params.id)

    console.log(lomba)
    const {title, deskripsi, tatacara, timestamps, createdBy, imgurl, videourl, kategori, views} = lomba

    const date = new Date(timestamps.seconds * 1000 + timestamps.nanoseconds / 1000000);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const embedVideoUrl = videourl ? `https://www.youtube.com/embed/${getYouTubeVideoID(videourl)}` : '';
    return <div className="w-full lg:max-w-[834px] min-h-screen py-20 flex flex-col">
        <ScrollBar/>
        <ButtonBack />
        <h2 className="text-3xl lg:text-5xl py-3 font-semibold" style={{ textTransform: 'capitalize' }}>{title}</h2>
        <div className="flex justify-between items-center">
            <p className="text-xs lg:text-base">Published On <span className="font-semibold">{formattedDate}</span></p>
            <BlogList views = {views} />
        </div>
        <LineDashed />
        <div className="img-wrapper relative w-full h-[300px] group bg-gray-200 rounded-md overflow-hidden my-2">
            <div className="absolute top-0 left-0 w-full h-full group-hover:scale-105 duration-200 ease-in-out">
                <Image
                    src={`${imgurl}`}
                    alt="Image Alt Text"
                    fill
                    objectFit="cover"
                />
            </div>
        </div>
        <div className="blog my-2">
            <h2 className="text-2xl">Apa itu Lomba <span className="font-semibold">{title}</span>?</h2>
            <p className="my-5">{deskripsi}</p>
            <h2 className="text-2xl">Bagaimana Tatacara dari Lomba <span className="font-semibold">{title}</span>?</h2>
            <p className="my-5">{tatacara}</p>
            <div className="video-wrapper w-full h-auto">
                <iframe src={`${embedVideoUrl}`} width="100%" height="360"></iframe>
            </div>
        </div>
        <div className="kategori-wrapper flex flex-col lg:flex-row items-center justify-between py-5 gap-3">
            <div className="tags-wrapper flex justify-center gap-2">
                <span className="font-semibold">Kategori :</span>
                <ul className="flex gap-2">
                    {kategori.map((item, idx) => (
                        <li key={idx} className="border-[1px] border-solid border-gray-900 px-3 py-1 rounded-full text-xs" >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="createdBy flex items-center gap-2">
                <span className="font-semibold">Diposting Oleh :</span>
                <p>{createdBy}</p>
            </div>
        </div>
        <LineDashed />
    </div>;
};

export default DetailLomba;
