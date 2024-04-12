import jwt from "jsonwebtoken";

const generateRefreshToken = (existingUser) => {
  try {
    return jwt.sign(
      { id: existingUser._id, isAdmin: existingUser.isAdmin },
      "secureRefreshKey",
      {
        expiresIn: "3h",
      }
    );
  } catch (error) {
    return res.status(500).json("Cannot generate refresh token");
  }
};

export default generateRefreshToken;
