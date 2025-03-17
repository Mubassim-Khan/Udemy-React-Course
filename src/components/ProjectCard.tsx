import { FC, useContext } from "react";
import ProjectContext, { Project } from "../context/projectContext";
import { DeleteModal } from "./DeleteModal";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {

    const context = useContext(ProjectContext);
    if (!context) {
        return;
    }
    const { deleteProject } = context;

    return (
        <div className="card">
            <h3>{project.name}</h3>
            <div>
                <DeleteModal deleteProject={deleteProject} projectId={project.id} />
            </div>
        </div>
    )
}
