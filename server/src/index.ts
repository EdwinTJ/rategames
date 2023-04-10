import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//App initialization
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const all = await prisma.example.findMany();
  res.json(all);
});

app.post("/", async (req, res) => {
  const { name } = req.body;
  const created = await prisma.example.create({
    data: {
      name,
    },
  });
  res.json(created);
});

app.put("/:id", async (req, res) => {
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
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
