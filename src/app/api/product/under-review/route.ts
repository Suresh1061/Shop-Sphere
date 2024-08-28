import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/db/connection";
import ReviewProduct from '@/models/review-product';

export async function GET(req: NextRequest) {
    connect();
    const url = new URL(req.url)
    try {
        const userId = url.searchParams.get("userId") as unknown || "";
        const status = url.searchParams.get("status") as unknown || "";

        const reviewProducts = await ReviewProduct.find({
            product_updated_author_id: userId,
            review_status: status
        }).sort({ updatedAt: -1 });

        return NextResponse.json({ data: reviewProducts, success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }

}