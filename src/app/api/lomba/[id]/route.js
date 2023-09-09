import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/app/firebase";

export const GET = async (request, { params }) => {
    try {
        // No need to connect() since you're using Firestore
        const { id } = params; // Assuming the ID is passed as a route parameter

        const docRef = doc(db, "lombas", id);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            return new NextResponse("Lomba not found", {
                status: 404
            });
        }

        const lombaData = docSnapshot.data();

        const response = {
            status: "success",
            lomba: lombaData
        };
        return new NextResponse(JSON.stringify(response), {
            status: 200
        });
    } catch (error) {
        return new NextResponse("Connect Database Gagal", {
            status: 500
        });
    }
}