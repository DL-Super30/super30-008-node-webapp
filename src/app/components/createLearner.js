'use client'

import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CreateLearnerModal({ isOpen, onClose, onSuccess }) {
    const [successMessage, setSuccessMessage] = useState("")
    const [learner, setLearner] = useState({
        firstname: "",
        lastname: "",
        idProof: "",
        phone: "",
        DOB: "",
        email: "",
        registeredDate: "",
        location: "",
        batchId: "",
        alternatePhone: "",
        description: "",
        exchangeRate: "",
        source: "",
        attendedDemo: "",
        learnerOwner: "",
        learnerStage: "",
        currency: "",
        leadCreatedDate: "",
        CounselingDoneBy: "",
        registeredCourse: "",
        techStack: "",
        courseComments: "",
        slackAccess: "",
        lMSAccess: "",
        preferableTime: "",
        batchTiming: "",
        modeOfClass: "",
        Comment: "",
        nextFollowUp: new Date().toISOString().split('T')[0], // Set default to today's date
    })
    const [error, setError] = useState("")
    const [dropdowns, setDropdowns] = useState({
        location: false,
        learnerStage: false,
        modeOfClass: false,
        source: false,
        attendedDemo: false,
        registeredCourse: false,
        techStack: false,
        batchTiming: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLearner((prev) => ({ ...prev, [name]: value }))
    }

    const handleDropdownToggle = (dropdown) => {
        setDropdowns((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }))
    }

    const handleDropdownSelect = (dropdown, value) => {
        setLearner((prev) => ({ ...prev, [dropdown]: value }))
        setDropdowns((prev) => ({ ...prev, [dropdown]: false }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        // Format the data to match backend expectations
        const formattedLearner = {
            ...learner,
            DOB: learner.DOB ? learner.DOB : null,
            registeredDate: learner.registeredDate ? learner.registeredDate : null,
            leadCreatedDate: learner.leadCreatedDate ? learner.leadCreatedDate : null,
            nextFollowUp: learner.nextFollowUp,
            batchId: learner.batchId ? parseInt(learner.batchId, 10) : null,
            registeredCourse: learner.registeredCourse ? parseInt(learner.registeredCourse, 10) : null,
            exchangeRate: learner.exchangeRate ? parseFloat(learner.exchangeRate) : null,
            createdAt: new Date().toISOString(), // Set to current date and time
        }

        try {
            await axios.post(`${API_BASE_URL}/learner`, formattedLearner)
            setSuccessMessage("Learner created successfully!")
            setError("")
            onSuccess()
            toast.success('Learner Created Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            if (error.response && error.response.data.error.name === 'SequelizeUniqueConstraintError') {
                const emailError = error.response.data.error.errors.find(err => err.path === 'email')
                if (emailError) {
                    setError('Email already exists. Please use a different one.')
                    toast.error('Email already exists.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                }
            } else {
                setError("An error occurred while creating the learner. Please try again.")
                toast.error('An error occurred. Please try again.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                console.error("Error details:", error.response ? error.response.data : error)
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const attendedDemoOptions = [
        "None", "Advanced Discussion", "Ready to Join", "Visiting", "Fees Negotiation",
        "Batch Allocation", "Interested in Demo", "Need Time This Week", "Need Time Next Week",
        "Need Time This Month", "Need Time Next Month", "Special Requirements", "Payment Link Sent",
        "Closed Won (Registered)", "Closed Lost (Cold Lead)", "Busy & Asked a Call Back"
    ]

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
                <h2 className="text-xl font-bold mb-4 text-teal-500">Create New Learner</h2>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-gray-700">First Name<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={learner.firstname}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={learner.lastname}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Email<span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={learner.email}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Phone<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={learner.phone}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Alternate Phone</label>
                                <input
                                    type="text"
                                    name="alternatePhone"
                                    value={learner.alternatePhone}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    name="DOB"
                                    value={learner.DOB}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Location</label>
                                <div
                                    onClick={() => handleDropdownToggle("location")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.location || "Select Location"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.location && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        <div onClick={() => handleDropdownSelect("location", "Hyderabad")} className="p-2 cursor-pointer hover:bg-gray-200">Hyderabad</div>
                                        <div onClick={() => handleDropdownSelect("location", "Bangalore")} className="p-2 cursor-pointer hover:bg-gray-200">Bangalore</div>
                                        <div onClick={() => handleDropdownSelect("location", "Kakinada")} className="p-2 cursor-pointer hover:bg-gray-200">Kakinada</div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">ID Proof</label>
                                <input
                                    type="text"
                                    name="idProof"
                                    value={learner.idProof}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Course Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-gray-700">Registered Course</label>
                                <div
                                    onClick={() => handleDropdownToggle("registeredCourse")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.registeredCourse || "Select Course"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.registeredCourse && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "HR Business")} className="p-2 cursor-pointer hover:bg-gray-200">HR Business</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "HR Generalist")} className="p-2 cursor-pointer hover:bg-gray-200">HR Generalist</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "HR Analytics")} className="p-2 cursor-pointer hover:bg-gray-200">HR Analytics</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Spoken English")} className="p-2 cursor-pointer hover:bg-gray-200">Spoken English</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Public Speaking")} className="p-2 cursor-pointer hover:bg-gray-200">Public Speaking</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Communication Skills")} className="p-2 cursor-pointer hover:bg-gray-200">Communication Skills</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Soft Skills")} className="p-2 cursor-pointer hover:bg-gray-200">Soft Skills</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Aptitude")} className="p-2 cursor-pointer hover:bg-gray-200">Aptitude</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "IELTS")} className="p-2 cursor-pointer hover:bg-gray-200">IELTS</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "TOEFL")} className="p-2 cursor-pointer hover:bg-gray-200">TOEFL</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "GRE")} className="p-2 cursor-pointer hover:bg-gray-200">GRE</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "JFS")} className="p-2 cursor-pointer hover:bg-gray-200">JFS</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "PFS")} className="p-2 cursor-pointer hover:bg-gray-200">PFS</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "M ERN")} className="p-2 cursor-pointer hover:bg-gray-200">MERN</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "AWS+Devops")} className="p-2 cursor-pointer hover:bg-gray-200">AWS+Devops</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Azure+Devops")} className="p-2 cursor-pointer hover:bg-gray-200">Azure+Devops</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Java Full-stack")} className="p-2 cursor-pointer hover:bg-gray-200">Java Full-stack</div>
                                        <div onClick={() => handleDropdownSelect("registeredCourse", "Python Full-stack")} className="p-2 cursor-pointer hover:bg-gray-200">Python Full-stack</div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Tech Stack</label>
                                <div
                                    onClick={() => handleDropdownToggle("techStack")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.techStack || "Select Stack"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.techStack && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        <div onClick={() => handleDropdownSelect("techStack", "Life Skills")} className="p-2 cursor-pointer hover:bg-gray-200">Life Skills</div>
                                        <div onClick={() => handleDropdownSelect("techStack", "Study Skills")} className="p-2 cursor-pointer hover:bg-gray-200">Study Skills</div>
                                        <div onClick={() => handleDropdownSelect("techStack", "HR")} className="p-2 cursor-pointer hover:bg-gray-200">HR</div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Batch ID</label>
                                <input
                                    type="number"
                                    name="batchId"
                                    value={learner.batchId}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Batch Timing</label>
                                <div
                                    onClick={() => handleDropdownToggle("batchTiming")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.batchTiming || "Select Batch Timing"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.batchTiming && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        {generateBatchTimingOptions().map((time) => (
                                            <div
                                                key={time}
                                                onClick={() => handleDropdownSelect("batchTiming", time)}
                                                className="p-2 cursor-pointer hover:bg-gray-200"
                                            >
                                                {time}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Mode of Class</label>
                                <div
                                    onClick={() => handleDropdownToggle("modeOfClass")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.modeOfClass || "Select Mode of Class"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.modeOfClass && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        <div onClick={() => handleDropdownSelect("modeOfClass", "India Online")} className="p-2 cursor-pointer hover:bg-gray-200">India Online</div>
                                        <div onClick={() => handleDropdownSelect("modeOfClass", "Offline")} className="p-2 cursor-pointer hover:bg-gray-200">Offline</div>
                                        <div onClick={() => handleDropdownSelect("modeOfClass", "Hybrid")} className="p-2 cursor-pointer hover:bg-gray-200">Hybrid</div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Preferable Time</label>
                                <input
                                    type="datetime-local"
                                    name="preferableTime"
                                    value={learner.preferableTime}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Lead Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-gray-700">Source</label>
                                <div
                                    onClick={() => handleDropdownToggle("source")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.source || "Select Source"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.source && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        <div onClick={() => handleDropdownSelect("source", "Demo")} className="p-2 cursor-pointer hover:bg-gray-200">Demo</div>
                                        <div onClick={() => handleDropdownSelect("source", "Website")} className="p-2 cursor-pointer hover:bg-gray-200">Website</div>
                                        <div onClick={() => handleDropdownSelect("source", "Referral")} className="p-2 cursor-pointer hover:bg-gray-200">Referral</div>
                                        <div onClick={() => handleDropdownSelect("source", "Social Media")} className="p-2 cursor-pointer hover:bg-gray-200">Social Media</div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Attended Demo</label>
                                <div
                                    onClick={() => handleDropdownToggle("attendedDemo")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.attendedDemo || "Select Attended Demo"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.attendedDemo && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        {attendedDemoOptions.map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => handleDropdownSelect("attendedDemo", option)}
                                                className="p-2 cursor-pointer hover:bg-gray-200"
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Learner Stage</label>
                                <div
                                    onClick={() => handleDropdownToggle("learnerStage")}
                                    className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-gray-700"
                                >
                                    <span>{learner.learnerStage || "Select Learner Stage"}</span>
                                    <span className="material-icons">expand_more</span>
                                </div>
                                {dropdowns.learnerStage && (
                                    <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                                        <div onClick={() => handleDropdownSelect("learnerStage", "New")} className="p-2 cursor-pointer hover:bg-gray-200">New</div>
                                        <div onClick={() => handleDropdownSelect("learnerStage", "Upcoming")} className="p-2 cursor-pointer hover:bg-gray-200">Upcoming</div>
                                        <div onClick={() => handleDropdownSelect("learnerStage", "Ongoing")} className="p-2 cursor-pointer hover:bg-gray-200">Ongoing</div>
                                        <div onClick={() => handleDropdownSelect("learnerStage", "Onhold")} className="p-2 cursor-pointer hover:bg-gray-200">Onhold</div>
                                        <div onClick={() => handleDropdownSelect("learnerStage", "Completed")} className="p-2 cursor-pointer hover:bg-gray-200">Completed</div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Learner Owner</label>
                                <input
                                    type="text"
                                    name="learnerOwner"
                                    value={learner.learnerOwner}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Counseling Done By</label>
                                <input
                                    type="text"
                                    name="CounselingDoneBy"
                                    value={learner.CounselingDoneBy}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Lead Created Date</label>
                                <input
                                    type="date"
                                    name="leadCreatedDate"
                                    value={learner.leadCreatedDate}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-gray-700">Registered Date</label>
                                <input
                                    type="date"
                                    name="registeredDate"
                                    value={learner.registeredDate}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Exchange Rate</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="exchangeRate"
                                    value={learner.exchangeRate}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Currency</label>
                                <input
                                    type="text"
                                    name="currency"
                                    value={learner.currency}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Slack Access</label>
                                <input
                                    type="text"
                                    name="slackAccess"
                                    value={learner.slackAccess}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">LMS Access</label>
                                <input
                                    type="text"
                                    name="lMSAccess"
                                    value={learner.lMSAccess}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Next Follow Up</label>
                                <input
                                    type="date"
                                    name="nextFollowUp"
                                    value={learner.nextFollowUp}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Description and Comments</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={learner.description}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Course Comments</label>
                                <textarea
                                    name="courseComments"
                                    value={learner.courseComments}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Additional Comments</label>
                                <textarea
                                    name="Comment"
                                    value={learner.Comment}
                                    onChange={handleChange}
                                    className="border rounded-md w-full p-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                                    rows="4"
                                ></textarea>
                            </div>
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