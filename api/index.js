import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.route.js";
import credentials from "./config/credentials.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

const app = express();
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
