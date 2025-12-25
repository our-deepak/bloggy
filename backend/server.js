import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// Global Middlewares
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    // origin:"https://blog-buddy-deepak.vercel.app", 
    credentials: true,
  })
);

// --------------------
// API Routes
// --------------------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// --------------------
// Static Frontend (SPA)
// --------------------
const __dirname = path.resolve();

app.use(
  express.static(path.join(__dirname, "..", "frontend", "dist"))
);

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "frontend", "dist", "index.html")
  );
});


// --------------------
// Server + DB
// --------------------
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
});
