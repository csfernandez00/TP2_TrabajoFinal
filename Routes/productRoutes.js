import { Router } from "express";
import ProductsController from "../Controllers/ProductsController.js";
import { hasPermissions } from "../Middlewares/hasPermissions.js";
import { hasAdminRole } from "../Middlewares/hasAdminRole.js";
import { isAuthorizedProducts } from "../Middlewares/isAuthorizedProducts.js";

const productRoutes = Router();

const productController = new ProductsController();

productRoutes.post("/", productController.createProduct);
productRoutes.get("", hasAdminRole, productController.getAllProducts);

productRoutes.get(
	"/owner/:userid",
	hasPermissions,
	productController.getAllProductsOfAUser
);

productRoutes.get(
	"/:id",
	isAuthorizedProducts,
	productController.getProductByID
);

productRoutes.put(
	"/:id",
	isAuthorizedProducts,
	productController.updateProduct
);
productRoutes.delete(
	"/:id",
	isAuthorizedProducts,
	productController.deleteProduct
);

export default productRoutes;
