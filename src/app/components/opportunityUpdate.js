'use client'

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { closeModal } from "../components/modalSlice"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UpdateModal() {
  const dispatch = useDispatch()
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const { isModalOpen, selectedLead } = useSelector((state) => state.modal)

  const [leadData, setLeadData] = useState({
    name: "",
    cc: "",
    phone: "",
    email: "",
    feeQuoted: 0,
    batchTiming: "",
    leadStatus: "",
    stack: "",
    ClassMode: "",
    opportunityStatus: "",
    opportunityStage: "",
    DemoAttendedStage: "",
    visitedStage: "",
    lostOpportunityReason: "",
    nextFollowUp: "",
    leadSource: "",
    course: "",
    description: ""
  })

  useEffect(() => {
    if (selectedLead) {
      setLeadData({
        name: selectedLead.name || "",
        cc: selectedLead.cc || "",
        phone: selectedLead.phone || "",
        email: selectedLead.email || "",
        feeQuoted: selectedLead.feeQuoted || 0,
        batchTiming: selectedLead.batchTiming || "",
        leadStatus: selectedLead.leadStatus || "",
        stack: selectedLead.stack || "",
        ClassMode: selectedLead.ClassMode || "",
        opportunityStatus: selectedLead.opportunityStatus || "",
        opportunityStage: selectedLead.opportunityStage || "",
        DemoAttendedStage: selectedLead.DemoAttendedStage || "",
        visitedStage: selectedLead.visitedStage || "",
        lostOpportunityReason: selectedLead.lostOpportunityReason || "",
        nextFollowUp: selectedLead.nextFollowUp ? new Date(selectedLead.nextFollowUp).toISOString().split('T')[0] : "",
        leadSource: selectedLead.leadSource || "",
        course: selectedLead.course || "",
        description: selectedLead.description || ""
      })
    }
  }, [selectedLead])

  const generateTimeOptions = () => {
    const times = []
    for (let i = 7; i <= 21; i++) {
      times.push(`${i.toString().padStart(2, '0')}:00`)
    }
    return times
  }

  const timeOptions = generateTimeOptions()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLeadData({ ...leadData, [name]: name === 'feeQuoted' ? Number(value) : value })
  }

  const handleClose = () => {
    dispatch(closeModal())
  }
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put(`${API_BASE_URL}/opportunity/${selectedLead.id}`, leadData)

      if (response.status === 200) {
        setSuccessMessage("Opportunity updated successfully!")
        setError("")
        toast.success('Opportunity updated successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })

        setTimeout(() => {
          handleClose()
          window.location.reload()
        }, 2000)
      } else {
        setSuccessMessage("")
        setError("Failed to update opportunity.")
        toast.warn('Failed to update opportunity.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    } catch (error) {
      console.error("Error updating lead:", error)
      setSuccessMessage("")
      setError("An error occurred while updating the Opportunity.")
      toast.error('An error occurred while updating the opportunity.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }

  if (!isModalOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full h-full sm:h-auto max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold text-primary mb-6 text-teal-500">Update Lead: <sapn className = "text-black mx-2">{leadData.name}</sapn></h2>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={leadData.name}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block  text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={leadData.email}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block  text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={leadData.phone}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="feeQuoted" className="block  text-gray-700">Fee Quoted</label>
              <input
                type="number"
                id="feeQuoted"
                name="feeQuoted"
                value={leadData.feeQuoted}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="batchTiming" className="block  text-gray-700">Batch Timing</label>
              <select
                id="batchTiming"
                name="batchTiming"
                value={leadData.batchTiming}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select batch timing</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="leadStatus" className="block  text-gray-700">Lead Status</label>
              <select
                id="leadStatus"
                name="leadStatus"
                value={leadData.leadStatus}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select lead status</option>
                {["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="stack" className="block  text-gray-700">Stack</label>
              <select
                id="stack"
                name="stack"
                value={leadData.stack}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select stack</option>
                {["Life Skills", "Study Skills", "HR"].map((stack) => (
                  <option key={stack} value={stack}>{stack}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ClassMode" className="block  text-gray-700">Class Mode</label>
              <select
                id="ClassMode"
                name="ClassMode"
                value={leadData.ClassMode}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select class mode</option>
                {["Offline", "Online"].map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="opportunityStatus" className="block  text-gray-700">Opportunity Status</label>
              <select
                id="opportunityStatus"
                name="opportunityStatus"
                value={leadData.opportunityStatus}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select opportunity status</option>
                {["Visited", "Demo Attended", "Lost Opportunity"].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="opportunityStage" className="block  text-gray-700">Opportunity Stage</label>
              <select
                id="opportunityStage"
                name="opportunityStage"
                value={leadData.opportunityStage}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select opportunity stage</option>
                {["None", "Advanced Discussion", "Ready to Join", "Visiting", "Fees Negotiation", "Batch Allocation", "Interested in Demo", "Need Time This Week", "Need Time Next Week", "Need Time This Month", "Need Time Next Month", "Special Requirements", "Payment Link Sent", "Closed Won (Registered)", "Busy & Asked a Call Back"].map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="DemoAttendedStage" className="block  text-gray-700">Demo Attended Stage</label>
              <select
                id="DemoAttendedStage"
                name="DemoAttendedStage"
                value={leadData.DemoAttendedStage}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select demo attended stage</option>
                {["None", "Advanced Discussion", "Ready to Join", "Visiting", "Fees Negotiation", "Batch Allocation", "Interested in Demo", "Need Time This Week", "Need Time Next Week", "Need Time This Month", "Need Time Next Month", "Special Requirements", "Payment Link Sent", "Closed Won (Registered)", "Busy & Asked a Call Back"].map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="visitedStage" className="block  text-gray-700">Visited Stage</label>
              <select
                id="visitedStage"
                name="visitedStage"
                value={leadData.visitedStage}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select visited stage</option>
                {["None", "Advanced Discussion", "Ready to Join", "Visiting", "Fees Negotiation", "Batch Allocation", "Interested in Demo", "Need Time This Week", "Need Time Next Week", "Need Time This Month", "Need Time Next Month", "Special Requirements", "Payment Link Sent", "Closed Won (Registered)", "Busy & Asked a Call Back"].map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="lostOpportunityReason" className="block  text-gray-700">Lost Opportunity Reason</label>
              <select
                id="lostOpportunityReason"
                name="lostOpportunityReason"
                value={leadData.lostOpportunityReason}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select lost opportunity reason</option>
                {["None", "Invalid Number", "Not Interested", "Joined Another Institute", "Asking Free Course", "Pay After Placement"].map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="nextFollowUp" className="block  text-gray-700">Next Follow Up</label>
              <input
                type="date"
                id="nextFollowUp"
                name="nextFollowUp"
                value={leadData.nextFollowUp}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="leadSource" className="block text-gray-700">Lead Source</label>
              <input
                type="text"
                id="leadSource"
                name="leadSource"
                value={leadData.leadSource}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="course" className="block text-gray-700">Course</label>
              <input
                type="text"
                id="course"
                name="course"
                value={leadData.course}
                onChange={handleInputChange}
                className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={leadData.description}
              onChange={handleInputChange}
              rows={3}
              className="border w-full p-2 border-gray-300 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-500 rounded-md  text-gray-700 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-teal-500 rounded-md shadow-sm text-black hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}