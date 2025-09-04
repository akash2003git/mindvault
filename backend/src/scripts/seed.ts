import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User, { UserDocument } from "../models/User";
import Content from "../models/Content";
import { findOrCreateTagIds } from "../utils/tagHelper";
import { generateContentEmbedding } from "../utils/aiService";
import connectDB from "../config/db";

// Define a type for content items
interface ContentItem {
  title: string;
  description: string;
  type: string;
  tags: string[];
  link?: string;
}

async function seed() {
  await connectDB();

  // Clear old data
  await User.deleteMany({});
  await Content.deleteMany({});
  console.log("Cleared old users and content");

  // Create 2 users

  const users = (await User.create([
    {
      username: "alice",
      email: "alice@example.com",
      password: "password123",
      authProvider: "local",
    },
    {
      username: "bob",
      email: "bob@example.com",
      password: "password123",
      authProvider: "local",
    },
  ])) as UserDocument[];

  console.log(
    "Users created:",
    users.map((u) => u.username),
  );

  // Alice's AI/ML content
  const aliceContents: ContentItem[] = [
    {
      title: "Deep Learning for Image Segmentation",
      link: "https://arxiv.org/abs/1706.05587",
      type: "article",
      description: "Paper introducing DeepLab for semantic segmentation.",
      tags: ["deep learning", "image segmentation", "CNNs"],
    },
    {
      title: "Transformers in Vision",
      type: "article",
      description: "Survey of Vision Transformers (ViT) and their impact.",
      tags: ["transformer", "ViT", "computer vision"],
    },
    {
      title: "Fine-tuning BERT for Question Answering",
      type: "article",
      description: "Steps to adapt BERT for QA tasks on SQuAD dataset.",
      tags: ["NLP", "BERT", "fine-tuning"],
    },
    {
      title: "Graph Neural Networks Overview",
      type: "article",
      description: "Explains GNNs for processing graph-structured data.",
      tags: ["graph neural networks", "deep learning"],
    },
    {
      title: "Reinforcement Learning Basics",
      type: "article",
      description: "Intro to RL concepts: agents, environments, rewards.",
      tags: ["RL", "reinforcement learning", "AI basics"],
    },
  ];

  // Bob's random content
  const bobContents: ContentItem[] = [
    {
      title: "Top 10 Chill Music Tracks",
      type: "article",
      description: "A curated list of relaxing music for study or work.",
      tags: ["music", "relaxing", "playlist"],
    },
    {
      title: "Funny Cat Videos Compilation",
      type: "video",
      description: "A compilation of hilarious cat moments.",
      tags: ["funny", "cats", "videos"],
    },
    {
      title: "Epic Video Edits for Social Media",
      type: "video",
      description:
        "Creative video editing techniques for Instagram and TikTok.",
      tags: ["video editing", "social media", "creative"],
    },
    {
      title: "Top 5 Street Performances",
      type: "article",
      description: "Amazing street performances from around the world.",
      tags: ["street performers", "music", "entertainment"],
    },
    {
      title: "DIY Home Decor Ideas",
      type: "article",
      description: "Simple DIY ideas to spruce up your living space.",
      tags: ["DIY", "home decor", "creative"],
    },
  ];

  async function createUserContent(
    user: UserDocument,
    contentArray: ContentItem[],
  ) {
    for (const item of contentArray) {
      const tagIds = await findOrCreateTagIds(item.tags);
      const embedding = await generateContentEmbedding({
        title: item.title,
        description: item.description,
        type: item.type,
        tags: item.tags,
      });

      await Content.create({
        userId: user._id,
        title: item.title,
        link: item.link,
        type: item.type,
        description: item.description,
        tags: tagIds,
        publicStatus: true,
        embedding,
      });
    }
  }

  // Seed content
  await createUserContent(users[0], aliceContents);
  await createUserContent(users[1], bobContents);

  console.log("Seed data created successfully");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  mongoose.disconnect();
});
