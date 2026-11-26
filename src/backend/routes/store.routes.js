import { Router } from "express";
import {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore,
} from "../controllers/store.controller.js";

const router = Router();

router.get("/store", getStores);
router.get("/store/:id", getStoreById);
router.post("/store", createStore);
router.put("/store/:id", updateStore);
router.delete("/store/:id", deleteStore);

export default router;