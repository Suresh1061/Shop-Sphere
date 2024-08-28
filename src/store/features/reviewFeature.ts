"use client";
import { apiResponse, productResponseType, productType, userType } from "@/types";
import { baseApi } from "../baseApi";

type updateProductType = {
    id: string;
    product: productType;
    user: userType;
};

export const productApi = baseApi
    .enhanceEndpoints({
        addTagTypes: ["products", "product-details", "review", "review-products"]
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            //  find all products updated by user query
            getProductsUpdateByUser: builder.query<
                any,
                {
                    userId: string;
                    reviewStatus: string;
                }
            >({
                query: ({ userId, reviewStatus }) => ({
                    url: `/product/under-review`,
                    method: "GET",
                    params: {
                        userId,
                        status: reviewStatus,
                    },
                    credentials: "include" as const,
                }),
                providesTags: ["products"],
            }),
            // approve and reject product review mutation
            approveProductReview: builder.mutation<any, {
                id: string,
                action: 'approved' | 'rejected',
                user: userType
            }>({
                query: ({ id, action, user }) => ({
                    url: `/product/approve-product/${id}`,
                    method: "PATCH",
                    body: {
                        action,
                        user,
                    },
                    credentials: "include" as const,
                }),
                invalidatesTags: ["products", "product-details"],
            }),
            // find all products with pending review query
            getReviewProducts: builder.query<any, {
                limit?: number;
                page?: number;
                status?: string;
            }>({
                query: ({ limit = 10, page = 1, status = "pending" }) => ({
                    url: "/product/pending-requests",
                    method: "GET",
                    params: {
                        limit,
                        page,
                        status,
                    },
                    credentials: "include" as const,
                }),
                providesTags: ["review-products"],
            }),
            // find review product details query
            getReviewProductDetails: builder.query<apiResponse, { id: string }>({
                query: ({ id }) => ({
                    url: `/product/under-review/details/${id}`,
                    method: "GET",
                    credentials: "include" as const,
                }),
                providesTags: ["review"],
            }),
        }),
    });

export const {
    useGetProductsUpdateByUserQuery,
    useApproveProductReviewMutation,
    useGetReviewProductsQuery,
    useGetReviewProductDetailsQuery,
} = productApi;
