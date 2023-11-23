import express from "express";
import connection from "./Connection/connection.js";
import { User, Product, Role } from "./Models/index.js";
import router from "./Routes/router.js";
import { MESSAGE, PORT } from "./Config/config.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

await connection.sync({ force: false }).then(() => {
	app.listen(PORT, async () => {
		console.log(`${MESSAGE} ${PORT}`);
	});
});
