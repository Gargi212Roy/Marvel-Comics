import axios from "../utils/axios-utils";
import { hash, ts } from "../utils/apiKey-utils";

const PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
export const getAllComicsForCharacterAPI = async (
	characterIds: number[],
	offset?: number
): Promise<any> => {
	try {
		const characterIdParams =
			characterIds.length === 1 ? characterIds[0] : characterIds.join(",");
		const url = `comics?characters=${characterIdParams}&offset=${offset}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
		const response = await axios.get(url);
		return response.data;
	} catch (err) {
		console.log("Error in getAllComicsForCharacterAPI: ", err);
	}
};

export const getCharacterDataAPI = async (
	characterName?: string,
	offset?: number
): Promise<any> => {
	try {
		const url =
			characterName !== undefined && characterName?.length > 0
				? `characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&nameStartsWith=${characterName}&offset=${offset}`
				: `characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=100`;
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log("Error in getAllCharacterDataAPI: ", error);
	}
};
