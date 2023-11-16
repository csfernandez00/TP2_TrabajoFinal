import { Router } from "express";
import ProductsController from "../Controllers/ProductsController";

const productRoutes = Router();

const productController = new ProductsController();

productRoutes.get("", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductByID);
productRoutes.post("/", productController.createProduct);
productRoutes.put("/:id", productController.updateProduct);
productRoutes.delete("/:id", productController.deleteProduct);

export default productRoutes;
