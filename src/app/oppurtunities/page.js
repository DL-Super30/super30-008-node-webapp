"use client";

import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";


export default function Oppurtunities() {
    return (
        <div className="m-3 border border-gray-300 rounded-md" id="leads-list">
          <div className="mx-3 my-4 flex justify-between" >
            <div className="flex items-center gap-3">
                <Image src="/images/employee_contact.svg" alt="contact-icon"width={40} height={30}/>
                
            <h1 className="flex items-center font- text-2xl gap-2 text-sky-950">My Oppurtunities
            <FaChevronDown className="text-2xl font-light" />
            </h1>
            </div>
            <div className="flex items center gap-2">
                <button className="flex items-center border rounded-md px-4 py-1 gap-1">Create Oppurtunity <FaChevronDown className="ml-1 text-xs items-center font-thin" /></button>
                <button className="flex items-center border rounded-md px-4 py-1 gap-1">Actions <FaChevronDown className="ml-1 text-xs items-center font-thin" /></button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="border border-gray-200 h-12 bg-gray-100">
                <tr className="text-left">
                    <th><input type="checkbox" className="form-checkbox" /></th>   
                  <th className="border-r ">Created on</th>
                  <th className="border-r">Lead Status</th>
                  <th className="border-r">Name</th>
                  <th className="border-r">Phone</th>
                  <th className="border-r">Stack</th>
                  <th className="w-50">Course</th>
                </tr>
              </thead>
              <tbody className="text-left ">
                <tr className="border-b-2 h-8 ">
                <th><input type="checkbox" className="form-checkbox" /></th>
                  <td>1a</td>
                  <td>1b</td>
                  <td>1c</td>
                  <td>1d</td>
                  <td>1e</td>
                  <td>1f</td>
                </tr>
    
                <tr className="border-b-2 h-8">
                <th><input type="checkbox" className="form-checkbox" /></th>
                  <td>2a</td>
                  <td>2b</td>
                  <td>2c</td>
                  <td>2d</td>
                  <td>2e</td>
                  <td>2f</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
}