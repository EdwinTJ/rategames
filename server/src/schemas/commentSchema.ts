import { z } from "zod";

export const newCommentSchema = z.object({
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
