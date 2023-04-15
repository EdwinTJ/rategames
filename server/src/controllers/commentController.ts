import { Example, PrismaClient } from "@prisma/client";

//Types
import { type Request, type Response } from "express";
const prisma = new PrismaClient();

// Get Comments for a post
export const getAllComments = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { id } = req.params;
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const count = await prisma.post.count();
  try {
    const comment = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      skip: pageSize * (page - 1),
      take: pageSize,
    });
    res.json({
      success: true,
      comment: comment,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    console.log(error);
  }
};

// Create a new comment for a post
export const newComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, authorId } = req.body;
  console.log("text", typeof text);
  if (text === null || text === undefined) {
    res.json({
      success: false,
      message: "Please enter a comment",
    });
  } else {
    try {
      const newComment = await prisma.comment.create({
        data: { text, authorID: authorId, postId: id },
      });
      res.json({
        success: true,
        newComment,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
// Update a comment for a post
export const updateComment = async (req: any, res: any) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        text,
      },
    });
    res.json({
      success: true,
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//Delete a comment for a post
export const deleteComment = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
