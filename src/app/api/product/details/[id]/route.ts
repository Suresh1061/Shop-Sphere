import { connect } from "@/db/connection";
import Products from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    connect();
    try {
        const { id } = params;
        const product = await Products.findById(id);
        if (!product) {
            return NextResponse.json(
                { message: "Product not found", success: false },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                data: product,
                message: "Product fetched successfully",
                success: true,
            },
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
