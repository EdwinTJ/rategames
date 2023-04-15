import express, { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";

import { z, AnyZodObject } from "zod";
import {
  getAllComments,
  newComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController";

const commentSchema = z.object({
  body: z.object({
    text: z
      .string({ required_error: "Emoji is required" })
      .emoji({ message: "Contains non-emoji characters" })
      .min(1)
      .max(55),
    authorId: z.string(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

const router = Router();

router.get("/:id", getAllComments);
router.post("/new/:id", validate(commentSchema), newComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
export { router as commentRoutes };
