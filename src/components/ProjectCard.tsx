import { FiEdit } from "react-icons/fi";
import { DeleteModal } from "./DeleteModal";
import { useContext } from "react";
import ProjectContext from "../context/projectContext";

interface ProjectCardProps {
    project: { id: number, name: string };
    onEdit: (project: { id: number, name: string }) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit }) => {
    const context = useContext(ProjectContext);
    if (!context) {
        return;
    }
    const { deleteProject } = context;

    return (
        <div className="border p-4 flex justify-between items-center rounded-xl mb-5 shadow-lg">
            <span className="text-black text-xl font-medium ml-2">{project.name}</span>
            <div className="flex items-center gap-4">
                <DeleteModal deleteProject={deleteProject} projectId={project.id} />
                <button
                    onClick={() => onEdit(project)}
                    className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    <FiEdit className="w-5 h-5" /> Edit
                </button>
            </div>
        </div>

    );
};
