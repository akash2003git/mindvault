import { Router } from "express";
import { createItem, getItemById } from "../controllers/vaultItemController";
import { authenticateUser } from "../middleware/requireAuth";

const router = Router();

router.route("/").post(authenticateUser, createItem);

router.route("/:id").get(authenticateUser, getItemById);

export default router;
