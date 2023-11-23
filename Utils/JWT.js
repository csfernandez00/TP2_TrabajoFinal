import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Config/config.js";

export const createToken = (user) => {
	return jwt.sign(user, JWT_SECRET);
};

export const validateToken = (tkn) => {
	return jwt.verify(tkn, JWT_SECRET);
};
