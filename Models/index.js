import User from "./User.js";
import Product from "./Product.js";

Product.belongsTo(User, {
	foreignKey: "id_usuario",
	as: "usuario",
});

User.hasMany(Product, {
	foreignKey: "id_usuario",
	as: "productos",
});

export { User, Product };
