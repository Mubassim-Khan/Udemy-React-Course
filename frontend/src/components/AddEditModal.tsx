import React, { useState, useEffect, FC } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { Project } from "../context/projectContext";

interface AddEditModalProps {
    addProject: (name: string) => void;
    updateProject: (updatedProject: Project) => void;
    project?: Project | null;
    closeModal: () => void;
}

export const AddEditModal: FC<AddEditModalProps> = ({ addProject, updateProject, project, closeModal }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (project) {
            setName(project.name);
        } else {
            setName("");
        }
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Project name cannot be empty!");
            return;
        }

        try {
            if (project) {
                updateProject({ id: project.id, name });
            } else {
                addProject(name);
            }
            closeModal();
        } catch (error) {
            toast.error("Request failed. Try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-scale">
            <div className="relative p-4 w-full max-w-md max-h-full dark:bg-gray-700 animate-zoom-in-scale">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {project ? "Edit Project" : "Create Project"}
                        </h3>
                        <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8">
                            ✕
                        </button>
                    </div>

                    {/* Form */}
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                            {project ? <FiEdit className="w-5 h-5 mr-2" /> : <IoMdAdd className="w-5 h-5 mr-1" />}
                            {project ? " Update Project" : " Add Project"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
