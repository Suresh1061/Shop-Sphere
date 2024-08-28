import { connect } from "@/db/connection";
import Products from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    connect();
    try {
        const url = new URL(req.url)
        const limit = url.searchParams.get("limit") as unknown as number || 10;
        const page = url.searchParams.get("page") as unknown as number || 1;
        const searchValue = url.searchParams.get("search") || "";
        let products;
        if (searchValue) {
            products = await Products.find({ productName: searchValue }).limit(limit).skip((page-1) * limit);
        } else {
            products = await Products.find().limit(limit).skip((page - 1) * limit); 
        }
        const totalSize = await Products.countDocuments();
        const totalPages = Math.ceil(totalSize / limit);
        return NextResponse.json(
            {
                data: products,
                totalSize,
                totalPages,
                page,
                limit,
                message: "All products fetched successfully ",
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
