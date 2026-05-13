import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import generateToken from "../utils/generateToken.js";

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, admin.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(admin._id);
  console.log(token)

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: admin._id,
        email: admin.email,
        token,
      },
      "Login successful",
    ),
  );
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Admin logged out successfully"));
});
