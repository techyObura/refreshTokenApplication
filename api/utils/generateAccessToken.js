import jwt from "jsonwebtoken";

const generateAccessToken = (existingUser) => {
  try {
    return jwt.sign(
      { id: existingUser._id, isAdmin: existingUser.isAdmin },
      "secureKey",
      {
        expiresIn: "30m",
      }
    );
  } catch (error) {
    return res.status(500).json("Cannot generate access token");
  }
};

export default generateAccessToken;
