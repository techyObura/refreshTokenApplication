import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  registerUser,
  loginUser,
  refreshToken,
  deleteUser,
  logoutUser,
  getUser,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.get("/user", verifyToken, getUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/users", getAllUsers);

export default router;
