import { NextResponse } from "next/server";
import { db } from "@/app/firebase";
import { collection, addDoc, query, serverTimestamp, where, getDocs } from "firebase/firestore";
import validateApiKey from "@/middleware/apiKey";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import sharp from "sharp";

export const GET = async (request) => {
    //Get The Headers x-api-key
    const apiKey = request.headers.get('x-api-key');

    //if missing API Key
    if (!apiKey) {
        return new NextResponse("Missing Api Key", {
            status: 500
        });
    }

    //if Invalid API Key
    if (!validateApiKey(apiKey)) {
        return new NextResponse("Invalid Api Key", {
            status: 500
        });
    }

    try {

        //try to get the params
        const page_str = request.nextUrl.searchParams.get("page");
        const limit_str = request.nextUrl.searchParams.get("limit");
        const kategori = request.nextUrl.searchParams.get("kategori");
        const sort = request.nextUrl.searchParams.get("sort");
        const field = request.nextUrl.searchParams.get("field");
        const search = request.nextUrl.searchParams.get("search");

        //pagination filter
        const page = page_str ? parseInt(page_str, 10) : 1;
        const limit = limit_str ? parseInt(limit_str, 10) : 10;
        const skip = (page - 1) * limit;

        //connect to db and field or collection
        let filterQuery = collection(db, "lombas");

        //filter based on timestamp or asc and des
        if (field && sort) {
            filterQuery = query(filterQuery, orderBy(field, sort)); // Sort by the specified field and order
        }

        //filter based value on category
        if (kategori) {
            filterQuery = query(filterQuery, where('kategori', 'array-contains', kategori));
        }

        if (search) {
            filterQuery = query(filterQuery, where('title', '!=', null)); // Pastikan ada judul yang ada
            filterQuery = query(filterQuery, where('title', '>=', search));
            filterQuery = query(filterQuery, where('title', '<', search + '\uf8ff'));
        }

        //try to get all document based on filterQuery(collection)
        const querySnapshot = await getDocs(filterQuery);

        //try to get the id document and math the totalPost and Pages
        const post = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const totalPost = querySnapshot.size;
        const totalPages = Math.ceil(totalPost / limit);

        //Entered all the results what i want to show
        const response = {
            status: "success",
            count: post.length,
            totalPages,
            currentPage: page,
            limit,
            post,
        };

        //response
        return new NextResponse(JSON.stringify(response), {
            status: 200
        });
    } catch (error) {
        //error response
        return new NextResponse(error, {
            status: 500
        });
    }
};

export const POST = async (request) => {
    //what method u want to use formData or req.json
    const formData = await request.formData();

    //try to get data from formData
    const rawTitle = formData.get('title'); // Ambil title dalam bentuk aslinya
    const title = rawTitle.toLowerCase(); // Ubah title menjadi lowercase

    const deskripsi = formData.get('deskripsi');
    const tatacara = formData.get('tatacara');
    const videourl = formData.get('videourl');
    const kategoriArray = formData.getAll('kategori[]');
    const imageFile = formData.get('image');
    const createdBy = formData.get('createdBy')

    try {

        // Access the "lombas" collection in Firestore
        const lombasCollection = collection(db, "lombas");

        const imageBuffer = await imageFile.arrayBuffer();

        // Compress the image using sharp
        const compressedImageBuffer = await sharp(imageBuffer)
            .webp() // Adjust the quality as needed
            .toBuffer()

        // Upload compressed image to Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, `images/${title}-${Date.now()}.webp`);
        await uploadBytes(imageRef, compressedImageBuffer);

        // Get the download URL of the uploaded image
        const imgurl = await getDownloadURL(imageRef);


        // Create a new document in the "lombas" collection
        await addDoc(lombasCollection, {
            title,
            deskripsi,
            imgurl,
            tatacara,
            videourl,
            kategori: kategoriArray,
            timestamps: serverTimestamp(),
            createdBy
        });
        //response OK
        return new NextResponse(JSON.stringify("Post berhasil disimpan"), {
            status: 201,
        });
    } catch (error) {
        //response Error
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};