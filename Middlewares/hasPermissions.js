import { validateToken } from "../Utils/JWT.js";

export const hasPermissions = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		const { id } = req.params;
		const user = validateToken(token);

		if (user.role !== "ADMIN" && user.id != id)
			throw new Error("No tiene los permisos suficientes para esta accion.");

		next();
	} catch (error) {
		res.status(403).send({ message: error.message });
	}
};
