import { useContext, useEffect, useState } from "react";
import ProjectContext from "../context/projectContext";
import { ProjectCard } from "./ProjectCard";
import { Spinner } from "./Spinner";
import { AddEditModal } from "./AddEditModal";
import { IoMdAdd } from "react-icons/io";
import { ProjectCount } from "./ProjectCount";

export const Projects = () => {
    const context = useContext(ProjectContext);
    const [selectedProject, setSelectedProject] = useState<{ id: number, name: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!context) {
        console.log("Project Context is null");
        return <Spinner />
    }

    const { loading, projects, fetchProjects, addProject, editProject } = context;

    useEffect(() => {
        setTimeout(() => fetchProjects(), 2000);
    }, []);

    const handleAddProject = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    }

    const handleEditProject = (project: { id: number, name: string }) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    }

    return (
        <div className="p-0.5 m-5 text-xl">
            <div className="flex flex-col items-center justify-center mt-10">
                <h2 className="text-4xl font-semibold text-gray-800 mb-5">ProjManager (CRUD Application)</h2>
                <ProjectCount />
                <button
                    onClick={handleAddProject}
                    className="flex items-center justify-center gap-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 mb-5 mt-2"
                    type="button"
                >
                    <IoMdAdd className="w-5 h-5" /> Add Project
                </button>
            </div>
            {loading ? <Spinner /> : projects.length === 0 ? "No projects to display, Please add a note." : null}

            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onEdit={handleEditProject} />
            ))}

            {isModalOpen && (
                <AddEditModal
                    addProject={addProject}
                    updateProject={editProject}
                    project={selectedProject}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>

    );
};
