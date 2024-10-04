
'use client'

import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateLeadModal({ isOpen, onClose, onSuccess }) {
    const [successMessage, setSuccessMessage] = useState("")
    const [lead, setLead] = useState({
        leadname: "",
        email: "",
        phone: "",
        feeQuoted: "",
        batchTiming: "",
        leadStatus: "",
        leadSource: "",
        course: "",
        selectedClassMode: ""
    })
    const [error, setError] = useState("")
    const [dropdowns, setDropdowns] = useState({
        leadStatus: false,
        leadSource: false,
        course: false,
        batchTiming: false,
        selectedClassMode: false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLead((prev) => ({ ...prev, [name]: name === "feeQuoted" ? Number(value) : value }))
    }

    const handleDropdownToggle = (dropdown) => {
        setDropdowns((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }))
    }

    const handleDropdownSelect = (dropdown, value) => {
        setLead((prev) => ({ ...prev, [dropdown]: value }))
        setDropdowns((prev) => ({ ...prev, [dropdown]: false }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!lead.leadStatus) {
            setError("Lead Status is required");
            toast.warn('Lead Status is required!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return; // Prevent form submission if validation fails
        }
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        try {
            await axios.post(`${API_BASE_URL}/leads`, lead)
            setSuccessMessage("Lead saved successfully!")
            setError("")
            onSuccess()
            toast.success('Lead Created Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
            });

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            if (error.response && error.response.data.error.name === 'SequelizeUniqueConstraintError') {
                const emailError = error.response.data.error.errors.find(err => err.path === 'email');
                if (emailError) {
                    // Display email already exists message
                    setError('Email already exists. Please use a different one.');
                    toast.error('Email already exists.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        // transition: Bounce,
                    });
                }
            } else {
                // Handle other types of errors (optional)
                setError("Failed to save the lead")
                toast.warn('Failed to save the lead!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    // transition: Bounce,
                });
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const generateBatchTimingOptions = () => {
        const options = []
        for (let hour = 7; hour <= 21; hour++) {
            options.push(`${hour}:00`)
        }
        return options
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl h-full sm:h-auto max-h-[90vh] overflow-y-auto relative">
                <h2 className="text-xl font-bold mb-4 text-teal-500">Create New Lead</h2>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                        <div className="relative">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="leadname"
                                value={lead.leadname}
                                onChange={handleChange}
                                className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={lead.phone}
                                onChange={handleChange}
                                className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={lead.email}
                                onChange={handleChange}
                                className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Fee Quoted</label>
                            <input
                                type="text"
                                name="feeQuoted"
                                value={lead.feeQuoted}
                                onChange={handleChange}
                                className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Lead Status</label>
                            <div
                                onClick={() => handleDropdownToggle("leadStatus")}
                                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                            >
                                <span>{lead.leadStatus || "Select Status"}</span>
                                <span className="material-icons">expand_more</span>
                            </div>
                            {dropdowns.leadStatus && (
                                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                    <div onClick={() => handleDropdownSelect("leadStatus", "Not Contacted")} className="p-2 cursor-pointer hover:bg-gray-200">Not Contacted</div>
                                    <div onClick={() => handleDropdownSelect("leadStatus", "Attempted")} className="p-2 cursor-pointer hover:bg-gray-200">Attempted</div>
                                    <div onClick={() => handleDropdownSelect("leadStatus", "Warm Lead")} className="p-2 cursor-pointer hover:bg-gray-200">Warm Lead</div>
                                    <div onClick={() => handleDropdownSelect("leadStatus", "Cold Lead")} className="p-2 cursor-pointer hover:bg-gray-200">Cold Lead</div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Lead Source</label>
                            <div
                                onClick={() => handleDropdownToggle("leadSource")}
                                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                            >
                                <span>{lead.leadSource || "Select Source"}</span>
                                <span className="material-icons">expand_more</span>
                            </div>
                            {dropdowns.leadSource && (
                                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                    <div onClick={() => handleDropdownSelect("leadSource", "None")} className="p-2 cursor-pointer hover:bg-gray-200">None</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Walk In")} className="p-2 cursor-pointer hover:bg-gray-200">Walk In</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Student Referral")} className="p-2 cursor-pointer hover:bg-gray-200">Student Referral</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Demo")} className="p-2 cursor-pointer hover:bg-gray-200">Demo</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Website")} className="p-2 cursor-pointer hover:bg-gray-200">Website</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Website Chat")} className="p-2 cursor-pointer hover:bg-gray-200">Website Chat</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Inbound Call")} className="p-2 cursor-pointer hover:bg-gray-200">Inbound Call</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Google Adverts")} className="p-2 cursor-pointer hover:bg-gray-200">Google Adverts</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Facebook Ads")} className="p-2 cursor-pointer hover:bg-gray-200">Facebook Ads</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Google Business")} className="p-2 cursor-pointer hover:bg-gray-200">Google Business</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "YouTube Channel")} className="p-2 cursor-pointer hover:bg-gray-200">YouTube Channel</div>
                                    <div onClick={() => handleDropdownSelect("leadSource", "Not Specified")} className="p-2 cursor-pointer hover:bg-gray-200">Not Specified</div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Course</label>
                            <div
                                onClick={() => handleDropdownToggle("course")}
                                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                            >
                                <span>{lead.course || "Select Course"}</span>
                                <span className="material-icons">expand_more</span>
                            </div>
                            {dropdowns.course && (
                                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                    <div onClick={() => handleDropdownSelect("course", "HR Business")} className="p-2 cursor-pointer hover:bg-gray-200">HR Business</div>
                                    <div onClick={() => handleDropdownSelect("course", "HR Generalist")} className="p-2 cursor-pointer hover:bg-gray-200">HR Generalist</div>
                                    <div onClick={() => handleDropdownSelect("course", "HR Analytics")} className="p-2 cursor-pointer hover:bg-gray-200">HR Analytics</div>
                                    <div onClick={() => handleDropdownSelect("course", "Spoken English")} className="p-2 cursor-pointer hover:bg-gray-200">Spoken English</div>
                                    <div onClick={() => handleDropdownSelect("course", "Public Speaking")} className="p-2 cursor-pointer hover:bg-gray-200">Public Speaking</div>
                                    <div onClick={() => handleDropdownSelect("course", "Communication Skills")} className="p-2 cursor-pointer hover:bg-gray-200">Communication Skills</div>
                                    <div onClick={() => handleDropdownSelect("course", "Soft Skills")} className="p-2 cursor-pointer hover:bg-gray-200">Soft Skills</div>
                                    <div onClick={() => handleDropdownSelect("course", "Aptitude")} className="p-2 cursor-pointer hover:bg-gray-200">Aptitude</div>
                                    <div onClick={() => handleDropdownSelect("course", "IELTS")} className="p-2 cursor-pointer hover:bg-gray-200">IELTS</div>
                                    <div onClick={() => handleDropdownSelect("course", "TOEFL")} className="p-2 cursor-pointer hover:bg-gray-200">TOEFL</div>
                                    <div onClick={() => handleDropdownSelect("course", "GRE")} className="p-2 cursor-pointer hover:bg-gray-200">GRE</div>
                                    <div onClick={() => handleDropdownSelect("course", "JFS")} className="p-2 cursor-pointer hover:bg-gray-200">JFS</div>
                                    <div onClick={() => handleDropdownSelect("course", "PFS")} className="p-2 cursor-pointer hover:bg-gray-200">PFS</div>
                                    <div onClick={() => handleDropdownSelect("course", "MERN")} className="p-2 cursor-pointer hover:bg-gray-200">MERN</div>
                                    <div onClick={() => handleDropdownSelect("course", "AWS+Devops")} className="p-2 cursor-pointer hover:bg-gray-200">AWS+Devops</div>
                                    <div onClick={() => handleDropdownSelect("course", "Azure+Devops")} className="p-2 cursor-pointer hover:bg-gray-200">Azure+Devops</div>
                                    <div onClick={() => handleDropdownSelect("course", "Java Full-stack")} className="p-2 cursor-pointer hover:bg-gray-200">Java Full-stack</div>
                                    <div onClick={() => handleDropdownSelect("course", "Python Full-stack")} className="p-2 cursor-pointer hover:bg-gray-200">Python Full-stack</div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Batch Timing</label>
                            <div
                                onClick={() => handleDropdownToggle("batchTiming")}
                                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                            >
                                <span>{lead.batchTiming || "Select Timing"}</span>
                                <span className="material-icons">expand_more</span>
                            </div>
                            {dropdowns.batchTiming && (
                                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                    {generateBatchTimingOptions().map((timing) => (
                                        <div
                                            key={timing}
                                            onClick={() => handleDropdownSelect("batchTiming", timing)}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                        >
                                            {timing}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700">Class Mode</label>
                            <div
                                onClick={() => handleDropdownToggle("selectedClassMode")}
                                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                            >
                                <span>{lead.selectedClassMode || "Select Class Mode"}</span>
                                <span className="material-icons">expand_more</span>
                            </div>
                            {dropdowns.selectedClassMode && (
                                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                    <div onClick={() => handleDropdownSelect("selectedClassMode", "Online")} className="p-2 cursor-pointer hover:bg-gray-200">International Online</div>
                                    <div onClick={() => handleDropdownSelect("selectedClassMode", "India Online")} className="p-2 cursor-pointer hover:bg-gray-200">India Online</div>
                                    <div onClick={() => handleDropdownSelect("selectedClassMode", "BLR Classroom")} className="p-2 cursor-pointer hover:bg-gray-200">BLR Classroom</div>
                                    <div onClick={() => handleDropdownSelect("selectedClassMode", "Hyd Classroom")} className="p-2 cursor-pointer hover:bg-gray-200">Hyd Classroom</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-white text-black border-2 border-gray-500 px-4 py-2 rounded-md hover:bg-gray-500 hover:font-bold hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-white border-2 border-teal-500 text-black px-4 py-2 rounded-md hover:bg-teal-500 hover:font-bold hover:text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
