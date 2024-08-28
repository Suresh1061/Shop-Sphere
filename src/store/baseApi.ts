
import { apiResponse, productResponseType, productType, userType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type updateProductType = {
    id: string;
    product: productType;
    user: userType;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }),
    tagTypes: ["users", "products", 'product-details', 'user-details', 'review-products', "review"],
    endpoints: (builder) => ({
        userDetails: builder.query<any, {
            id: string
        }>({
            query: ({ id }) => ({
                url: `/user/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: ["user-details"],
        }),
        getAllProducts: builder.query<productResponseType, {
            pageNumber?: number;
            limit?: number;
            search?: string;
        }>({
            query: ({ pageNumber = 1, limit = 10, search }) => ({
                url: "/product",
                method: "GET",
                params: {
                    page: pageNumber,
                    limit: limit,
                    search,
                },
                credentials: "include" as const,
            }),
            providesTags: ["products"],
        }),
        getProductDetails: builder.query<apiResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/product/details/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: ["product-details"],
        }),
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
        updateProduct: builder.mutation<apiResponse, updateProductType>({
            query: ({ id, product, user }) => ({
                url: `/product/update-product/${id}`,
                method: "POST",
                body: {
                    product,
                    user,
                },
                credentials: "include" as const,
            }),
            invalidatesTags: ["products", "product-details"],
        }),
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
    useUserDetailsQuery,
    useGetAllProductsQuery,
    useGetProductDetailsQuery,
    useUpdateProductMutation,
    useApproveProductReviewMutation,
    useGetProductsUpdateByUserQuery,
    useGetReviewProductsQuery,
    useGetReviewProductDetailsQuery,
} = baseApi;
