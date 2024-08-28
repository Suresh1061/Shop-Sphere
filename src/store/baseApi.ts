import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "./slice/auth";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }),
    tagTypes: ["user", "login", "register"],
    endpoints: (builder) => ({
        login: builder.mutation<any, {
            email: string;
            password: string;
        }>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            invalidatesTags: ["login"],
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            //     const loggedInUser = await queryFulfilled;
            //     if (loggedInUser?.data?.success) {
            //         dispatch(userLoggedIn(loggedInUser?.data?.data));
            //     }
            // },
        }),
        register: builder.mutation<any, {
            role: string;
            email: string;
            password: string;
        }>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            invalidatesTags: ["register"],
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            //     const loggedInUser = await queryFulfilled;
            //     if (loggedInUser?.data?.success) {
            //         dispatch(userLoggedIn(loggedInUser?.data?.data));
            //     }
            // },
        }),
        userDetails: builder.query<any, {
            id: string
        }>({
            query: ({ id }) => ({
                url: `/user/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: ["user"],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useUserDetailsQuery,
} = baseApi;
