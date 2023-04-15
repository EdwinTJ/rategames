import { Example, PrismaClient } from "@prisma/client";
import { cloudinary } from "../util/cloudinary";

const prisma = new PrismaClient();

// export const getAllPosts = async (req: any, res: any, next: any) => {
//   // const count = await prisma.post.count(); Get this In Frontend
//   const post = await prisma.post.findMany({
//     include: {
//       comments: true,
//       image: true,
//     },
//     skip: pageSize * (page - 1),
//     take: pageSize,
//   });
//   res.json({
//     success: true,
//     post,
//   });
// };

export const getAllPosts = async (req: any, res: any, next: any) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const count = await prisma.post.count();

  const post = await prisma.post.findMany({
    include: {
      comments: true,
      image: true,
    },
    skip: pageSize * (page - 1),
    take: pageSize,
  });
  res.json({
    success: true,
    post,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
};

// Get a single post
export const getSinglePost = async (req: any, res: any) => {
  const { id } = req.params;
  const single = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      image: true,
      // comments: true,
      // Should I send the comments with the post?
    },
  });
  res.json({
    success: true,
    post: single,
  });
};
// Create a new post
export const newPost = async (req: any, res: any) => {
  const { title, image } = req.body;

  if (image === null || image === undefined) {
    const newPost = await prisma.post.create({
      data: {
        title,
      },
    });
    res.json({
      success: true,
      newPost,
    });
  } else {
    //TODO: Upload image to cloudinary
    // 1. Upload image to cloudinary
    // 2. Get the image url
    // 3. Get the public url and public id from cloudinary
    // 4. Save the public url and public id to the database
    const publicId = image + "publicId";
    const newPost = await prisma.post.create({
      data: {
        title,
        image: {
          create: {
            url: image,
            public_id: publicId,
          },
        },
      },
    });
    res.json({
      success: true,
      newPost,
    });
  }
};

// Update a post
export const updatePost = async (req: any, res: any) => {
  const { id } = req.params;
  const { title } = req.body;
  const updated = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title,
    },
  });
  res.json({
    success: true,
    updated,
  });
};

// Delete a post
export const deletePost = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.post.delete({
      where: { id: id },
    });

    Promise.all([deleted])
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Post deleted successfully",
        });
      })
      .catch((error) => {
        console.log("Error inside Promise:" + error);
      });
  } catch (error) {
    console.log(error);
  }
};
