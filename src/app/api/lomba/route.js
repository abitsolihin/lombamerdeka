import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Lomba from "@/models/lomba/lomba";
import validateApiKey from "@/middleware/apiKey";

export const GET = async (request) => {
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) {
        return new NextResponse("Missing Api Key", {
            status: 500
        });
    }
    if (!validateApiKey(apiKey)) {
        return new NextResponse("Invalid Api Key", {
            status: 500
        });
    }
    try {
        await connect()
        const page_str = request.nextUrl.searchParams.get("page");
        const limit_str = request.nextUrl.searchParams.get("limit");
        const month_str = request.nextUrl.searchParams.get("month");
        const year_str = request.nextUrl.searchParams.get("year");
        const category = request.nextUrl.searchParams.get("category");

        const page = page_str ? parseInt(page_str, 10) : 1;
        const limit = limit_str ? parseInt(limit_str, 10) : 10;
        const skip = (page - 1) * limit;

        let query = Lomba.find();

        if (month_str && year_str) {
            const startDate = new Date(Date.UTC(parseInt(year_str), parseInt(month_str) - 1, 1));
            const endDate = new Date(Date.UTC(parseInt(year_str), parseInt(month_str), 1));

            query = query.where("timestamp").gte(startDate).lt(endDate);
        }

        if (category) {
            query = query.where("kategori").equals(category); // Add filter by category
        }

        const post = await query.skip(skip).limit(limit);
        const totalPost = await Lomba.countDocuments(query);
        const totalPages = Math.ceil(totalPost / limit);

        const response = {
            status: "success",
            count: post.length,
            totalPages,
            currentPage: page,
            limit,
            lomba: post // Use the filtered posts
        };
        return new NextResponse(JSON.stringify(response), {
            status: 200
        })
    } catch (error) {
        return new NextResponse("Connect Database Gagal", {
            status: 500
        });
    }
}

export const POST = async (request) => {
    const {
        title,
        deskripsi,
        imgurl,
        tatacara,
        videourl,
        kategori
    } = await request.json();

    await connect();

    const newLomba = new Lomba({
        title,
        deskripsi,
        imgurl,
        tatacara,
        videourl,
        kategori
    });

    try {
        await newLomba.save();
        return new NextResponse(JSON.stringify("Post berhasil disimpan"), {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};