import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { addEmployee, getEmployees, updateEmployee, updateEmployeeStatus } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/add-employee", protect, addEmployee);
router.get("/", getEmployees)
router.patch("/status/:id", updateEmployeeStatus)
router.put("/update-employee/:id", updateEmployee)

export default router;
