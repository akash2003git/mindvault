import { Router } from "express";
import {
  toggleItemPrivacy,
  toggleVaultPrivacy,
  shareItem,
  shareVault,
  openSharedLink,
} from "../controllers/shareController";
import { authenticateUser } from "../middleware/requireAuth";

const router = Router();

router.get("/:hash", openSharedLink);

router.patch("/item/:id/toggle", authenticateUser, toggleItemPrivacy);
router.patch("/vault/toggle", authenticateUser, toggleVaultPrivacy);

router.post("/item/:id", authenticateUser, shareItem);
router.post("/vault", authenticateUser, shareVault);

export default router;
