import { createContext } from "react";

export interface Project {
  id: number;
  name: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (name: string) => void;
  editProject: (updatedProject: Project) => void;
  deleteProject: (id: number) => void;
  fetchProjects: () => void;
  countProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export default ProjectContext;
