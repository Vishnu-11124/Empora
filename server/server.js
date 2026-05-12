import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* ======================
   Database Connection
====================== */

connectDB()

/* ======================
   Middlewares
====================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

app.use(morgan("dev"));

/* ======================
   Routes
====================== */

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Empora API Running Successfully",
  });
});

/* ======================
   Server
====================== */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;