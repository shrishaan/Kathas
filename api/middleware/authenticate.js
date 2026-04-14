import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

export const authenticate = (req, res, next) => {
  try {
    const token  = req.cookies.token;
    if (!token) {
      return next(handleError(403, "Unauthorized Access"));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    next(handleError(500, error.message));
  }
};
