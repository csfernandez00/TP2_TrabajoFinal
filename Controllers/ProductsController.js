import { Product, User } from "../Models/index.js";

class ProductsController {
	constructor() {}
	getAllProducts = async (req, res) => {
		try {
			const productsList = await Product.findAll({
				attributes: [
					"id_producto",
					"nombre",
					"marca",
					"modelo",
					"cantidad",
					"codigo_Interno",
					"id_usuario",
				],
				include: [
					{ model: User, attributes: ["nombre", "apellido"], as: "usuario" },
				],
			});

			if (productsList?.length === 0)
				throw new Error(
					"No existen productos registrados en la base de datos!"
				);

			res.status(200).send({ success: true, data: productsList });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	getAllProductsOfAUser = async (req, res) => {
		try {
			const { userid } = req.params;
			const productsList = await Product.findAll({
				attributes: [
					"id_producto",
					"nombre",
					"marca",
					"modelo",
					"cantidad",
					"codigo_Interno",
				],
				where: { id_usuario: userid },
			});

			if (productsList?.length === 0)
				throw new Error(
					"No existen productos registrados en la base de datos para ese usuario!"
				);

			res.status(200).send({ success: true, data: productsList });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	createProduct = async (req, res) => {
		try {
			const { nombre, marca, modelo, cantidad, codigo_Interno, id_usuario } =
				req.body;
			const newProduct = await Product.create({
				nombre,
				marca,
				modelo,
				cantidad,
				codigo_Interno,
				id_usuario,
			});

			if (!newProduct) throw new Error("Error al crear el nuevo producto");

			res.status(200).send({
				success: true,
				message: "El producto fue creado exitosamente!",
			});
		} catch (error) {
			res.status(400).send({
				success: false,
				message: error.message,
			});
		}
	};

	// --------- Utilizan isAuthorizedProducts para chequear si es el dueño del producto o un admin -------------------
	getProductByID = async (req, res) => {
		try {
			const { id } = req.params;
			const product = await Product.findOne({
				attributes: [
					"id_producto",
					"nombre",
					"marca",
					"modelo",
					"cantidad",
					"codigo_Interno",
					"id_usuario",
				],
				include: [
					{ model: User, attributes: ["nombre", "apellido"], as: "usuario" },
				],
				where: { id_producto: id },
			});

			res.status(200).send({ success: true, data: product });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	updateProduct = async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, marca, modelo, cantidad, codigo_Interno } = req.body;

			const updated = await Product.update(
				{
					nombre,
					marca,
					modelo,
					cantidad,
					codigo_Interno,
				},
				{
					where: { id_producto: id },
				}
			);

			if (!updated)
				throw new Error("No se ha podido modificar el producto ingresado!");

			res
				.status(200)
				.send({ success: true, message: "Producto modificado exitosamente!" });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	deleteProduct = async (req, res) => {
		try {
			const { id } = req.params;

			const deleted = await Product.destroy({ where: { id_producto: id } });

			if (!deleted)
				throw new Error("No se ha podido eliminar el producto ingresado!");

			res
				.status(200)
				.send({ success: true, message: "Producto eliminado exitosamente!" });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};
}

export default ProductsController;
