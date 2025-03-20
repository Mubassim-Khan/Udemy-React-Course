import fs from "fs";
import path from "path";

const projectsFile = path.join(process.cwd(), "projects.json");

// Load existing projects
export const loadProjects = (): { id: number; name: string }[] => {
  console.log(projectsFile);
  if (!fs.existsSync(projectsFile)) return [];
  const data = fs.readFileSync(projectsFile, "utf8");
  return JSON.parse(data);
};

// Save projects to file
export const saveProjects = (projects: { id: number; name: string }[]): void => {
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), "utf8");
};
