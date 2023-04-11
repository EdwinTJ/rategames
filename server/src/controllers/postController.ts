import { Example, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllPosts = async (req: any, res: any, next: any) => {
  const all = await prisma.example.findMany();
  res.json(all);
};

// Create a new post
export const newPost = async (
  req: { body: { name: any } },
  res: { json: (arg0: Example) => void },
  next: any
) => {
  const { name } = req.body;
  const created = await prisma.example.create({
    data: {
      name,
    },
  });
  res.json(created);
};

// Update a post
export const updatePost = async (req: any, res: any) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log("id" + id);
  const updated = await prisma.example.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });
  res.json(updated);
};
