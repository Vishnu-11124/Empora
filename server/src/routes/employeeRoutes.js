import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { addEmployee, getEmployees } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/add-employee", protect, addEmployee);
router.get("/", getEmployees)

export default router;
