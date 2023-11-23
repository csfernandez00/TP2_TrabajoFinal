import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import roleRoutes from "./roleRoutes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/role", roleRoutes);

export default router;
