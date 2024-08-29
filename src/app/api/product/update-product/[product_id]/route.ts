import Products from "@/models/products";
import ReviewProduct from "@/models/review-product";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { product_id: string } }
) {
    try {
        const { product_id } = params;
        const reqBody = await req.json();

        const { user, product } = reqBody;
        if (!user || !product) {
            return NextResponse.json(
                { message: "Invalid request", success: false },
                { status: 400 }
            );
        }
        
        const productExists = await Products.findById(product_id);

        //if product not exist
        if (!productExists) {
            return NextResponse.json(
                { message: "Product not found", success: false },
                { status: 404 }
            );
        }

        // check if user is admin then update the product in product database
        if (user.role === "admin") {
            await Products.findByIdAndUpdate(
                product_id,
                product,
                { new: true }
            );
            return NextResponse.json(
                { message: "Product updated successfully", success: true },
                { status: 200 }
            );
        }

        // Extract the edited product information
        const {
            productName,
            price,
            productDescription,
            image,
            department,
        } = product;
        const reviewProductExists = await ReviewProduct.findOne({ id: product_id });

        // if product is already under review
        if (reviewProductExists.review_status === "pending") {
            return NextResponse.json(
                { message: "Product is already under review", success: false },
                { status: 409 }
            );
        }

        // if product is already updated, but try to update
        if (reviewProductExists.review_status === "pending") {
            return NextResponse.json(
                { message: "Product is already under review", success: false },
                { status: 409 }
            );
        }
        
        // if product is not under review
        if (!reviewProductExists) {
            const review_product = await ReviewProduct.create({
                id: product_id,
                productName,
                price,
                productDescription,
                image,
                department,
                review_status: "pending",
                product_updated_author: user.email,
                product_updated_author_id: user.id,
            });
            // update user pending review count
            await User.findByIdAndUpdate(
                user.id,
                { $inc: { no_of_pending_reviews: 1 } },
                { new: true }
            );

            return NextResponse.json(
                { message: "Product is under review", success: true },
                { status: 200 }
            );
        }

        // if product is rejected or approved but needs to be updated
        const review_product = await ReviewProduct.findByIdAndUpdate(
            product_id,
            {
                productName,
                price,
                productDescription,

                image,
                department,
                id: product_id,
                review_status: "pending",
                product_updated_author: user.email,
                product_updated_author_id: user.id,
            },
            { new: true }
        );

        // update user pending review count
        await User.findByIdAndUpdate(
            user.id,
            { $inc: { no_of_pending_reviews: 1 } },
            { new: true }
        );
        return NextResponse.json(
            { message: "Product is under review", success: true },
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
