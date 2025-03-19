"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectSave_1 = require("../lib/projectSave");
const router = express_1.default.Router();
const projects = (0, projectSave_1.loadProjects)();
// GET - Fetch all projects
router.get("/projects", (req, res) => {
    res.json({ status: "success", projects });
});
// POST - Add new project
router.post("/projects", (req, res) => {
    const { name } = req.body;
    if (!name || name.length < 3) {
        res.status(400).json({
            status: "error",
            message: "Project name must be at least 3 characters long",
        });
        return;
    }
    const existingProject = projects.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (existingProject) {
        res
            .status(400)
            .json({ status: "error", message: "Project name must be unique" });
        return;
    }
    try {
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const newProject = { id: newId, name: req.body.name };
        projects.push(newProject);
        (0, projectSave_1.saveProjects)(projects);
        res.status(201).json({
            status: "success",
            message: "Project added successfully",
            project: newProject,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error.message,
            message: "Something went wrong.",
        });
    }
});
// PUT - Update exsisting project
router.put("/projects/:id", (req, res) => {
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
    const duplicateProject = projects.find((p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== Number(id));
    if (duplicateProject) {
        res.status(400).json({
            status: "error",
            message: "Project name must be unique",
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
        (0, projectSave_1.saveProjects)(projects);
        res.status(200).json({
            status: "success",
            message: "Project updated successfully",
            project: projects[projectIndex],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error.message,
            message: "Something went wrong.",
        });
    }
});
// DELETE - Delete a project
router.delete("/projects/:id", (req, res) => {
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
        (0, projectSave_1.saveProjects)(projects);
        res.status(200).json({
            status: "success",
            message: "Project deleted successfully",
            project: deletedProject,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error.message,
            message: "Something went wrong.",
        });
    }
});
// Count - Count total projects
router.get("/projects/count", (req, res) => {
    try {
        const totalProjects = projects.length;
        res.status(200).json({ status: "success", totalProjects });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: error.message,
            message: "Something went wrong.",
        });
    }
});
module.exports = router;
