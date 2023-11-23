import User from "./User.js";
import Product from "./Product.js";
import Role from "./Role.js";

Product.belongsTo(User, {
	foreignKey: "id_usuario",
	as: "usuario",
});

User.hasMany(Product, {
	foreignKey: "id_usuario",
	as: "productos",
});

Role.hasMany(User, {
	foreignKey: "id_rol",
});

User.belongsTo(Role, {
	foreignKey: "id_rol",
});

export { User, Product, Role };
