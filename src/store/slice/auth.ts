import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: "",
        email: "",
        role: "",
        no_of_pending_reviews: 0,
        no_of_approved_reviews: 0,
        no_of_rejected_reviews: 0,
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            const { id, email, role, no_of_pending_reviews, no_of_approved_reviews, no_of_rejected_reviews } = action.payload;
            state.user = {
                id,
                email,
                role,
                no_of_pending_reviews,
                no_of_approved_reviews,
                no_of_rejected_reviews,
            };
        },
        userLoggedOut: (state) => {
            state.user = initialState.user;
        },
    },
});

export default authSlice;
