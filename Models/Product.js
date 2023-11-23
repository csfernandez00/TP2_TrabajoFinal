import { DataTypes as dt, Model } from "sequelize";
import connection from "../Connection/connection.js";

class Product extends Model {}
Product.init(
	{
		id_producto: {
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
					msg: "Se debe ingresar un nombre para el producto",
				},
			},
		},
		marca: {
			type: dt.STRING,
			allowNull: false,
		},
		modelo: {
			type: dt.STRING,
			allowNull: false,
		},
		cantidad: {
			type: dt.INTEGER,
			allowNull: false,
		},
		codigo_Interno: {
			type: dt.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: connection,
		modelName: "Product",
		timestamps: false,
	}
);

export default Product;
