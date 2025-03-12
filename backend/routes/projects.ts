import express from "express";
import { projects } from "../projects";

const router = express.Router();

// GET - Fetch all projects
router.get("/projects", (req, res) => {
  res.json({ status: "success", projects });
});

// POST - Add new project
router.get("/projects", (req, res) => {
  res.json({ status: "success", projects });
});

module.exports = router;
