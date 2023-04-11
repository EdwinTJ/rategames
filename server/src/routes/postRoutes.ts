import express, { Router } from "express";
import {
  getAllPosts,
  newPost,
  updatePost,
} from "../controllers/postController";
const router = Router();

router.get("/", getAllPosts);

export { router as postRoutes };
