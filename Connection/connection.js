import { Model, Sequelize } from "sequelize";

const connection = new Sequelize("tpfinal-tp2", "root", "", {
	host: "localhost",
	dialect: "mysql",
	port: 3306,
});

try {
	await connection.authenticate();
	console.log("Database Connected!");
} catch (err) {
	console.error("Unable to connect to database", err);
}

export default connection;
