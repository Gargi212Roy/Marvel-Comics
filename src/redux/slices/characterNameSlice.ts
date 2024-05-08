import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterNameState {
	characterName: string;
}

const initialState: CharacterNameState = {
	characterName: "",
};

const characterNameSlice = createSlice({
	name: "characterName",
	initialState,
	reducers: {
		setCharacterName(state, action: PayloadAction<string>) {
			state.characterName = action.payload;
		},
	},
});

export const { setCharacterName } = characterNameSlice.actions;

export default characterNameSlice.reducer;
