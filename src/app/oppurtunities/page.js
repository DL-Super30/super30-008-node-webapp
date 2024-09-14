"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

const data = [
  // Add your data here (example data with less than 15 items)
  { id: 1, createdOn: "1a", leadStatus: "1b", name: "1c", phone: "1d", stack: "1e", course: "1f" },
  { id: 2, createdOn: "", leadStatus: "", name: "", phone: "", stack: "", course: "" },
  // Add more data to test
];

export default function Opportunities() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the range for display
  const startItem = indexOfFirstItem + 1;
  const endItem = totalItems < itemsPerPage ? totalItems : indexOfLastItem;

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="m-3 border border-gray-300 rounded-md" id="leads-list">
      <div className="mx-3 my-4 flex justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/employee_contact.svg" alt="contact-icon" width={40} height={30} />
          <h1 className="flex items-center text-2xl gap-2 text-sky-950">
            My Opportunities
            <FaChevronDown className="text-2xl font-light" />
          </h1>
        </div>
        <div className="flex items center gap-2">
          <button className="flex items-center border rounded-md px-4 py-1 gap-1">
            Create Opportunity <FaChevronDown className="ml-1 text-xs items-center font-thin" />
          </button>
          <button className="flex items-center border rounded-md px-4 py-1 gap-1">
            Actions <FaChevronDown className="ml-1 text-xs items-center font-thin" />
          </button>
        </div>
      </div>

      {/* Table for displaying opportunities */}
      <div className="p-4 overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="border border-gray-200 h-12 bg-gray-100">
            <tr className="text-left">
              <th><input type="checkbox" className="form-checkbox" /></th>
              <th className="border-r">Created on</th>
              <th className="border-r">Lead Status</th>
              <th className="border-r">Name</th>
              <th className="border-r">Phone</th>
              <th className="border-r">Stack</th>
              <th className="w-50">Course</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {currentData.map((item) => (
              <tr key={item.id} className="border-b-2 h-8">
                <td><input type="checkbox" className="form-checkbox" /></td>
                <td>{item.createdOn}</td>
                <td>{item.leadStatus}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.stack}</td>
                <td>{item.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4 text-sm">
        <div className="flex items-center gap-4">
          <span>{startItem} to {endItem} of {totalItems}</span>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
