import { FC } from "react";
// import { ProjectContextType } from "../context/projectContext";
import { Project } from "../context/projectContext";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="card">
            <h3>{project.name}</h3>
        </div>
    )
}
