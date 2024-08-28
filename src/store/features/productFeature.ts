"use client";
import { apiResponse, productResponseType, productType, userType } from "@/types";
import { baseApi } from "../baseApi";

type updateProductType = {
    id: string;
    product: productType;
    user: userType;
};

export const productApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["products", "product-details"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // find all products query
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
            // find product details query
            getProductDetails: builder.query<apiResponse, { id: string }>({
                query: ({ id }) => ({
                    url: `/product/details/${id}`,
                    method: "GET",
                    credentials: "include" as const,
                }),
                providesTags: ["product-details"],
            }),
            // product update by user query
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
        }),
    });

export const {
    useGetAllProductsQuery,
    useGetProductDetailsQuery,
    useUpdateProductMutation,
} = productApi;
