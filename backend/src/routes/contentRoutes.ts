import { Router } from "express";
import {
  addContent,
  getContent,
  getContentById,
  updateContent,
  deleteContent,
  saveAINote,
} from "../controllers/contentController";
import { searchContent } from "../controllers/searchContentController";
import { ragQuery } from "../controllers/ragQuery";
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

router.post("/search", authenticateUser, searchContent);
router.post("/rag-query", authenticateUser, ragQuery);
router.post("/save-ai-note", authenticateUser, saveAINote);

export default router;
