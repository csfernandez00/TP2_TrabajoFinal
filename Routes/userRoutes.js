import { Router } from "express";
import UsersController from "../Controllers/UsersController";

const userRoutes = Router();

const userController = new UsersController();

userRoutes.get("", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserByID);
userRoutes.post("/", userController.createUser);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
