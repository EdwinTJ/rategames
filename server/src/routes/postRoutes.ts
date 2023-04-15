import { Router } from "express";
import {
  getAllPosts,
  newPost,
  updatePost,
  deletePost,
  getSinglePost,
} from "../controllers/postController";

//router.method(path, validate(schema), controller)

const router = Router();

router.get("/", getAllPosts);
router.get("/single/:id", getSinglePost);
router.post("/create", newPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
export { router as postRoutes };
