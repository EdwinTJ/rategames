import express, { Router } from "express";
import {
  getAllPosts,
  newPost,
  updatePost,
  deletePost,
  getSinglePost,
} from "../controllers/postController";
const router = Router();

router.get("/", getAllPosts);
router.get("/single/:id", getSinglePost);
router.post("/create", newPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
export { router as postRoutes };
