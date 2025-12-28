import { Router } from "express";
import {
  createItem,
  getItemById,
  getAllItems,
  updateItem,
  deleteItem,
} from "../controllers/vaultItemController";
import { authenticateUser } from "../middleware/requireAuth";

const router = Router();

router
  .route("/")
  .get(authenticateUser, getAllItems)
  .post(authenticateUser, createItem);

router
  .route("/:id")
  .get(authenticateUser, getItemById)
  .put(authenticateUser, updateItem)
  .delete(authenticateUser, deleteItem);

export default router;
