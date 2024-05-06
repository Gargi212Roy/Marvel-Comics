import axios from "../utils/axios-utils";
import { hash, ts, publicKey } from "../utils/apiKey-utils";

export const getALlComicCharactersAPI = async (): Promise<any> => {
	try {
		const url = `characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
		const response = await axios.get(url);
		return response.data;
	} catch (err) {
		console.log("Error in getALlComicCharactersAPI: ", err);
	}
};
