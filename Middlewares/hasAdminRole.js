import { validateToken } from "../Utils/JWT.js";

export const hasAdminRole = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		const isAdmin = validateToken(token);

		if (isAdmin.role !== "ADMIN")
			throw new Error("No tiene los permisos suficientes para esta accion.");

		next();
	} catch (error) {
		res.status(403).send({ message: error.message });
	}
};
