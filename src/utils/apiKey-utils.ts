import md5 from "md5";

export const publicKey = process.env.API_PUBLIC_KEY;
const privateKey = process.env.API_PRIVATE_KEY;
export const ts = new Date().getTime().toString();

// Concatenate the timestamp, private key, and public key
const hashInput = ts + privateKey + publicKey;

export const hash = md5(hashInput);
