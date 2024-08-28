import Products from "@/models/products";
import ReviewProduct from "@/models/review-product";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { product_id: string } }
) {
    try {
        const { product_id } = params;
        const { user, action } = await req.json();

        // if product_id or action is not present in request body
        if (!product_id || !action) {
            return NextResponse.json(
                { message: "Invalid request", success: false },
                { status: 400 }
            );
        }

        // if user is not admin
        if (user.role !== "admin") {
            return NextResponse.json(
                {
                    message: "You are not authorized to perform this action",
                    success: false,
                },
                { status: 401 }
            );
        }

        const productDetails = await ReviewProduct.findOne({ id: product_id });

        // if product is not present in review collection
        if (!productDetails) {
            return NextResponse.json(
                { message: "Product is not present under review", success: false },
                { status: 404 }
            );
        }

        // if action is not approve or reject
        if (action !== "approved" && action !== "rejected") {
            return NextResponse.json(
                { message: "Invalid action", success: false },
                { status: 400 }
            );
        }

        // if  product already approve or reject
        if (
            productDetails.review_status === "approved" ||
            productDetails.review_status === "rejected"
        ) {
            console.log("Already updated the status of the product")
            return NextResponse.json(
                {
                    message: "Already updated the status of the product",
                    success: false,
                },
                { status: 400 }
            );
        }
        // if admin approves the product
        if (action === "approved") {
            const {
                productName,
                price,
                productDescription,
                stock,
                image,
                department,
            } = productDetails;
            // update original product with review product details
            const updatedProduct = await Products.findByIdAndUpdate(
                product_id,
                {
                    productName,
                    price,
                    productDescription,
                    stock,
                    image,
                    department,
                },
                { new: true }
            );
            // increment member approved reviews count, decrement pending reviews count
            await User.findByIdAndUpdate(
                productDetails.product_updated_author_id,
                {
                    $inc: {
                        no_of_approved_reviews: 1,
                        no_of_pending_reviews: -1,
                    },
                },
                { new: true }
            );
            // update admin approved reviews count
            await User.findByIdAndUpdate(
                user.id,
                {
                    $inc: { no_of_approved_reviews: 1 },
                },
                { new: true }
            );
            // update review product status to approved
            const approveReview = await ReviewProduct.findByIdAndUpdate(
                productDetails._id,
                { review_status: "approved" },
                { new: true }
            );

            return NextResponse.json(
                { message: "Product approved successfully", success: true },
                { status: 201 }
            );
        }
        // if admin rejects the product
        const rejectReview = await ReviewProduct.findByIdAndUpdate(
            productDetails._id,
            { review_status: "rejected" },
            { new: true }
        );
        // increment member rejected reviews count
        await User.findByIdAndUpdate(
            productDetails.product_updated_author_id,
            {
                $inc: {
                    no_of_rejected_reviews: 1,
                    no_of_pending_reviews: -1,
                },
            },
            { new: true }
        );
        // update admin rejected reviews count
        await User.findByIdAndUpdate(
            user.id,
            {
                $inc: { no_of_rejected_reviews: 1 },
            },
            { new: true }
        );

        return NextResponse.json(
            { message: "Product review is rejected!", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
