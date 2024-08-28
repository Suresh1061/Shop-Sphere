import { connect } from "@/db/connection";
import ReviewProduct from "@/models/review-product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    connect();
    try {
        const { id } = params;
        const reviewProduct = await ReviewProduct.findOne({ id });
        if (!reviewProduct) {
            return NextResponse.json(
                { message: "Product not found", success: false },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                data: reviewProduct,
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
