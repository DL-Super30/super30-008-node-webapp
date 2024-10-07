"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeadForm from "../components/createLeadModal"; // Import your LeadForm component here

export default function Leads() {
    const [activeLeadStatus, setActiveLeadStatus] = useState(null);
    const [activeView, setActiveView] = useState('Table');
    const [showLeadForm, setShowLeadForm] = useState(false); // State to control the visibility of the form

    const handleLeadStatusClick = (status) => {
        setActiveLeadStatus(status);
        console.log(`Lead status clicked: ${status}`);
    };

    const handleViewClick = (view) => {
        setActiveView(view);
        console.log(`View clicked: ${view}`);
    };

    const toggleLeadForm = () => {
        setShowLeadForm(!showLeadForm); // Toggle the visibility of the lead form
    };


    return (
        <div className="lg:w-full">
            <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-white rounded-lg">
                <div className="mb-5">
                    <div className="flex flex-wrap justify-between items-center px-5 py-2 gap-3">
                        <div className="flex items-center gap-3">
                            <Image src="/images/icon.svg" alt="logo" width={44} height={44} />
                            <h2 className="text-2xl font-medium text-black flex items-center gap-2">
                                All Leads <FontAwesomeIcon icon={faAngleDown} />
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={toggleLeadForm} // Handle the click event to toggle the lead form
                                className="bg-[#0176D3] text-white text-sm rounded-lg border-black px-4 p-1 leading-6 gap-2"
                            >
                                {showLeadForm ? "Close Lead Form" : "Create Lead"}{" "}
                                <FontAwesomeIcon icon={showLeadForm ? faAngleUp : faAngleDown} className="mt-2" />
                            </button>
                            <button className="bg-white text-black text-sm rounded-md border border-neutral-400 px-4 p-1 leading-6 gap-2">
                                Actions <FontAwesomeIcon icon={faAngleDown} className="mt-2 ml-1" />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-5 py-2">
                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="relative w-72">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="search"
                                    className="w-full h-8 rounded-md border border-[#969492] pl-10 p-1.5 text-gray-900"
                                    placeholder="search"
                                />
                            </div>
                            <div className="inline-flex rounded-md shadow-sm">
                                <button
                                    type="button"
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 rounded-s-lg ${activeLeadStatus === "Not Contacted"
                                        ? "bg-[#0176D3] text-white border-[#0176D3]"
                                        : "bg-white text-black border-[#747474]"
                                        }`}
                                    onClick={() => handleLeadStatusClick("Not Contacted")}
                                >
                                    Not Contacted
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>

                                <button
                                    type="button"
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeLeadStatus === "Attempted"
                                        ? "bg-[#0176D3] text-white border-[#0176D3]"
                                        : "bg-white text-black border-[#747474]"
                                        }`}
                                    onClick={() => handleLeadStatusClick("Attempted")}
                                >
                                    Attempted
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>

                                <button
                                    type="button"
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeLeadStatus === "Warm Lead"
                                        ? "bg-[#0176D3] text-white border-[#0176D3]"
                                        : "bg-white text-black border-[#747474]"
                                        }`}
                                    onClick={() => handleLeadStatusClick("Warm Lead")}
                                >
                                    Warm Lead
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>

                                <button
                                    type="button"
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeLeadStatus === "Cold Lead"
                                        ? "bg-[#0176D3] text-white border-[#0176D3]"
                                        : "bg-white text-black border-[#747474]"
                                        }`}
                                    onClick={() => handleLeadStatusClick("Cold Lead")}
                                >
                                    Cold Lead
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>
                            </div>
                            <div className="inline-flex rounded-md shadow-sm">
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-s-lg ${activeView === "Table" ? "bg-[#0176D3] text-white" : "bg-white text-black border-[#747474]"
                                        }`}
                                    onClick={() => handleViewClick("Table")}
                                >
                                    <FontAwesomeIcon icon={faTable} />
                                    Table
                                </button>
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-e-lg ${activeView === "Kanban" ? "bg-[#0176D3] text-white" : "bg-white text-black border-[#747474]"
                                        }`}
                                    onClick={() => handleViewClick("Kanban")}
                                >
                                    <FontAwesomeIcon icon={faColumns} />
                                    Kanban
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Conditionally render the Lead Form */}
                    {showLeadForm && (
                        <div className="mt-4">
                            <LeadForm onClose={toggleLeadForm} /> {/* Pass the toggle function as onClose */}
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
}
