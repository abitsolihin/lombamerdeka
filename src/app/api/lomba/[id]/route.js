import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/app/firebase";

export const GET = async (request, { params }) => {
    try {
        // Extract the ID from the route parameters
        const { id } = params;

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

        // Calculate total views (views)
        const totalViews = lombaData.views + 1; // For example, we increment by 1 each time the lomba is accessed

        // Update views in Firestore (optional, if you want to persist the total views)
        await updateDoc(docRef, { views: totalViews });

        // Create a success response with the lomba data and total views
        const response = {
            status: "success",
            lomba: lombaData,
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
};
