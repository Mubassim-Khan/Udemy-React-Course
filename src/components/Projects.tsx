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
        setTimeout(() => fetchProjects(), 2000);
    }, []);

    return (
        <div className="p-0.5 m-5 text-xl">
            <div className="items-center my-auto mx-auto mt-5 mb-5 p-5">
                {loading ? <Spinner /> : projects.length === 0 ? "No projects to display, Please add a note." : null}
                <div className="items-center mt-3 mb-5">
                <AddModal addProject={addProject} />
                </div>
            </div>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};
