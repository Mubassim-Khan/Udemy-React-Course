import express, { Request, Response } from "express";
import { projects } from "../projects";

const router = express.Router();

// GET - Fetch all projects
router.get("/projects", (req: Request, res: Response) => {
  res.json({ status: "success", projects });
});

// POST - Add new project
router.post("/projects", (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || name.length < 3) {
    res.status(400).json({
      status: "error",
      message: "Project name must be at least 3 characters long",
    });
    return;
  }

  try {
    const newProject = { id: projects.length + 1, name: req.body.name };
    projects.push(newProject);

    res.status(201).json({
      status: "success",
      message: "Project add successfully",
      project: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: error.message,
      message: "Something went wrong.",
    });
  }
});

module.exports = router;
