import axios from "axios";

const environment = {
	API_URL: `https://gateway.marvel.com:443/v1/public/`,
};

const httpsInstance = axios.create({ baseURL: environment.API_URL });

httpsInstance.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
);

export default httpsInstance;
