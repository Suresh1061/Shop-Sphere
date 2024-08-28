
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reducers from "./reducers";
import { baseApi } from "./baseApi";
import { getSession } from "@/app/lib";

const store = configureStore({
	reducer: reducers,
	devTools: false,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;

export default store;
