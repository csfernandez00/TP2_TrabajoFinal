import { Router } from "express";
import UsersController from "../Controllers/UsersController.js";
import { hasPermissions } from "../Middlewares/hasPermissions.js";
import { hasAdminRole } from "../Middlewares/hasAdminRole.js";

const userRoutes = Router();

const userController = new UsersController();

userRoutes.post("/", userController.createUser);
userRoutes.post("/auth", userController.login);

userRoutes.put("/:id", hasPermissions, userController.updateUser);
userRoutes.get("/:id", hasPermissions, userController.getUserByID);

userRoutes.get("", hasAdminRole, userController.getAllUsers);
userRoutes.delete("/:id", hasAdminRole, userController.deleteUser);

export default userRoutes;
