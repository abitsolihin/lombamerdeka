import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/app/firebase";

export const GET = async (request, { params }) => {
    try {
        // Extract the ID from the route parameters
        const { id } = params; // Assuming the ID is passed as a route parameter

        // Create a Firestore document reference using the extracted ID
        const docRef = doc(db, "lombas", id);

        // Get a snapshot (data) of the document
        const docSnapshot = await getDoc(docRef);

        // If the document does not exist, return a 404 response
        if (!docSnapshot.exists()) {
            return new NextResponse("Lomba not found", {
                status: 404
            });
        }

        // Get the lomba data from the snapshot
        const lombaData = docSnapshot.data();

        // Create a success response with the lomba data
        const response = {
            status: "success",
            lomba: lombaData
        };
        return new NextResponse(JSON.stringify(response), {
            status: 200
        });
    } catch (error) {
        // If an error occurs, return a server error response
        return new NextResponse("Failed to Connect to Database", {
            status: 500
        });
    }
}