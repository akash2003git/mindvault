import { Router } from "express";
import {
  getShareableContentById,
  getShareableUserContent,
} from "../controllers/shareController";

const router = Router();

router.get("/content/:contentId", getShareableContentById);
router.get("/user/:userId", getShareableUserContent);

export default router;
