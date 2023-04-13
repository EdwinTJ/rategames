import express, { Router } from "express";
import {
  getAllComments,
  newComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController";
const router = Router();

router.get("/:id", getAllComments);
router.post("/new/:id", newComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
export { router as commentRoutes };
