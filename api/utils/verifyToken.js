import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "secureKey", (err, user) => {
      if (err) return res.status(401).json("Token is not valid");
      req.user = user;

      next();
    });
  } else {
    res.status(500).json("You are not authenticated");
  }
};

export default verifyToken;
