import { DataTypes as dt, Model } from "sequelize";
import bcrypt from "bcrypt";
import connection from "../Connection/connection.js";

class User extends Model {
	// Encripto la password cruda para compararla con la que ya tengo encriptada en mi base
	validatePassword = async (rawPassword) => {
		const validate = await bcrypt.compare(rawPassword, this.password);
		return validate;
	};
}

User.init(
	{
		id_usuario: {
			type: dt.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		nombre: {
			type: dt.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Se debe ingresar un nombre",
				},
			},
		},
		apellido: {
			type: dt.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Se debe ingresar un apellido",
				},
			},
		},
		mail: {
			type: dt.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "El formato del mail debe ser valido -> ejemplo@ejemplo.com",
				},
				notEmpty: true,
				notNull: true,
			},
		},
		empresa: {
			type: dt.STRING,
			allowNull: true,
		},
		pais: {
			type: dt.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "Se debe ingresar un pais",
				},
			},
		},
		salt: {
			type: dt.STRING,
		},
		password: {
			type: dt.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "Se debe establecer una contraseña",
				},
			},
		},
	},
	{
		sequelize: connection,
		modelName: "User",
		timestamps: false,
	}
);

User.beforeCreate(async (user) => {
	const salt = await bcrypt.genSalt();
	user.salt = salt;
	const hashPassword = await bcrypt.hash(user.password, salt);
	user.password = hashPassword;
});
export default User;
