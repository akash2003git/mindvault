import { Router } from "express";
import { getTags, getTagById } from "../controllers/tagController";

const router = Router();

router.route("/").get(getTags);
router.route("/:id").get(getTagById);

export default router;
