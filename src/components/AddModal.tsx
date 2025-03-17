import React, { useState, FC } from "react"
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";

interface AddModalProps {
    addProject: (name: string) => void;
}

export const AddModal: FC<AddModalProps> = ({ addProject }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        try {
            e.preventDefault();
            addProject(name);
            setIsOpen(false);
            setName("");
            // toast.success("Project Added")
        } catch (error) {
            toast.error("Request timed out")
        }
    }

    return (
        <>
            <div>
                {/* <!-- Modal toggle --> */}
                <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" type="button">
                    <IoMdAdd className="w-5 h-5" />
                    Add Project
                </button>

                {/* <!-- Main modal --> */}
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-scale">
                        <div className="relative p-4 w-full max-w-md max-h-full dark:bg-gray-700 animate-zoom-in-scale">
                            {/* <!-- Modal content --> */}
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                {/* <!-- Modal header --> */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Create New Project
                                    </h3>
                                    <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type project name" required={true} />
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                        Add Project
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
