import axios from "../utils/axios-utils";
import { hash, ts } from "../utils/apiKey-utils";

const PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;

export const getALlComicCharactersAPI = async (): Promise<any> => {
	try {
		console.log("called");
		const url = `characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
		const response = await axios.get(url);
		return response.data;
	} catch (err) {
		console.log("Error in getALlComicCharactersAPI: ", err);
	}
};
