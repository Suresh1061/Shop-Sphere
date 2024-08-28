import { connect } from "@/db/connection";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    connect()
    try {
        const { id } = params;
        const user = await User.findById(id); 
        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { data: user, message: "User fetched successfully", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}