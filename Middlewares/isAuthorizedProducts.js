import Product from "../Models/Product.js";
import { validateToken } from "../Utils/JWT.js";

export const isAuthorizedProducts = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		const { id } = req.params;
		const product = await Product.findOne({
			where: { id_producto: id },
		});
		if (!product)
			throw new Error("No se encontro un producto con el ID ingresado!");

		const user = validateToken(token);

		if (user.role !== "ADMIN" && product.id_usuario !== user.id)
			throw new Error("No tiene los permisos suficientes para esta accion.");

		next();
	} catch (error) {
		res.status(403).send({ message: error.message });
	}
};
