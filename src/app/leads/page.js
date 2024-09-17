"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CreateLeadModal from "../components/createLeadModal";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../components/modalSlice';


export default function Leads() {
  const [view, setView] = useState("table"); // Toggle between table and kanban
  const [leads, setLeads] = useState([]); // Store leads data
  const [page, setPage] = useState(1); // Pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [leadsPerPage] = useState(15); // Number of leads per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const dispatch = useDispatch();
  const lead = useSelector(state => state.lead);

  const handleCheckboxChange = (leadId) => {
    setSelectedLead(leadId); // Set the selected lead's ID
  };


  // Handle Update button click
  const handleUpdateClick = () => {
    if (selectedLead) {
      const lead = leads.find((lead) => lead.id === selectedLead); // Get full lead data
      if (lead) {
        dispatch(openModal(lead)); // Open modal with the selected lead
      }
    } else {
      alert("Please select a lead to update.");
    }
  };



  const handleUpdate = (lead) => {
    dispatch(openModal(lead));  // Open the modal and pass the selected lead
  };

  const handleCreateLead = () => {
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleLeadSuccess = () => {
    // Refresh leads after successfully adding a lead
  };
  // Dropdown states
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [isMyLeadsDropdownOpen, setIsMyLeadsDropdownOpen] = useState(false);

  const router = useRouter();

  // Ensure the user is authenticated
  useEffect(() => {
    const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!savedToken) {
      router.push('/');
    }
  }, [router]);

  // Fetch leads data from API
  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await axios.get(
          `http://localhost:5000/fetch-data?page=${page}&limit=${leadsPerPage}`
        );

        if (response.data && Array.isArray(response.data)) {
          const sortedLeads = response.data.sort((a, b) => b.id - a.id);
          setLeads(sortedLeads);

          setTotalPages(Math.ceil(sortedLeads.length / leadsPerPage));
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, [page, leadsPerPage]);

  // Check for errors in data fetching
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Filtering leads based on search query
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.stack.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate filtered leads
  const paginatedLeads = filteredLeads.slice((page - 1) * leadsPerPage, page * leadsPerPage);

  // Toggle header checkbox selection (select/deselect all on page)
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(paginatedLeads.map((lead) => lead.id)); // Select all current page leads
    } else {
      setSelectedLeads([]); // Deselect all
    }
  };

  // Toggle individual lead selection
  const handleSelectLead = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    setPage(1); // Reset to first page when clearing search
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="container mx-auto m-4 p-6 border shadow-lg rounded-2xl bg-rose-50">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
        {/* Left Section: My Leads Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsMyLeadsDropdownOpen(!isMyLeadsDropdownOpen)}
            className="flex items-center bg-rose-500 p-2 rounded-lg cursor-pointer w-full sm:w-auto"
          >
            <span className="material-icons text-white">leaderboard</span>
            <span className="ml-2 text-white font-bold">All Leads</span>
            <span className="ml-1 material-icons text-white">expand_more</span>
          </div>
          {isMyLeadsDropdownOpen && (
            <ul className="absolute top-full mt-1 bg-white shadow-lg rounded-lg z-40 w-full sm:w-auto">
              {/* Add z-index to the dropdown */}
              <li className="px-4 py-2 hover:bg-rose-200 cursor-pointer">Today's Leads</li>
              <li className="px-4 py-2 hover:bg-rose-200 cursor-pointer">Yesterday's Leads</li>
              <li className="px-4 py-2 hover:bg-rose-200 cursor-pointer">Previous Leads</li>
            </ul>
          )}
        </div>

        {/* Right Section: Create Lead and Actions Dropdown */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto">
          <div className="bg-rose-500 text-white p-2 rounded-lg w-full sm:w-auto cursor-pointer" onClick={handleCreateLead} >
            Create Lead
          </div>

          <div className="relative w-full sm:w-auto">
            <div
              onClick={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
              className="flex items-center bg-rose-200 p-2 rounded-lg cursor-pointer w-full sm:w-auto"
            >
              Actions
              <span className="ml-1 material-icons">expand_more</span>
            </div>
            {isActionsDropdownOpen && (
              <ul className="absolute top-full mt-1 bg-white shadow-lg rounded-lg z-40 w-full sm:w-auto">
                {/* Add z-index to the dropdown */}
                <li className="px-4 py-2 hover:bg-rose-200 cursor-pointer" onClick={handleUpdateClick}>Update</li>
                <li className="px-4 py-2 hover:bg-rose-200 cursor-pointer">Delete</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 mb-4 border-b-2 pb-5 border-b-rose-200">
        {/* Search Box */}
        <div className="relative w-full sm:w-1/5">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search leads"
            className="border border-rose-300 rounded-xl w-full pl-10 p-1 focus:outline-none focus:ring-1 focus:ring-customPink"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 material-icons text-gray-500">
            search
          </span>
        </div>

        {/* Clear Search Button */}
        <button
          onClick={handleClearSearch}
          className="text-rose-500 p-2 rounded-lg"
        >
          Clear Search
        </button>

        {/* View Toggle Buttons */}
        <div className="flex">
          <button
            className={`p-1 border rounded-s-xl ${view === "table" ? "bg-rose-500 text-white" : "bg-white"
              }`}
            onClick={() => setView("table")}
          >
            <span className="material-icons">table_view</span> Table
          </button>
          <button
            className={`p-1 border rounded-e-xl ${view === "kanban" ? "bg-rose-500 text-white" : "bg-white"
              }`}
            onClick={() => setView("kanban")}
          >
            <span className="material-icons">view_kanban</span> Kanban
          </button>
        </div>
      </div>

      {/* Dynamic Table */}
      {view === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-rose-200 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-rose-100">
              <tr>
                <th className="p-2">
                  <input
                    type="checkbox"
                     // Pass the lead ID
                  />
                </th>
                <th className="p-2">Created On</th>
                <th className="p-2">Lead Status</th>
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Email</th>
                <th className="p-2">Stack</th>
                <th className="p-2">Course</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-b-rose-100">
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedLead === lead.id}
                    onChange={() => handleCheckboxChange(lead.id)}
                      />
                    </td>
                    <td className="p-2 text-center">{formatDate(lead.createdAt)}</td>
                    <td className="p-2 text-center">{lead.leadStatus || 'N/A'}</td>
                    <td className="p-2 text-center">{lead.name}</td>
                    <td className="p-2 text-center">{lead.phone}</td>
                    <td className="p-2 text-center">{lead.email}</td>
                    <td className="p-2 text-center">{lead.stack || 'N/A'}</td>
                    <td className="p-2 text-center">{lead.course || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-4">
            {/* Previous Button */}
            <button
              className="text-rose-500 px-4 py-2 rounded-lg flex items-center"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <span className="material-icons mr-2">arrow_back</span>
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2 mx-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-lg ${page === index + 1 ? "bg-rose-500 text-white" : "bg-white"
                    }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              className=" text-rose-500 px-4 py-2 rounded-lg flex items-center"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <span className="material-icons ml-2">arrow_forward</span>
            </button>
          </div>

        </div>
      ) : (

        <div className="flex gap-4 overflow-x-auto p-4">
          {[
            { status: "Not Contacted", headingColor: "text-red-500", bgColor: "bg-red-100", borderColor: "border-red-300" },
            { status: "Attempted", headingColor: "text-green-500", bgColor: "bg-green-100", borderColor: "border-green-300" },
            { status: "Warm Lead", headingColor: "text-yellow-500", bgColor: "bg-yellow-100", borderColor: "border-yellow-300" },
            { status: "Cold Lead", headingColor: "text-blue-500", bgColor: "bg-blue-100", borderColor: "border-blue-300" }
          ].map(({ status, headingColor, bgColor, borderColor }) => (

            <div
              className={`flex flex-col border border-rose-200 rounded-lg shadow-lg p-4 w-auto min-w-[16rem] bg-white`}>
              <h2 className={`text-lg font-bold mb-4 ${headingColor}`}>{status}</h2>
              <div className="flex flex-col gap-2">
                {filteredLeads
                  .filter((lead) => lead.leadStatus.toLowerCase() === status.toLowerCase())
                  .map((lead, index) => (
                    <div
                      className={`border ${borderColor} rounded-lg p-3 ${bgColor}`}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold pr-4">{lead.name}</h3>
                        <p className="text-sm text-gray-700">{lead.phone}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <CreateLeadModal
        isOpen={isModalOpen} // Control the modal visibility
        onClose={handleModalClose} // Handle modal close
        onSuccess={handleLeadSuccess} // Handle lead creation success
      />
    </div>
  );
}
