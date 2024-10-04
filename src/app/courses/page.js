"use client";
import Image from "next/image";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function leads() {
    return (

        <div className="lg:w-[70%]">
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
                            <h2 className="text-2xl font-medium text-black flex items-center gap-2">Courses<FontAwesomeIcon icon={faAngleDown} /></h2>
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <button className="bg-[#0176D3] text-white text-sm rounded-lg border-solid border-black px-4 p-1 leading-6 gap-2">Create Course <FontAwesomeIcon icon={faAngleDown} className="mt-2" /></button>
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
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )
}