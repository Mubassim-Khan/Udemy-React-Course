import ProjectContext from "./projectContext";
import { useState } from "react";
import { Project } from "./projectContext"
import toast from "react-hot-toast";
import { FC, ReactNode } from 'react';

interface ProjectProviderProps {
    childern: ReactNode;
}

export const ProjectState: FC<ProjectProviderProps> = ({ childern }) => {
    const hostURL = process.env.REACT_APP_HOST_URL || "http//localhost:8080";
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectCount, setProjectCount] = useState<Number>(0);

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            const response = await fetch(`${hostURL}/api/projects`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const json = await response.json();
            setProjects(json);
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

            if (!response.ok) {
                toast.error("Failed to update project");
                return;
            }

            const updatedData = await response.json();

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
            const newProject = projects.filter(project => project.id !== id)
            setProjects(newProject)
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
            setProjectCount(json.totalProjects);
        } catch (error) {
            console.log("Error counting project: " + error)
        }
    }


    return (
        <ProjectContext.Provider value={{ projects, fetchProjects, addProject, editProject, deleteProject, countProjects }}>
            {childern}
        </ProjectContext.Provider>
    )
}
