import { Request, Response } from "express";
import { Link } from "../models/Link";
import { VaultItem } from "../models/VaultItem";
import { User } from "../models/User";

function generateRandomId(): string {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

// Helper: Make a single item public + ensure link exists
async function makeItemPublic(contentId: string, userId: string) {
  let link = await Link.findOne({ contentId, userId, type: "single" });

  if (!link) {
    link = new Link({
      hash: generateRandomId(),
      userId,
      contentId,
      type: "single",
    });
    await link.save();
  }

  await VaultItem.updateOne(
    { _id: contentId, userId },
    { isPublic: true }
  );

  return link;
}

// Helper: Make entire vault public + ensure collection link exists
async function makeVaultPublic(userId: string) {
  let link = await Link.findOne({ userId, type: "collection" });

  if (!link) {
    link = new Link({
      hash: generateRandomId(),
      userId,
      contentId: null,
      type: "collection",
    });
    await link.save();
  }

  await User.updateOne({ _id: userId }, { vaultPublic: true });

  return link;
}

export const toggleItemPrivacy = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const contentId = req.params.id;

    if (!contentId) {
      return res.status(400).json({ message: "Item ID is required." });
    }

    const link = await Link.findOne({ contentId, userId, type: "single" });

    if (link) {
      await VaultItem.updateOne(
        { _id: contentId, userId },
        { isPublic: false }
      );
      await Link.deleteOne({ _id: link._id });

      return res.status(200).json({
        message: "Item is now private.",
        isPublic: false,
        shareUrl: null,
      });
    } else {
      const newLink = await makeItemPublic(contentId, userId);

      return res.status(200).json({
        message: "Item is now public!",
        isPublic: true,
        shareUrl: `${process.env.CLIENT_URL}/share/${newLink.hash}`,
      });
    }
  } catch (error) {
    console.error("Error toggling item privacy:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const toggleVaultPrivacy = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const link = await Link.findOne({ userId, type: "collection" });

    if (link) {
      await User.updateOne({ _id: userId }, { vaultPublic: false });
      await Link.deleteOne({ _id: link._id });

      return res.status(200).json({
        message: "Vault is now private.",
        vaultPublic: false,
        shareUrl: null,
      });
    } else {
      const newLink = await makeVaultPublic(userId);

      return res.status(200).json({
        message: "Vault is now public!",
        vaultPublic: true,
        shareUrl: `${process.env.CLIENT_URL}/share/${newLink.hash}`,
      });
    }
  } catch (error) {
    console.error("Error toggling vault privacy:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const shareItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const contentId = req.params.id;

    if (!contentId) {
      return res.status(400).json({ message: "Item ID is required." });
    }

    const link = await makeItemPublic(contentId, userId);

    return res.status(200).json({
      message: "Share link ready!",
      shareUrl: `${process.env.CLIENT_URL}/share/${link.hash}`,
      isPublic: true,
    });
  } catch (error) {
    console.error("Error sharing item:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const shareVault = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const link = await makeVaultPublic(userId);

    return res.status(200).json({
      message: "Vault share link ready!",
      shareUrl: `${process.env.CLIENT_URL}/share/${link.hash}`,
      vaultPublic: true,
    });
  } catch (error) {
    console.error("Error sharing vault:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const openSharedLink = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const link = await Link.findOne({ hash });

    if (!link) {
      return res.status(404).json({ message: "Invalid or expired share link!" });
    }

    if (link.type === "single") {
      const item = await VaultItem.findOne({
        _id: link.contentId,
        isPublic: true,
      });

      if (!item) {
        return res.status(404).json({
          message: "This shared item is no longer public.",
        });
      }

      return res.status(200).json({ type: "single", item });
    }

    if (link.type === "collection") {
      const user = await User.findById(link.userId);
      if (!user || !user.vaultPublic) {
        return res.status(404).json({
          message: "This shared vault is no longer public.",
        });
      }

      const items = await VaultItem.find({
        userId: link.userId,
        isPublic: true,
      }).sort({ createdAt: -1 });

      return res.status(200).json({ type: "collection", items });
    }

    return res.status(400).json({ message: "Unknown share type." });
  } catch (error) {
    console.error("Error opening shared link:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
