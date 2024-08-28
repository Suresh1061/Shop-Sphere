import { connect } from "@/db/connection";
import ReviewProduct from "@/models/review-product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    connect();
    try {
        const url = new URL(req.url)
        const limit = url.searchParams.get("limit") as unknown as number || 10;
        const page = url.searchParams.get("page") as unknown as number || 1;
        const status = url.searchParams.get("status") || "pending";

        const reviewsProducts = await ReviewProduct.find({ review_status: status }).limit(limit).skip((page - 1) * limit);
        const totalSize = reviewsProducts.length;
        const totalPages = Math.ceil(totalSize / limit);

        return NextResponse.json(
            {
                data: reviewsProducts,
                totalSize,
                totalPages,
                page,
                limit,
                message: "All review products fetched successfully ",
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