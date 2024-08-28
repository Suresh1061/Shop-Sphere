
import { combineReducers } from "@reduxjs/toolkit"; 
import { baseApi } from "./baseApi";
import authSlice from "./slice/auth";

const reducers = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer, 
	user: authSlice.reducer,
});

export default reducers;
