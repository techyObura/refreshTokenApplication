import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

const refreshTokens = [];

export const registerUser = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  if (!isAdmin && !password && !username)
    return res.status(500).json("All fields are required");

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(500).json("User already exists! Please login");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    isAdmin,
  });

  if (newUser) {
    res.status(201).json(`${newUser.username} created successfully`);
  } else {
    res.status(500).json("User not created");
  }
};
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password)
    return res.status(402).json("All fields are required");

  const existingUser = await User.findOne({ username });

  if (!existingUser)
    return res.status(500).json("You do not have an account! Register");

  try {
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    refreshTokens.push(refreshToken);

    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      isAdmin: existingUser.isAdmin,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json("Difficulty in logging in");
  }
};

export const refreshToken = async (req, res) => {
  //take refresh token from user

  const refreshToken = req.body.token;

  // send error if no token or invalid

  if (!refreshToken) return res.status(401).json("You are not authenticated");
  if (!refreshTokens.includes(refreshToken))
    return res.status(500).json("Invalid refresh token");

  jwt.verify(refreshToken, "secureRefreshKey", (err, user) => {
    if (err) return res.status(401).json("refreshToken is not valid");
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
  //if everything is okay, create new access token, access token and send to user
};
export const deleteUser = async (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } else {
    res.status(500).json("You are not allowed to delete this user");
  }
};

export const logoutUser = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("User has been logged out");
};

export const getUser = (req, res) => {
  const user = req.user;

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json("User not found");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(200).json(allUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
