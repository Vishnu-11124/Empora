import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const protect = asyncHandler(
  async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.admin = await Admin.findById(
        decoded.id
      ).select("-password");

      next();
    } else {
      throw new ApiError(
        401,
        "Not authorized"
      );
    }
  }
);