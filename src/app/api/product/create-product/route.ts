import Products from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        await Products.create(reqBody);

        return NextResponse.json({ message: "Product created successfully", success: true }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 })
    }
}