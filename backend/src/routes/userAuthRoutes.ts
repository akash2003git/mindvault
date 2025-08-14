import { Router } from "express";
import { signupUser } from "../controllers/userAuthController";

const router = Router();

router.post("/login", signupUser);

export default router;
