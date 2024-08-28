import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/db/connection";

export async function POST(req: NextRequest) {
    connect();
    try {
        const { email, password } = await req.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User does not exists!", success: false },
                { status: 404 }
            );
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return NextResponse.json(
                { message: "Incorrect password!", success: false },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { data: user, message: "Login successful", success: true },
            { status: 201 }
        );
    } catch (error: any) {
        console.log("Error while login  ", error);
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}
