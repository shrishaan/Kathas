import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

export const onlyadmin = (req, res, next) => {
  try {
    const  token  = req.cookies.token;
    if (!token) {
      return next(handleError(403, "Unauthorized Access"));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodeToken.role === "admin") {
      console.log(decodeToken);
      req.user = decodeToken;
      next();
    }else{
        return next(handleError(403, "Unauthorized Access"));
    }
  } catch (error) {
    next(handleError(500, error.message));
  }
};
