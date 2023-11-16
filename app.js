import express from "express";
import dotenv from "dotenv";
import connection from "./Connection/connection.js";
import { User, Product } from "./Models/index.js";
import router from "./Routes/router.js";

const app = express();

app.use("/api", router);

dotenv.config();

await connection.sync({ force: false }).then(() => {
	app.listen(process.env.PORT, async () => {
		console.log(`${process.env.MESSAGE} ${process.env.PORT}`);
	});
});
