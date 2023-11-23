import { Router } from "express";
import RolesController from "../Controllers/RolesController.js";
import { hasAdminRole } from "../Middlewares/hasAdminRole.js";

const roleRoutes = Router();

const roleController = new RolesController();

roleRoutes.use(hasAdminRole);
roleRoutes.get("", roleController.getAllRoles);
roleRoutes.get("/:id", roleController.getRoleByID);
roleRoutes.post("/", roleController.createRole);
roleRoutes.put("/:id", roleController.updateRole);
roleRoutes.delete("/:id", roleController.deleteRole);

export default roleRoutes;
