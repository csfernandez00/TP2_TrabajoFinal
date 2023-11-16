import { Router } from "express";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);

export default router;
