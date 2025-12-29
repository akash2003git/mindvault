import { Request, Response } from "express";
import { Link } from "../models/Link";
import { VaultItem } from "../models/VaultItem";
import { User } from "../models/User";

function generateRandomId(): string {
  const part1 = Math.random().toString(36).substring(2);
  const part2 = Math.random().toString(36).substring(2);
  return part1 + part2;
}

async function generateItemLink(contentId: string, userId: string) {
  const linkExists = await Link.findOne({
    contentId,
    userId,
    type: "single",
  });

  if (linkExists) return linkExists;

  const newLink = new Link({
    hash: generateRandomId(),
    userId,
    contentId,
    type: "single",
  });

  await newLink.save();

  await VaultItem.findOneAndUpdate(
    { _id: contentId, userId },
    { isPublic: true }
  );

  return newLink;
}

async function generateVaultLink(userId: string) {
  const linkExists = await Link.findOne({
    userId,
    type: "collection",
  });

  if (linkExists) return linkExists;

  const newLink = new Link({
    hash: generateRandomId(),
    userId,
    contentId: null,
    type: "collection",
  });

  await newLink.save();

  await User.findOneAndUpdate({ _id: userId }, { vaultPublic: true });

  return newLink;
}

async function toggleItemVisibility(contentId: string, userId: string) {
  const linkExists = await Link.findOne({
    contentId,
    userId,
    type: "single",
  });

  if (linkExists) {
    await VaultItem.findOneAndUpdate(
      { _id: contentId, userId },
      { isPublic: false }
    );

    await Link.findOneAndDelete({
      contentId,
      userId,
      type: "single",
    });

    return;
  }

  await VaultItem.findOneAndUpdate(
    { _id: contentId, userId },
    { isPublic: true }
  );
}

async function toggleVaultVisibility(userId: string) {
  const linkExists = await Link.findOne({
    userId,
    type: "collection",
  });

  if (linkExists) {
    await User.findOneAndUpdate({ _id: userId }, { vaultPublic: false });
    await Link.findOneAndDelete({ userId, type: "collection" });
    return;
  }

  await User.findOneAndUpdate({ _id: userId }, { vaultPublic: true });
}

export const toggleItemPublic = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const contentId = req.params.id;

    if (!contentId) {
      return res.status(400).json({ message: "Item ID is required." });
    }

    await toggleItemVisibility(contentId, userId);

    return res.status(200).json({
      message: "Item visibility toggled successfully!",
    });
  } catch (error) {
    console.error("Error toggling item visibility:", error);
    return res.status(500).json({
      message: "Server error while toggling item visibility.",
      error,
    });
  }
};

export const toggleVaultPublic = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    await toggleVaultVisibility(userId);

    return res.status(200).json({
      message: "Vault visibility toggled successfully!",
    });
  } catch (error) {
    console.error("Error toggling vault visibility:", error);
    return res.status(500).json({
      message: "Server error while toggling vault visibility.",
      error,
    });
  }
};

export const createItemShareLink = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const contentId = req.params.id;

    if (!contentId) {
      return res.status(400).json({ message: "Item ID is required." });
    }

    const link = await generateItemLink(contentId, userId);

    return res.status(201).json({
      link,
      url: `${process.env.CLIENT_URL}/share/${link.hash}`,
      message: "Share link generated successfully!",
    });
  } catch (error) {
    console.error("Error generating item share link:", error);
    return res.status(500).json({
      message: "Server error while generating share link.",
      error,
    });
  }
};

export const createVaultShareLink = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const link = await generateVaultLink(userId);

    return res.status(201).json({
      link,
      url: `${process.env.CLIENT_URL}/share/${link.hash}`,
      message: "Vault share link generated successfully!",
    });
  } catch (error) {
    console.error("Error generating vault share link:", error);
    return res.status(500).json({
      message: "Server error while generating share link.",
      error,
    });
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

      return res.status(200).json({
        type: "single",
        item,
      });
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

      return res.status(200).json({
        type: "collection",
        items,
      });
    }

    return res.status(400).json({ message: "Unknown share type." });
  } catch (error) {
    console.error("Error opening shared link:", error);
    return res.status(500).json({
      message: "Server error while opening shared link.",
      error,
    });
  }
};
