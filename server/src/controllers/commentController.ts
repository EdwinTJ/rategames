import { Example, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get Comments for a post
export const getAllComments = async (req: any, res: any, next: any) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findMany({
      where: {
        postId: id,
      },
    });
    res.json({
      success: true,
      comment: comment,
    });
  } catch (error) {
    console.log(error);
  }
};

// Create a new comment for a post
export const newComment = async (req: any, res: any) => {
  const { id } = req.params;
  const { text, authorId } = req.body;

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
