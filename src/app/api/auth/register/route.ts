import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/db/connection";

export async function POST(req: NextRequest) {
    connect();
    try {
        const { email, password, role } = await req.json();
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return NextResponse.json(
                { message: "User already exist!", success: false },
                { status: 400 }
            );
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashPassword,
            role,
        });

        return NextResponse.json(
            { data: newUser, message: "Registration successfully", success: true },
            { status: 201 }
        );
    } catch (error: any) {
        console.log("Error while registering ", error);
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}
