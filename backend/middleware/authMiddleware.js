import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const [scheme, token] = auth.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "butuh token ya ngab (Bearer <token>)" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select("_id username email");
    if (!req.user) return res.status(401).json({ message: "token tidak valid (user ga ada)" });

    next();
  } catch (err) {
    return res.status(401).json({ message: "token invalid / expired", error: err.message });
  }
};
