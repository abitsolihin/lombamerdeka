import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Users from "@/models/user/user";

export const POST = async (request) => {
    const { username, email, password } = await request.json();

    await connect();

    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return new NextResponse("Akun berhasil dibuat", {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};