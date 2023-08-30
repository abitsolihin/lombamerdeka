import { NextResponse } from "next/server";
import { db } from "@/app/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import validateApiKey from "@/middleware/apiKey";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
        // No need to connect() since you're using Firestore

        const page_str = request.nextUrl.searchParams.get("page");
        const limit_str = request.nextUrl.searchParams.get("limit");
        const month_str = request.nextUrl.searchParams.get("month");
        const year_str = request.nextUrl.searchParams.get("year");
        const category = request.nextUrl.searchParams.get("category");

        const page = page_str ? parseInt(page_str, 10) : 1;
        const limit = limit_str ? parseInt(limit_str, 10) : 10;
        const skip = (page - 1) * limit;

        let query = collection(db, "lombas");

        if (month_str && year_str) {
            const startDate = new Date(Date.UTC(parseInt(year_str), parseInt(month_str) - 1, 1));
            const endDate = new Date(Date.UTC(parseInt(year_str), parseInt(month_str), 1));

            query = where("timestamp", ">=", startDate);
            query = where(query, "<", endDate);
        }

        if (category) {
            query = where(query, "kategori", "==", category); // Add filter by category
        }

        const querySnapshot = await getDocs(query);

        const post = querySnapshot.docs.map((doc) => doc.data());
        const totalPost = querySnapshot.size;
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
        });
    } catch (error) {
        return new NextResponse("Connect Database Gagal", {
            status: 500
        });
    }
};

export const POST = async (request) => {
    const formData = await request.formData();

    const title = formData.get('title');
    const deskripsi = formData.get('deskripsi');
    const tatacara = formData.get('tatacara');
    const videourl = formData.get('videourl');
    const kategori = formData.getAll('kategori');
    const imageFile = formData.get('image');

    try {
        // Access the "lombas" collection in Firestore
        const lombasCollection = collection(db, "lombas");

        const imageBuffer = await imageFile.arrayBuffer();

        // Upload image to Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, `images/${title}-${Date.now()}`);
        await uploadBytes(imageRef, imageBuffer);

        // Get the download URL of the uploaded image
        const imgurl = await getDownloadURL(imageRef);

        // Create a new document in the "lombas" collection
        const docRef = await addDoc(lombasCollection, {
            title,
            deskripsi,
            imgurl,
            tatacara,
            videourl,
            kategori,
        });

        return new NextResponse(JSON.stringify("Post berhasil disimpan"), {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};