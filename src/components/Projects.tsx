import { useContext, useEffect } from "react";
import ProjectContext from "../context/projectContext";
import { ProjectCard } from "./ProjectCard";
import { Spinner } from "./Spinner";
import { AddModal } from "./AddModal";

export const Projects = () => {
    const context = useContext(ProjectContext);

    if (!context) {
        console.log("Project Context is null");
        return <Spinner /> // Handle the null case properly
    }

    const { loading, projects, fetchProjects, addProject } = context;

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <div className="">
                {loading ? <Spinner /> : projects.length === 0 ? "No projects to display, Please add a note." : <AddModal addProject={addProject} />
                }
            </div>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};
