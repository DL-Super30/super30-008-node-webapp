"use client";

import Link from 'next/link';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard() {
    return (

        <div className="flex-1 p-6 bg-[#F4F6F9]">
            <div className='flex'>
                <div className='bg-white flex p-5 w-48 rounded-md ml-5'>
                    <FontAwesomeIcon icon={faUsers} className="text-teal-800 w-5 rounded-full bg-[#F4F6F9]" />
                    <div className='px-5'>
                        <p className='text-sky-500 text-xs'>Not Contacted</p>
                        <p><b>1</b></p>
                    </div>
                </div>
                <div className='bg-white flex p-5 w-48 rounded-md ml-5'>
                    <FontAwesomeIcon icon={faUsers} className="text-teal-800 w-5 rounded-full bg-[#F4F6F9]" />
                    <div className='px-5'>
                        <p className='text-sky-500 text-xs'>Warm Lead</p>
                        <p><b>25</b></p>
                    </div>
                </div>
                <div className='bg-white flex p-5 w-48 rounded-md ml-5'>
                    <FontAwesomeIcon icon={faUsers} className="text-teal-800 w-5 rounded-full bg-[#F4F6F9]" />
                    <div className='px-5'>
                        <p className='text-sky-500 text-xs'>Attempted</p>
                        <p><b>21</b></p>
                    </div>
                </div>
                <div className='bg-white flex p-5 w-48 rounded-md ml-5'>
                    <FontAwesomeIcon icon={faUsers} className="text-teal-800 w-5 rounded-full bg-[#F4F6F9]" />
                    <div className='px-5'>
                        <p className='text-sky-500 text-xs'>Registered</p>
                        <p><b>1</b></p>
                    </div>
                </div>
                <div className='bg-white flex p-5 w-48 rounded-md ml-5'>
                    <FontAwesomeIcon icon={faUsers} className="text-teal-800 w-5 rounded-full bg-[#F4F6F9]" />
                    <div className='px-5'>
                        <p className='text-sky-500 text-xs'>Oppurtunity</p>
                        <p><b>1</b></p>
                    </div>
                </div>
                <div className='bg-white flex p-5 w-48 rounded-md ml-5'>
                    <FontAwesomeIcon icon={faUsers} className="text-teal-800 w-5 rounded-full bg-[#F4F6F9]" />
                    <div className='px-5'>
                        <p className='text-sky-500 text-xs'>Cold Lead</p>
                        <p><b>36</b></p>
                    </div>
                </div>
            </div>
        </div>

    )
}
