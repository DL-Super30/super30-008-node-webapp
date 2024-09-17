"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { closeModal } from "../components/modalSlice"; // Import closeModal action

export default function UpdateModal() {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const { isModalOpen, selectedLead } = useSelector((state) => state.modal); // Get modal state

    // Local state to store updated lead data
    const [leadData, setLeadData] = useState({
        name: "",
        countryCode: "",
        phone: "",
        email: "",
        leadStatus: "",
        leadSource: "",
        stack: "",
        course: "",
        feeQuoted: "",
        batchTiming: "",
        description: "",
        classMode: "",
        nextFollowUpDate: "",
    });

    // Use useEffect to update leadData when selectedLead changes
    useEffect(() => {
        if (selectedLead) {
            setLeadData({
                name: selectedLead.name || "",
                countryCode: selectedLead.countryCode || "",
                phone: selectedLead.phone || "",
                email: selectedLead.email || "",
                leadStatus: selectedLead.leadStatus || "",
                leadSource: selectedLead.leadSource || "",
                stack: selectedLead.stack || "",
                course: selectedLead.course || "",
                feeQuoted: selectedLead.feeQuoted || "",
                batchTiming: selectedLead.batchTiming || "",
                description: selectedLead.description || "",
                classMode: selectedLead.classMode || "",
                nextFollowUpDate: selectedLead.nextFollowUpDate || "",
            });
        }
    }, [selectedLead]); // Update leadData whenever selectedLead changes

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLeadData({ ...leadData, [name]: value });
    };

    // Handle closing the modal
    const handleClose = () => {
        dispatch(closeModal());
    };

    // Handle form submission to update the lead
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Make the API call to update the lead
            const response = await axios.put(`http://localhost:5000/update-data/${selectedLead.id}`, leadData);
    
            if (response.status === 200) {
                // Successfully updated the lead, close the modal
                setSuccessMessage("Lead updated successfully!"); // Set success message
                setError(""); // Clear error message if any
                onSuccess(); // Callback to handle success
    
                // Reload the page to reflect the updated data
                setTimeout(() => {
                    window.location.reload(); // Refresh the page after 3 seconds
                }, 3000);
    
            } else {
                setError("Failed to update lead.");
            }
        } catch (error) {
            console.error("Error updating lead:", error);
            setError("An error occurred while updating the lead.");
        }
    };
    
    if (!isModalOpen) {
        return null; // Don't render the modal if it's not open
    }

    return (
        <div className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full h-full sm:h-auto max-h-[90vh] overflow-y-auto relative">
                <h2 className="text-lg font-semibold mb-4">Update Lead</h2>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {error && <p className="text-red-500">{error}</p>}
                {selectedLead ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                Lead Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={leadData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="countryCode">
                                Country Code
                            </label>
                            <input
                                type="text"
                                id="countryCode"
                                name="countryCode"
                                value={leadData.countryCode}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={leadData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={leadData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="leadStatus">
                                Lead Status
                            </label>
                            <input
                                type="text"
                                id="leadStatus"
                                name="leadStatus"
                                value={leadData.leadStatus}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="leadSource">
                                Lead Source
                            </label>
                            <input
                                type="text"
                                id="leadSource"
                                name="leadSource"
                                value={leadData.leadSource}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="stack">
                                Stack
                            </label>
                            <input
                                type="text"
                                id="stack"
                                name="stack"
                                value={leadData.stack}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="course">
                                Course
                            </label>
                            <input
                                type="text"
                                id="course"
                                name="course"
                                value={leadData.course}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="feeQuoted">
                                Fee Quoted
                            </label>
                            <input
                                type="text"
                                id="feeQuoted"
                                name="feeQuoted"
                                value={leadData.feeQuoted}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="batchTiming">
                                Batch Timing
                            </label>
                            <input
                                type="text"
                                id="batchTiming"
                                name="batchTiming"
                                value={leadData.batchTiming}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={leadData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="classMode">
                                Class Mode
                            </label>
                            <input
                                type="text"
                                id="classMode"
                                name="classMode"
                                value={leadData.classMode}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="nextFollowUpDate">
                                Next Follow-Up Date
                            </label>
                            <input
                                type="date"
                                id="nextFollowUpDate"
                                name="nextFollowUpDate"
                                value={leadData.nextFollowUpDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Update Lead
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <p>No lead selected.</p>
                )}
            </div>
        </div>
    );
}
