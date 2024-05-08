import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterState {
	characterIds: number[];
}

const initialState: CharacterState = {
	characterIds: [],
};

const characterSlice = createSlice({
	name: "characters",
	initialState,
	reducers: {
		addCharacterIds(state, action: PayloadAction<number[]>) {
			state.characterIds = [...state.characterIds, ...action.payload];
		},
	},
});

// Export actions
export const { addCharacterIds } = characterSlice.actions;

// Export reducer
export default characterSlice.reducer;
