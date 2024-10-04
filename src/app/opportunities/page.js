
"use client";
import { useState } from "react";
import Image from "next/image";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faTable, faColumns, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Opportunities() {
    const [activeopportunityStatus, setActiveopportunityStatus] = useState(null);
    const [activeView, setActiveView] = useState('Table');

    const handleopportunityStatusClick = (status) => {
        setActiveopportunityStatus(status);
        // Add your logic here
        console.log(`opportunity status clicked: ${status}`);
    };

    const handleViewClick = (view) => {
        setActiveView(view);
        // Add your logic here
        console.log(`View clicked: ${view}`);
    };
    return (

        <div className="lg:w-full">
            <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-[#FFF] rounded-lg">
                <div className="mb-5">
                    <div className="flex flex-wrap gap-3 justify-between items-center px-5 py-2">
                        <div className="flex gap-3 items-center">
                            <Image
                                src="/images/icon.svg"
                                alt="logo"
                                width={44}
                                height={44}
                            />
                            <h2 className="text-2xl font-medium text-black flex items-center gap-2">All Opportunities<FontAwesomeIcon icon={faAngleDown} /></h2>
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <button className="bg-[#0176D3] text-white text-sm rounded-lg border-solid border-black px-4 p-1 leading-6 gap-2">Create Opportunity <FontAwesomeIcon icon={faAngleDown} className="mt-2" /></button>
                            </div>
                            <div>
                                <button className="bg-white text-black text-sm rounded-md border border-neutral-400 px-4 p-1 leading-6 gap-2">Actions<FontAwesomeIcon icon={faAngleDown} className="mt-2 ml-1" /></button>
                            </div>

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
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 rounded-s-lg ${activeopportunityStatus === 'Not Contacted'
                                        ? 'bg-[#0176D3] text-white border-[#0176D3]'
                                        : 'bg-white text-black border-[#747474]'
                                        }`}
                                    onClick={() => handleopportunityStatusClick('Not Contacted')}
                                >
                                    Visiting
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>

                                <button
                                    type="button"
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeopportunityStatus === 'Attempted'
                                        ? 'bg-[#0176D3] text-white border-[#0176D3]'
                                        : 'bg-white text-black border-[#747474]'
                                        }`}
                                    onClick={() => handleopportunityStatusClick('Attempted')}
                                >
                                    Visited
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>

                                <button
                                    type="button"
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeopportunityStatus === 'Warm Lead'
                                        ? 'bg-[#0176D3] text-white border-[#0176D3]'
                                        : 'bg-white text-black border-[#747474]'
                                        }`}
                                    onClick={() => handleopportunityStatusClick('Warm Lead')}
                                >
                                    Demo Attempted
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>

                                <button
                                    type="button"
                                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeopportunityStatus === 'Cold Lead'
                                        ? 'bg-[#0176D3] text-white border-[#0176D3]'
                                        : 'bg-white text-black border-[#747474]'
                                        }`}
                                    onClick={() => handleopportunityStatusClick('Cold Lead')}
                                >
                                    Lost Opportunity
                                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">0</p>
                                </button>
                            </div>

                            <div className="inline-flex rounded-md shadow-sm">
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-s-lg ${activeView === 'Table'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-black border-[#747474]'
                                        }`}
                                    onClick={() => handleViewClick('Table')}
                                >
                                    <FontAwesomeIcon icon={faTable} />
                                    Table
                                </button>
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-e-lg ${activeView === 'Kanban'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-black border-[#747474]'
                                        }`}
                                    onClick={() => handleViewClick('Kanban')}
                                >
                                    <FontAwesomeIcon icon={faColumns} />
                                    Kanban
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )
}
