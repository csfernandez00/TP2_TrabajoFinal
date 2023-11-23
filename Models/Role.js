import { DataTypes as dt, Model } from "sequelize";
import connection from "../Connection/connection.js";

class Role extends Model {}
Role.init(
	{
		id_rol: {
			type: dt.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		nombre: {
			type: dt.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notNull: true,
				notEmpty: {
					msg: "El rol debe tener un nombre",
				},
			},
		},
	},
	{
		sequelize: connection,
		modelName: "Role",
		timestamps: false,
	}
);

export default Role;
