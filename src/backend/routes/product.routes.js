import {Router} from "express";
import {
    product_create, product_delete,
    product_get_all, product_get_by_sku,
    product_update
} from "../controllers/product.controller.js";

const router = Router();

router.get("/product", product_get_all);
router.get("/product/:id", product_get_by_sku);
router.post("/product", product_create);
router.put("/product/:id", product_update);
router.delete("/product/:id", product_delete);

export default router;