import { Router } from "express";
import {
  addContent,
  getContent,
  getContentById,
  updateContent,
  deleteContent,
} from "../controllers/contentController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router
  .route("/")
  .post(authenticateUser, addContent)
  .get(authenticateUser, getContent);

router
  .route("/:id")
  .get(authenticateUser, getContentById)
  .put(authenticateUser, updateContent)
  .delete(authenticateUser, deleteContent);

export default router;
