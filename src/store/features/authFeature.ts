// "use client";
// import { baseApi } from "../baseApi";



// export const authApi = baseApi.injectEndpoints({
// 	endpoints: (builder) => ({
// 		login: builder.mutation<any, any>({
// 			query: (data) => ({
// 				url: "/auth/phone-login",
// 				method: "POST",
// 				headers: {
// 					Authorization: `Basic  ${Buffer.from(
// 						process.env.NEXT_PUBLIC_URL_API_USERNAME +
// 						":" +
// 						process.env.NEXT_PUBLIC_URL_API_PASSWORD,
// 					).toString("base64")}`,
// 				},
// 				body: data,
// 				credentials: "include" as const,
// 			}),
// 			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
// 				const loggedinUser = await queryFulfilled;
// 				dispatch(userLoggedIn(loggedinUser.data));
// 			},
// 		}),
// 		userInfo: builder.query<any, any>({
// 			query: () => ({
// 				url: "/auth/user-info",
// 				method: "GET",
// 				credentials: "include" as const,
// 			}),
// 		}),

// 	}),
// });

// export const {
// 	useLoginUserMutation,
// } = authApi;
