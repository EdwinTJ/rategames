import express from "express";
import cors from "cors";

//App initialization
const app = express();

//Import routes
import { postRoutes } from "./routes/postRoutes";

//Route Middleware
app.use("/api/posts", postRoutes);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
