"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProjects = exports.loadProjects = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const projectsFile = path_1.default.resolve("./projects.json");
// Load existing projects
const loadProjects = () => {
    if (!fs_1.default.existsSync(projectsFile))
        return [];
    const data = fs_1.default.readFileSync(projectsFile, "utf8");
    return JSON.parse(data);
};
exports.loadProjects = loadProjects;
// Save projects to file
const saveProjects = (projects) => {
    fs_1.default.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), "utf8");
};
exports.saveProjects = saveProjects;
