import { where } from "sequelize";
import { Role, User } from "../Models/index.js";
import { createToken } from "../Utils/JWT.js";

class UsersController {
	constructor() {}

	createUser = async (req, res) => {
		try {
			const { nombre, apellido, mail, empresa, pais, password, id_rol } =
				req.body;
			const newUser = await User.create({
				nombre,
				apellido,
				mail,
				empresa,
				pais,
				password,
				id_rol,
			});
			if (!newUser) throw new Error("Error al crear el usuario");

			res.status(200).send({
				success: true,
				message: "El usuario ha sido creado exitosamente!",
				data: newUser,
			});
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	login = async (req, res) => {
		try {
			const { mail, password } = req.body;
			const user = await User.findOne({
				where: { mail },
				include: [{ model: Role, attributes: ["nombre"] }],
			});
			if (!user) throw new Error("El usuario o la contraseña son incorrectos.");

			const validate = await user.isValidPassword(password);
			if (!validate)
				throw new Error("El usuario o la contraseña son incorrectos.");

			const dataForToken = {
				id: user.id_usuario,
				role: user.Role.dataValues.nombre,
			};

			console.log(dataForToken);

			res.cookie("token", createToken(dataForToken)).status(200).send({
				success: true,
				message: "Login completo exitosamente!",
			});
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	// ---Requieren rol de admin o que el usuario sea el "dueño" de los datos--------

	updateUser = async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, apellido, mail, password } = req.body;

			const user = await User.findOne({
				where: { id_usuario: id },
			});

			if (!user)
				throw new Error("No se encontro un usuario con el ID ingresado!");

			const updated = await user.update({ nombre, apellido, mail, password });

			if (!updated) throw new Error(`No se ha podido modificar el usuario!`);

			res.status(200).send({
				success: true,
				message: `Usuario modificado exitosamente!`,
				data: user,
			});
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	getUserByID = async (req, res) => {
		try {
			const { id } = req.params;
			const user = await User.findOne({
				attributes: ["id_usuario", "nombre", "apellido", "mail"],
				include: [{ model: Role, attributes: ["nombre"] }],
				where: { id_usuario: id },
			});

			if (!user)
				throw new Error("No se encontro un usuario con el ID ingresado!");

			res.status(200).send({ success: true, data: user });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	// --------------- Requieren rol de admin -------------------------
	getAllUsers = async (req, res) => {
		try {
			const usersList = await User.findAll({
				attributes: ["id_usuario", "nombre", "apellido", "mail"],
				include: [{ model: Role, attributes: ["nombre"] }],
			});

			if (usersList.length === 0)
				throw new Error("No existen usuarios registrados en la base de datos!");

			res.status(200).send({ success: true, data: usersList });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};
	deleteUser = async (req, res) => {
		try {
			const { id } = req.params;
			const user = await User.findOne({
				where: { id_usuario: id },
			});

			if (!user)
				throw new Error("No se encontro un usuario con el ID ingresado!");

			const userDeleted = await user.destroy();

			if (!userDeleted)
				throw new Error("No se ha podido eliminar el usuario ingresado!");

			res
				.status(200)
				.send({ success: true, message: "Usuario eliminado exitosamente!" });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};
}

export default UsersController;
