import { configureStore } from "@reduxjs/toolkit";
import characterIdsReducer from "./slices/characterIdsSlice";
import characterNameReducer from "./slices/characterNameSlice";

const rootReducer = {
	characterIds: characterIdsReducer,
	characterName: characterNameReducer,
};
const store = configureStore({
	reducer: rootReducer,
});

export default store;
