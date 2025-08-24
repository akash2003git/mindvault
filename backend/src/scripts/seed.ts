import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../models/User";
import Content from "../models/Content";
import { findOrCreateTagIds } from "../utils/tagHelper";
import { generateContentEmbedding } from "../utils/aiService";
import connectDB from "../config/db";

async function seed() {
  await connectDB();

  // Clear old data
  await User.deleteMany({});
  await Content.deleteMany({});
  console.log("Cleared old users and content");

  // Create 2 users
  const users = await User.create([
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
  ]);

  console.log(
    "Users created:",
    users.map((u) => u.username),
  );

  // Sample content pool (mix of overlapping topics + distinct ones)
  const sampleContents = [
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
      title: "Convolutional Neural Networks Explained",
      type: "article",
      description: "Basics of CNNs for beginners in deep learning.",
      tags: ["deep learning", "CNNs", "introduction"],
    },
    {
      title: "Stable Diffusion: Text-to-Image Models",
      type: "article",
      description: "How diffusion models generate images from text prompts.",
      tags: ["diffusion models", "generative AI", "computer vision"],
    },
    {
      title: "A Beginner's Guide to Semantic Search",
      type: "article",
      description: "Explains how vector embeddings enable semantic search.",
      tags: ["semantic search", "embeddings", "NLP"],
    },
    {
      title: "Fine-tuning BERT for Question Answering",
      type: "article",
      description: "Steps to adapt BERT for QA tasks on SQuAD dataset.",
      tags: ["NLP", "BERT", "fine-tuning"],
    },
    {
      title: "CLIP: Connecting Vision and Language",
      type: "article",
      description:
        "CLIP learns joint vision-language representations from internet data.",
      tags: ["CLIP", "multimodal", "embeddings"],
    },
    {
      title: "Reinforcement Learning Basics",
      type: "article",
      description: "Intro to RL concepts: agents, environments, rewards.",
      tags: ["RL", "reinforcement learning", "AI basics"],
    },
    {
      title: "Graph Neural Networks Overview",
      type: "article",
      description: "Explains GNNs for processing graph-structured data.",
      tags: ["graph neural networks", "deep learning"],
    },
    {
      title: "Large Language Models and Prompting",
      type: "article",
      description: "Discussion of GPT-style models and prompt engineering.",
      tags: ["LLMs", "prompt engineering", "NLP"],
    },
  ];

  // Assign contents to both users (each gets all 10 for good overlap)
  for (const user of users) {
    for (const item of sampleContents) {
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

  console.log("Seed data created successfully ✅");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  mongoose.disconnect();
});
