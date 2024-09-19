"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CreateLeadModal from "../components/createLeadModal";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../components/modalSlice';

export default function Leads() {
  const [view, setView] = useState("table");
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [leadsPerPage] = useState(15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  // const [selectedLead, setSelectedLead] = useState(null);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [isMyLeadsDropdownOpen, setIsMyLeadsDropdownOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All Leads");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!savedToken) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      setError(null);
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

  useEffect(() => {
    filterLeads();
  }, [leads, currentFilter, searchQuery]);

  const filterLeads = () => {
    let filtered = leads;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    switch (currentFilter) {
      case "Today's Leads":
        filtered = filtered.filter(lead => new Date(lead.createdAt) >= today);
        break;
      case "Yesterday's Leads":
        filtered = filtered.filter(lead => new Date(lead.createdAt) >= yesterday && new Date(lead.createdAt) < today);
        break;
      case "Previous Leads":
        filtered = filtered.filter(lead => new Date(lead.createdAt) < yesterday);
        break;
    }

    if (searchQuery) {
      filtered = filtered.filter((lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.stack.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.course.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
    setTotalPages(Math.ceil(filtered.length / leadsPerPage));
  };

  const handleCheckboxChange = (leadId) => {
    setSelectedLeads(prevSelected => 
      prevSelected.includes(leadId)
        ? prevSelected.filter(id => id !== leadId)
        : [...prevSelected, leadId]
    );
  };

  const handleUpdateClick = () => {
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead to update.");
    } else if (selectedLeads.length === 1) {
      const lead = leads.find((lead) => lead.id === selectedLeads[0]);
      if (lead) {
        dispatch(openModal(lead));
      }
    } else {
      alert("Please select only one lead to update at a time.");
    }
  };

  const handleDeleteLeads = async () => {
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead to delete.");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete the selected leads?");
    if (!confirmed) return;

    try {
      for (const leadId of selectedLeads) {
        await axios.delete(`http://localhost:5000/delete-data/${leadId}`);
      }
      setLeads((prevLeads) => prevLeads.filter((lead) => !selectedLeads.includes(lead.id)));
      setSelectedLeads([]);
      alert("Leads deleted successfully.");
    } catch (error) {
      console.error("Error deleting leads:", error);
      alert("Failed to delete leads. Please try again.");
    }
  };

  const handleCreateLead = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLeadSuccess = () => {
    // Refresh leads after successfully adding a lead
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const paginatedLeads = filteredLeads.slice((page - 1) * leadsPerPage, page * leadsPerPage);

  return (
    <div className="container mx-auto m-4 p-6 border shadow-lg rounded-2xl bg-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
        <div className="relative">
          <div
            onClick={() => setIsMyLeadsDropdownOpen(!isMyLeadsDropdownOpen)}
            className="flex items-center bg-teal-500 p-2 rounded-lg cursor-pointer w-full sm:w-auto"
          >
            <span className="material-icons text-white">leaderboard</span>
            <span className="ml-2 text-white font-bold">{currentFilter}</span>
            <span className="ml-1 material-icons text-white">expand_more</span>
          </div>
          {isMyLeadsDropdownOpen && (
            <ul className="absolute top-full mt-1 bg-white shadow-lg rounded-lg z-40 w-full sm:w-auto">
              <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => { setCurrentFilter("All Leads"); setIsMyLeadsDropdownOpen(false); }}>All Leads</li>
              <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => { setCurrentFilter("Today's Leads"); setIsMyLeadsDropdownOpen(false); }}>Today's Leads</li>
              <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => { setCurrentFilter("Yesterday's Leads"); setIsMyLeadsDropdownOpen(false); }}>Yesterday's Leads</li>
              <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => { setCurrentFilter("Previous Leads"); setIsMyLeadsDropdownOpen(false); }}>Previous Leads</li>
            </ul>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto">
          <div className="bg-teal-500 text-white p-2 rounded-lg w-full sm:w-auto cursor-pointer" onClick={handleCreateLead}>
            Create Lead
          </div>

          <div className="relative w-full sm:w-auto">
            <div
              onClick={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
              className="flex items-center bg-teal-200 p-2 rounded-lg cursor-pointer w-full sm:w-auto"
            >
              Actions
              <span className="ml-1 material-icons">expand_more</span>
            </div>
            {isActionsDropdownOpen && (
              <ul className="absolute top-full mt-1 bg-white shadow-lg rounded-lg z-40 w-full sm:w-auto">
                <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer" onClick={handleUpdateClick}>Update</li>
                <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer" onClick={handleDeleteLeads}>Delete</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 mb-4 border-b-2 pb-5 border-b-rose-200">
        <div className="relative w-full sm:w-1/5">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search leads"
            className="border border-slate-300 rounded-xl w-full pl-10 p-1 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 material-icons text-gray-500">
            search
          </span>
        </div>

        <div className="flex">
          <button
            className={`p-1 border rounded-s-xl ${view === "table" ? "bg-purple-500 text-white" : "bg-white"}`}
            onClick={() => setView("table")}
          >
            <span className="material-icons">table_view</span> Table
          </button>
          <button
            className={`p-1 border rounded-e-xl ${view === "kanban" ? "bg-purple-500 text-white" : "bg-white"}`}
            onClick={() => setView("kanban")}
          >
            <span className="material-icons">view_kanban</span> Kanban
          </button>
        </div>
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-rose-200 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-rose-100">
              <tr>
                <th className="p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeads(paginatedLeads.map((lead) => lead.id));
                      } else {
                        setSelectedLeads([]);
                      }
                    }}
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
                        checked={selectedLeads.includes(lead.id)}
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

          <div className="flex items-center justify-center mt-4">
            <button
              className="text-purple-500 px-4 py-2 rounded-lg flex items-center"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <span className="material-icons mr-2">arrow_back</span>
            </button>

            <div className="flex space-x-2 mx-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-lg ${page === index + 1 ? "bg-purple-500 text-white" : "bg-white"}`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="text-purple-500 px-4 py-2 rounded-lg flex items-center"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <span className="material-icons ml-2">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-nowrap overflow-x-auto">
          {[
            { status: "Not Contacted", headingColor: "text-red-500", bgColor: "bg-red-100", borderColor: "border-red-300" },
            { status: "Attempted", headingColor: "text-green-500", bgColor: "bg-green-100", borderColor: "border-green-300" },
            { status: "Warm Lead", headingColor: "text-yellow-500", bgColor: "bg-yellow-100", borderColor: "border-yellow-300" },
            { status: "Cold Lead", headingColor: "text-blue-500", bgColor: "bg-blue-100", borderColor: "border-blue-300" }
          ].map(({ status, headingColor, bgColor, borderColor }) => (
            <div key={status} className="flex-1 min-w-[250px] p-4">
              <div className={`flex flex-col h-full border ${borderColor} rounded-lg shadow-lg bg-white`}>
                <h2 className={`text-lg font-bold mb-4 ${headingColor} p-2 bg-opacity-20 ${bgColor}`}>{status}</h2>
                <div className="flex-1 overflow-y-auto p-4">
                  {filteredLeads
                    .filter((lead) => lead.leadStatus.toLowerCase() === status.toLowerCase())
                    .map((lead) => (
                      <div key={lead.id} className={`border ${borderColor} rounded-lg p-3 mb-2 ${bgColor} overflow-x-auto`}>
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold pr-4">{lead.name}</h3>
                          <p className="text-sm text-gray-700">{lead.phone}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{lead.email}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleLeadSuccess}
      />
    </div>
  );
}