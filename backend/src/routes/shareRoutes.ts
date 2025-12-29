import { Router } from "express";
import {
  toggleItemPublic,
  toggleVaultPublic,
  createItemShareLink,
  createVaultShareLink,
  openSharedLink,
} from "../controllers/shareItemController";
import { authenticateUser } from "../middleware/requireAuth";

const router = Router();

router.get("/:hash", openSharedLink);

router.patch("/item/:id/toggle", authenticateUser, toggleItemPublic);
router.patch("/vault/toggle", authenticateUser, toggleVaultPublic);

router.post("/item/:id", authenticateUser, createItemShareLink);
router.post("/vault", authenticateUser, createVaultShareLink);

export default router;
