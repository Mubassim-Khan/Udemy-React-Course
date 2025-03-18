import { useContext, useEffect, useState } from "react"
import ProjectContext from "../context/projectContext";

export const ProjectCount = () => {
    const context = useContext(ProjectContext);
    if (!context) return null;

    const { countProjects } = context;
    const [projectCount, setProjectCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            const count = await countProjects();
            if (count !== null) setProjectCount(count);
        };
        fetchCount();
    }, [countProjects]);

    return (
        <div>
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-3 text-center mb-2">Total Projects: {projectCount !== null ? projectCount : "Loading..."}</button>
        </div>
    )
}
