import { Router } from "express";
import {
  getShareableContentById,
  getShareableUserContent,
  importSingleContent,
  importUserSecondBrain,
} from "../controllers/shareController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.get("/content/:contentId", authenticateUser, getShareableContentById);
router.get("/user/:userId", authenticateUser, getShareableUserContent);

router.post(
  "/import/content/:contentId",
  authenticateUser,
  importSingleContent,
);
router.post(
  "/import/user/:sourceUserId",
  authenticateUser,
  importUserSecondBrain,
);

export default router;
