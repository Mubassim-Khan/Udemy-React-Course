import express, { Request, Response } from "express";
import { loadProjects, saveProjects } from "../lib/projectSave";

const router = express.Router();
const projects = loadProjects();

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
    saveProjects(projects);

    res.status(201).json({
      status: "success",
      message: "Project added successfully",
      project: newProject,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: error.message,
      message: "Something went wrong.",
    });
  }
});

// PUT - Update exsisting project
router.put("/projects/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.status(400).json({
      status: "error",
      message: "Must include a valid ID",
    });
    return;
  }

  if (!name || name.length < 3) {
    res.status(400).json({
      status: "error",
      message: "Project name must be at least 3 characters long",
    });
    return;
  }

  try {
    const projectIndex = projects.findIndex((p) => p.id === parseInt(id));

    if (projectIndex === -1) {
      res.status(404).json({
        status: "error",
        message: "Project not found",
      });
      return;
    }

    projects[projectIndex].name = name;
    saveProjects(projects);

    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
      project: projects[projectIndex],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: error.message,
      message: "Something went wrong.",
    });
  }
});

// DELETE - Delete a project
router.delete("/projects/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      status: "error",
      message: "Must include a valid ID",
    });
    return;
  }

  try {
    const projectIndex = projects.findIndex((p) => p.id === parseInt(id));

    if (projectIndex === -1) {
      res.status(404).json({
        status: "error",
        message: "Project not found",
      });
      return;
    }

    const deletedProject = projects.splice(projectIndex, 1)[0];
    saveProjects(projects);

    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: error.message,
      message: "Something went wrong.",
    });
  }
});

// Count - Count total projects
router.get("/projects/count", (req: Request, res: Response) => {
  try {
    const totalProjects = projects.length;

    res.status(200).json({ status: "success", totalProjects });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "error",
      error: error.message,
      message: "Something went wrong.",
    });
  }
});

module.exports = router;
