import Employee from "../models/Employee.js";

import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";

import ApiResponse from "../utils/ApiResponse.js";

export const addEmployee = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      department,
      salary,
    } = req.body;

    if (
      !name ||
      !email ||
      !department ||
      !salary
    ) {
      throw new ApiError(
        400,
        "All fields are required"
      );
    }

    const existingEmployee =
      await Employee.findOne({ email });

    if (existingEmployee) {
      throw new ApiError(
        400,
        "Employee already exists"
      );
    }

    const employee =
      await Employee.create({
        name,
        email,
        department,
        salary,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        employee,
        "Employee added successfully"
      )
    );
  }
);

export const getEmployees = asyncHandler(async (req, res) => {

  const employees = await Employee.find()

  if (employees.length === 0) {
    throw new ApiError(404, "No employees found")
  }

  res.status(200).json(
    new ApiResponse(
      200,
      employees,
      "Employees fetched successfully"
    )
  )

})