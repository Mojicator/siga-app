import { Router } from 'express';
import * as ProductController from "../controllers/product_controller";

const router: Router = Router();

router.get("/products", ProductController.addProduct);
router.get("/product/:id", ProductController.showProduct);
router.post("/product", ProductController.addProduct);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);
router.get("/product/:product_id/histories", ProductController.getPriceHistoriesByProductId);

export default router;