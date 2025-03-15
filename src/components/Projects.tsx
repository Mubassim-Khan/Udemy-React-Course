import { useContext, useEffect } from "react";
import ProjectContext from "../context/projectContext";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
    const context = useContext(ProjectContext);

    if (!context) {
        console.log("Project Context is null");
        return <div>Loading...</div>; // Handle the null case properly
    }

    const { loading, projects, fetchProjects } = context;

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <div className="container mx-1 my-1">
                {loading ? "Loading..." : projects.length === 0 ? "No projects to display, Please add a note." : null}
            </div>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};
