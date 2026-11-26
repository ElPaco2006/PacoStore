import {Router} from "express";
import {
    customer_create, customer_delete,
    customer_get_all, customer_get_by_id,
    customer_update

} from "../controllers/customer.controller.js";

const router = Router();

router.get("/customer", customer_get_all);
router.get("/customer/:id", customer_get_by_id);
router.post("/customer", customer_create);
router.put("/customer/:id", customer_update);
router.delete("/customer/:id", customer_delete);

export default router;