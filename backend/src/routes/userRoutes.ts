import { Router } from "express";
import { getMe } from "../controllers/userController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", authenticateUser, getMe);

export default router;
