import { Role } from "../Models/index.js";

class RolesController {
	constructor() {}

	createRole = async (req, res) => {
		try {
			const { nombre } = req.body;
			const newRole = Role.create({ nombre });
			if (!newRole) throw new Error("Error al crear el rol");

			res
				.status(200)
				.send({ success: true, message: "Se ha creado el rol exitosamente!" });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	getAllRoles = async (req, res) => {
		try {
			const roles = await Role.findAll({ attributes: ["id_rol", "nombre"] });
			if (roles?.length === 0)
				throw new Error("No existen roles registrados en la base de datos!");

			res.status(200).send({ success: true, data: roles });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	getRoleByID = async (req, res) => {
		try {
			const { id } = req.params;
			const role = await Role.findOne({
				attributes: ["id_rol", "nombre"],
				where: { id_rol: id },
			});
			if (!role) throw new Error("No existe un rol con el id ingresado!");

			res.status(200).send({ success: true, data: role });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	updateRole = async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre } = req.body;
			const role = await Role.findOne({
				where: { id_rol: id },
			});

			if (!role) throw new Error("No existe un rol con el id ingresado!");

			const updated = await role.update({ nombre });

			if (!updated)
				throw new Error("No se ha podido modificar el rol ingresado!");

			res
				.status(200)
				.send({ success: true, message: "Rol modificado exitosamente!" });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};

	deleteRole = async (req, res) => {
		try {
			const { id } = req.params;
			const role = await Role.findOne({
				where: { id_rol: id },
			});

			if (!role) throw new Error("No existe un rol con el id ingresado!");

			const deleted = await role.destroy();

			if (!deleted)
				throw new Error("No se ha podido eliminar el rol ingresado!");

			res
				.status(200)
				.send({ success: true, message: "Rol eliminado exitosamente!" });
		} catch (error) {
			res.status(400).send({ success: false, message: error.message });
		}
	};
}

export default RolesController;
