import Employee from "../models/Employee.js";

import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";

import ApiResponse from "../utils/ApiResponse.js";

export const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, department, salary } = req.body;

  if (!name || !email || !department || !salary) {
    throw new ApiError(400, "All fields are required");
  }

  const existingEmployee = await Employee.findOne({ email });

  if (existingEmployee) {
    throw new ApiError(400, "Employee already exists");
  }

  const employee = await Employee.create({
    name,
    email,
    department,
    salary,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, employee, "Employee added successfully"));
});

export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();

  if (employees.length === 0) {
    throw new ApiError(404, "No employees found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, employees, "Employees fetched successfully"));
});

export const updateEmployeeStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  if (!["ACTIVE", "INACTIVE"].includes(status)) {
    throw new ApiError(400, "Status must be Active or Inactive");
  }

  // Find user
  const user = await Employee.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Update status
  user.status = status;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Status updated successfully"));
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const {id} = req.params
  const { name, email, department, salary } = req.body

  const employee = await Employee.findById(id)

  if (!employee) {
    throw new ApiError(404, "Employee not found")
  }

  employee.name = name || employee.name
  employee.email = email || employee.email
  employee.department = department || employee.department
  employee.salary = salary || employee.salary

  const updatedEmployee = await employee.save()

  res.status(200).json(new ApiResponse(200, updatedEmployee, "Employee updated successfully"))

})