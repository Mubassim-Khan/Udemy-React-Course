import ProjectContext from "./projectContext";
import { useState } from "react";
import { Project } from "./projectContext"
import toast from "react-hot-toast";
import { FC, ReactNode } from 'react';

interface ProjectProviderProps {
    children: ReactNode;
}

export const ProjectState: FC<ProjectProviderProps> = ({ children }) => {
    const hostURL = import.meta.env.VITE_HOST_URL || "http://localhost:8080";
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectCount, setProjectCount] = useState<Number>(0);
    const [loading, setLoading] = useState(true);

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${hostURL}/api/projects`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const json = await response.json();

            if (json.status !== "success") {
                toast.error("Failed to fetch project");
                console.error("Unexpected API response:", json);
                return;
            }

            setProjects(json.projects);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching project: " + error);
        }
    }

    // Add Project
    const addProject = async (name: string) => {
        try {
            const response = await fetch(`${hostURL}/api/projects`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ name })
            });
            const newProject = await response.json();

            if (newProject.status !== "success") {
                toast.error(newProject.message);
                console.error("Unexpected API response:", newProject);
                return;
            }

            setProjects([...projects, newProject]);
        } catch (error) {
            console.log("Error adding project: " + error);
        }
    }

    // Edit Project
    const editProject = async (updatedProject: Project) => {
        try {
            const response = await fetch(`${hostURL}/api/projects/${updatedProject.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ name: updatedProject.name })
            });
            const updatedData = await response.json();

            if (updatedData.status !== "success") {
                toast.error(updatedData.message);
                console.error("Unexpected API response:", updatedData);
                return;
            }

            setProjects(prevProjects => (
                prevProjects.map(project => (
                    project.id === updatedData.id ? updatedData : project
                ))
            ))

        } catch (error) {
            console.log("Error updating project: " + error)
        }
    }

    // Delete Project
    const deleteProject = async (id: number) => {
        try {
            const response = await fetch(`${hostURL}/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json'
                },
            });
            const deletedProject = await response.json();
            const newProjects = projects.filter(project => project.id !== id)

            if (deletedProject.status !== "success") {
                toast.error("Failed to delete project");
                console.error("Unexpected API response:", deletedProject);
                return;
            }

            setProjects(newProjects)
            console.log(`Deleted Project: ${deletedProject.name}`)
        } catch (error) {
            console.log("Error deleting project: " + error)
        }
    }

    // Count total projects
    const countProjects = async () => {
        try {
            const response = await fetch(`${hostURL}/api/projects/count`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const json = await response.json();

            if (json.status !== "success") {
                toast.error("Failed to delete project");
                console.error("Unexpected API response:", json);
                return;
            }

            setProjectCount(json.totalProjects);
        } catch (error) {
            console.log("Error counting project: " + error)
        }
    }


    return (
        <ProjectContext.Provider value={{ loading, projects, fetchProjects, addProject, editProject, deleteProject, countProjects }}>
            {children}
        </ProjectContext.Provider>
    )
}
