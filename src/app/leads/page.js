
'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CreateLeadModal from "../components/createLeadModal";
import { useDispatch } from 'react-redux';
import { openModal } from '../components/modalSlice';
import LeadDeleteModal from '../components/deleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConvertModal from "../components/convertModal";
import Image from "next/image";

export default function Leads() {
    const [view, setView] = useState("table");
    const [allLeads, setAllLeads] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
    const [isMyLeadsDropdownOpen, setIsMyLeadsDropdownOpen] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("All Leads");
    const dispatch = useDispatch();
    const router = useRouter();
    const [ModalOpen, setModalOpen] = useState(false);


    const leadsPerPage = 10;

    useEffect(() => {
        const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!savedToken) {
            router.push('/');
        }
    }, [router]);


    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/leads`);
            if (response.data && Array.isArray(response.data.data)) {
                setAllLeads(response.data.data);
            } else {
                setError("Unexpected response format");
            }
        } catch (error) {
            setError("Failed to fetch leads");
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const filteredLeads = useMemo(() => {
        let filtered = [...allLeads];

        if (searchQuery) {
            filtered = filtered.filter(lead =>
                lead.leadname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (lead.course && lead.course.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        switch (currentFilter) {
            case "Today's Leads":
                filtered = filtered.filter(lead => new Date(lead.createdAt) >= today);
                break;
            case "Yesterday's Leads":
                filtered = filtered.filter(lead => {
                    const createdAt = new Date(lead.createdAt);
                    return createdAt >= yesterday && createdAt < today;
                });
                break;
            case "Previous Leads":
                filtered = filtered.filter(lead => new Date(lead.createdAt) < yesterday);
                break;
            // "All Leads" doesn't need filtering
        }

        return filtered;
    }, [allLeads, searchQuery, currentFilter]);

    const paginatedLeads = useMemo(() => {
        const startIndex = (page - 1) * leadsPerPage;
        return filteredLeads.slice(startIndex, startIndex + leadsPerPage);
    }, [filteredLeads, page]);

    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

    const handleCheckboxChange = (leadId) => {
        setSelectedLeads((prevSelected) =>
            prevSelected.includes(leadId)
                ? prevSelected.filter((id) => id !== leadId)
                : [...prevSelected, leadId]
        );
    };
    useEffect(() => {
        console.log('Selected leads:', selectedLeads);
    }, [selectedLeads]);

    const handleConvertClick = () => {
        if (selectedLeads.length > 0) {
            setModalOpen(true);
        } else {
            toast.warn('Please select at least one lead to convert!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const handleConfirmConversion = async (convertTo) => {
        setLoading(true);
        try {
            for (const leadId of selectedLeads) {
                const response = await fetch(`${API_BASE_URL}/leads/${leadId}/convert`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        convertTo: convertTo, // Post the selected conversion type
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    if (
                        data.status === 'Error' &&
                        data.message === 'An error occurred while converting the lead to an opportunity' &&
                        data.error === 'Validation error'
                    ) {
                        throw new Error('Email already exists');
                    } else {
                        throw new Error(`Failed to convert lead ${leadId}`);
                    }
                }

                console.log(`Lead ${leadId} converted to ${convertTo} successfully:`, data);
            }

            // After all conversions are done
            setLoading(false);
            setModalOpen(false);
            toast.success('Leads converted successfully!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });

            // Refresh the leads list
            fetchLeads();

            // Clear selected leads
            setSelectedLeads([]);
        } catch (error) {
            console.error('Error converting leads:', error);
            setLoading(false);

            if (error.message === 'Email already exists') {
                toast.error('Failed to convert lead. Email already exists in opportunities.', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                toast.error('Failed to convert leads. Please try again.', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }
        }
    };



    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUpdateClick = (leadId = null) => {
        // Case 1: If leadId is passed (from row click)
        if (leadId) {
            const lead = allLeads.find((lead) => lead.id === leadId);
            if (lead) {
                dispatch(openModal(lead)); // Open modal with selected lead's data
            }
        }
        // Case 2: If selected leads (from checkbox selection)
        else if (selectedLeads.length === 1) {
            const lead = allLeads.find((lead) => lead.id === selectedLeads[0]);
            if (lead) {
                dispatch(openModal(lead)); // Open modal with selected lead's data
            }
        }
        // Case 3: Handle other cases (0 or multiple selections)
        else if (selectedLeads.length === 0) {
            toast.warn('Please select at least one lead to update!', {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
        } else {
            toast.error('Please select only one lead to update at a time.', {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
        }
    };




    const handleDeleteClick = () => {
        if (selectedLeads.length > 0) {
            setIsDeleteModalOpen(true);
        } else {
            toast.warn('Please select atleast one lead to delete!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
            });
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            for (const leadId of selectedLeads) {
                await axios.delete(`${API_BASE_URL}/leads/${leadId}`);
            }
            fetchLeads();
            setSelectedLeads([]);
            setIsDeleteModalOpen(false);
            toast.success('Leads deleted successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
            });
        } catch (error) {
            console.error("Error deleting leads:", error);
            toast.error('Failed to delete leads. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
            });
        }
    };

    const handleCreateLead = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleLeadSuccess = () => {
        fetchLeads();
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

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
        setPage(1);
        setIsMyLeadsDropdownOpen(false);
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <div className="container mx-auto m-4 p-6 border shadow-lg rounded-2xl bg-slate-100">
            <ToastContainer />
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
                <div className="relative">
                    <div
                        onClick={() => setIsMyLeadsDropdownOpen(!isMyLeadsDropdownOpen)}
                        className="flex items-center p-2 cursor-pointer w-full sm:w-auto"
                    >
                        <span className="material-icons text-teal-500" style={{ fontSize: '2.25rem' }}>leaderboard</span>
                        <span className="ml-3 text-teal-500 font-bold" style={{ fontSize: '1.5rem' }}>{currentFilter}</span>
                        <span className="ml-2 material-icons text-teal-500" style={{ fontSize: '2.25rem' }}>expand_more</span>
                    </div>

                    {isMyLeadsDropdownOpen && (
                        <ul className="absolute top-full mt-1 bg-white shadow-lg rounded-lg z-40 w-full sm:w-auto">
                            <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => handleFilterChange("All Leads")}>All Leads</li>
                            <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => handleFilterChange("Today's Leads")}>Today&apos;s Leads</li>
                            <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => handleFilterChange("Yesterday's Leads")}>Yesterday&apos;s Leads</li>
                            <li className="px-4 py-2 hover:bg-teal-200 cursor-pointer" onClick={() => handleFilterChange("Previous Leads")}>Previous Leads</li>
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
                                <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer" onClick={() => handleUpdateClick()}>Update</li>
                                <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer" onClick={handleDeleteClick}>Delete</li>
                                <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer" onClick={handleConvertClick}>Convert</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 mb-4 border-b-2 pb-5 border-b-purple-200">
                <div className="relative w-full sm:w-1/5">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search leads"
                        className="border border-slate-300 rounded-xl w-full pl-10 p-1 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 material-icons text-gray-500">
                        search
                    </span>
                </div>

                <div className="flex">
                    <button
                        className={`p-1 pl-2 border rounded-s-xl ${view === "table" ? "bg-purple-500 text-white" : "bg-white"}`}
                        onClick={() => handleViewChange("table")}
                    >
                        <span className="material-icons">table_view</span> Table
                    </button>
                    <button
                        className={`p-1 pr-2 border rounded-e-xl ${view === "kanban" ? "bg-purple-500 text-white" : "bg-white"}`}
                        onClick={() => handleViewChange("kanban")}
                    >
                        <span className="material-icons">view_kanban</span> Kanban
                    </button>
                </div>
            </div>

            {view === "table" ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-teal-200 rounded-lg shadow-lg overflow-hidden">
                        <thead className="bg-teal-100">
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
                                <th className="p-2">Course</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {error && (
                                <tr>
                                    <td colSpan="8" className="p-4">
                                        <div className="flex flex-col items-center justify-center text-red-700 rounded-lg p-5 max-w-sm mx-auto ">
                                            <div className="relative w-full h-64 mb-4"> {/* Adjust h-64 to your desired height */}
                                                <Image
                                                    src="/images/error.png"
                                                    alt="Error"
                                                    width={0}
                                                    height={0}
                                                    layout="fill" // This makes the image cover the parent container
                                                    className="object-contain" // Maintains aspect ratio
                                                />
                                            </div>
                                            <p className="text-lg font-bold text-center">{error}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : (paginatedLeads.length === 0 && (!error)) ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">
                                        <div className="flex flex-col items-center justify-center text-yellow-500 rounded-lg p-5 max-w-sm mx-auto">
                                            <Image
                                                src="/images/noData.png"
                                                alt="No data found"
                                                width={0}
                                                height={0}
                                                layout="responsive" // Use layout here
                                                className="w-full h-auto mb-4" // Use Tailwind CSS classes for width and height
                                            />
                                            <p className="text-lg font-bold text-center">No data found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedLeads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-b-teal-100 cursor-pointer" onClick={() => handleUpdateClick(lead.id)}>
                                        <td
                                            className="p-2 text-center"
                                            onClick={(e) => e.stopPropagation()} // Prevent row click when checkbox is clicked
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedLeads.includes(lead.id)} // Control the checkbox based on the selectedLeads array
                                                onChange={(e) => {
                                                    e.stopPropagation(); // Prevent row click when checkbox is changed
                                                    handleCheckboxChange(lead.id); // Update selected leads on checkbox change
                                                }}
                                            />
                                        </td>
                                        <td className="p-2 text-center">{formatDate(lead.createdAt)}</td>
                                        <td className="p-2 text-center">{lead.leadStatus || 'N/A'}</td>
                                        <td className="p-2 text-center">{lead.leadname}</td>
                                        <td className="p-2 text-center">{lead.phone}</td>
                                        <td className="p-2 text-center">{lead.email}</td>
                                        <td className="p-2 text-center">{lead.course || 'N/A'}</td>
                                    </tr>



                                ))
                            )}
                        </tbody>
                    </table>

                    <div className="pagination flex justify-center items-center mt-4 space-x-2">
                        <button
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                            className="px-3 py-1 bg-purple-500 text-white rounded-md disabled:bg-gray-300 hover:bg-purple-800 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <span className="sr-only">Previous page</span>
                            <span aria-hidden="true">&larr;</span>
                        </button>

                        <div className="flex space-x-1">
                            {(() => {
                                const pageNumbers = [];
                                const totalPageButtons = 5;
                                let startPage = Math.max(1, page - Math.floor(totalPageButtons / 2));
                                let endPage = Math.min(totalPages, startPage + totalPageButtons - 1);

                                if (endPage - startPage + 1 < totalPageButtons) {
                                    startPage = Math.max(1, endPage - totalPageButtons + 1);
                                }

                                for (let i = startPage; i <= endPage; i++) {
                                    pageNumbers.push(
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i)}
                                            className={`px-3 py-1 rounded-md ${page === i
                                                ? 'bg-purple-800 text-white'
                                                : 'bg-purple-500 text-white hover:bg-purple-800'
                                                }`}
                                            aria-label={`Go to page ${i}`}
                                            aria-current={page === i ? 'page' : undefined}
                                        >
                                            {i}
                                        </button>
                                    );
                                }

                                return pageNumbers;
                            })()}
                        </div>

                        <button
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                            className="px-3 py-1 bg-purple-500 text-white rounded-md disabled:bg-gray-300 hover:bg-purple-800 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <span className="sr-only">Next page</span>
                            <span aria-hidden="true">&rarr;</span>
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
                        <div key={status} className="flex-1 min-w-[250px] p-4 overflow-y-auto max-h-[500px]">
                            <div className={`flex flex-col h-full border ${borderColor} rounded-lg shadow-lg bg-white`}>
                                <h2 className={`text-lg font-bold mb-4 ${headingColor} p-2 bg-opacity-20 ${bgColor}`}>{status}</h2>
                                <p className="text-base font-semibold mb-2 pl-2">Total Fee Quoted: ₹ {filteredLeads
                                    .filter((lead) => lead.leadStatus.toLowerCase() === status.toLowerCase())
                                    .reduce((total, lead) => total + (lead.feeQuoted || 0), 0)}
                                </p>
                                <div className="flex-1 overflow-y-auto p-4">
                                    {filteredLeads
                                        .filter((lead) => lead.leadStatus.toLowerCase() === status.toLowerCase())
                                        .map((lead) => (
                                            <div key={lead.id} className={`border ${borderColor} rounded-lg p-3 mb-2 ${bgColor} overflow-x-auto`}>
                                                <div className="flex flex-col sm:flex-row justify-between items-center">
                                                    <h3 className="font-semibold sm:pr-4">{lead.leadname}</h3>
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
            <LeadDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
            <ConvertModal
                isOpen={ModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmConversion}
            />
        </div>
    );
}
