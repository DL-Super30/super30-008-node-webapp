'use client'

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { closeModal } from "../components/modalSlice" // Import closeModal action
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateModal() {
  const dispatch = useDispatch()
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const { isModalOpen, selectedLead } = useSelector((state) => state.modal) // Get modal state

  // Local state to store updated lead data
  const [leadData, setLeadData] = useState({
    leadname: "",
    email: "",
    phone: "",
    feeQuoted: 0,
    batchTiming: "",
    leadStatus: "",
    leadSource: "",
    course: "",
    selectedClassMode: "",
  })

  // Use useEffect to update leadData when selectedLead changes
  useEffect(() => {
    if (selectedLead) {
      setLeadData({
        leadname: selectedLead.leadname || "",
        email: selectedLead.email || "",
        phone: selectedLead.phone || "",
        feeQuoted: selectedLead.feeQuoted || 0,
        batchTiming: selectedLead.batchTiming || "",
        leadStatus: selectedLead.leadStatus || "",
        leadSource: selectedLead.leadSource || "",
        course: selectedLead.course || "",
        selectedClassMode: selectedLead.selectedClassMode || "",
      })
    }
  }, [selectedLead]) // Update leadData whenever selectedLead changes

  // Function to generate time options
  const generateTimeOptions = (startTime, endTime) => {
    const times = [];
    let current = startTime;

    while (current <= endTime) {
      const hours = current.getHours();
      const minutes = current.getMinutes() === 0 ? '00' : current.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

      times.push(
        `${formattedHours}:${minutes} ${period}`
      );

      // Increment by 1 hour
      current.setHours(current.getHours() + 1);
    }

    return times;
  };

  // Usage in the JSX
  const timeOptions = generateTimeOptions(new Date(2024, 1, 1, 7, 0), new Date(2024, 1, 1, 21, 0)); // 7:00 AM to 9:00 PM

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLeadData({ ...leadData, [name]: name === 'feeQuoted' ? Number(value) : value })
  }

  // Handle closing the modal
  const handleClose = () => {
    dispatch(closeModal())
  }

  // Handle form submission to update the lead
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Make the API call to update the lead
      const response = await axios.put(`http://localhost:4000/api/leads/${selectedLead.id}`, leadData)

      if (response.status === 200) {
        // Successfully updated the lead
        setSuccessMessage("Lead updated successfully!") // Set success message
        setError("") // Clear error message if any
        toast.success('Lead updated successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });

        // Reload the page to reflect the updated data
        setTimeout(() => {
          handleClose() // Close the modal
          window.location.reload() // Refresh the page
        }, 2000) // Delay to show success message

      } else {
        setSuccessMessage("") // Clear success message if there's an error
        setError("Failed to update lead.")
        toast.warn('Failed to update lead.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error updating lead:", error)
      setSuccessMessage("") // Clear success message if there's an error
      setError("An error occurred while updating the lead.")
      toast.error('An error occurred while updating the lead.', {
        position: "top-center",
        autoClose: 2000,
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

  if (!isModalOpen) {
    return null // Don't render the modal if it's not open
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full h-full sm:h-auto max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center mb-6 gap-x-4">
          <h2 className="text-xl font-bold text-teal-500">Update Lead: </h2>
          {/* <div className="flex items-center border-2 p-2 pr-2 rounded border-blue-200">
            <span className="material-icons text-black pr-2">article</span>
            <span className="text-lg text-black italic font-medium">{leadData.leadname}</span>
          </div> */}
          {/* <div className="flex-grow"></div> {/* This will push the button to the right */}
          {/* <button className="border-amber-400 border-2 text-black p-2 font-bold rounded hover:text-white hover:bg-amber-400">Convert</button>  */}
        </div>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {error && <p className="text-red-500">{error}</p>}
        {selectedLead ? (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <div className="relative">
                <label className="block text-gray-700" htmlFor="leadname">
                  Lead Name
                </label>
                <input
                  type="text"
                  id="leadname"
                  name="leadname"
                  value={leadData.leadname}
                  onChange={handleInputChange}
                  className="border w-full p-2 border-gray-300 rounded"
                />
              </div>

              <div className="relative">
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

              <div className="relative">
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

              <div className="relative">
                <label className="block text-sm font-medium mb-1" htmlFor="feeQuoted">
                  Fee Quoted
                </label>
                <input
                  type="number"
                  id="feeQuoted"
                  name="feeQuoted"
                  value={leadData.feeQuoted}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1" htmlFor="batchTiming">
                  Batch Timing
                </label>
                <select
                  id="batchTiming"
                  name="batchTiming"
                  value={leadData.batchTiming}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a time</option>
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            

              <div className="relative">
                <label className="block text-sm font-medium mb-1" htmlFor="leadStatus">
                  Lead Status
                </label>
                <select
                  id="leadStatus"
                  name="leadStatus"
                  value={leadData.leadStatus}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Lead Status</option>
                  <option value="Not Contacted">Not Contacted</option>
                  <option value="Attempted">Attempted</option>
                  <option value="Warm Lead">Warm Lead</option>
                  <option value="Cold Lead">Cold Lead</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1" htmlFor="leadSource">
                  Lead Source
                </label>
                <select
                  id="leadSource"
                  name="leadSource"
                  value={leadData.leadSource}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Lead Source</option>
                  <option value="None">None</option>
                  <option value="Walk-In">Walk-In</option>
                  <option value="Student Referral">Student Referral</option>
                  <option value="Demo">Demo</option>
                  <option value="Website">Website</option>
                  <option value="Website Chat">Website Chat</option>
                  <option value="Inbound Call">Inbound Call</option>
                  <option value="Google Adverts">Google Adverts</option>
                  <option value="Facebook Ads">Facebook Ads</option>
                  <option value="Google Business">Google Business</option>
                  <option value="WhatsApp Skill Capital">WhatsApp Skill Capital</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1" htmlFor="course">
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={leadData.course}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Course</option>
                  <option value="HR Business Partner">HR Business Partner</option>
                  <option value="HR Generalist">HR Generalist</option>
                  <option value="HR Analytics">HR Analytics</option>
                  <option value="Spoken English">Spoken English</option>
                  <option value="Public Speaking">Public Speaking</option>
                  <option value="Communication Skills">Communication Skills</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Aptitude">Aptitude</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="GRE">GRE</option>
                  <option value="JFS">JFS</option>
                  <option value="PFS">PFS</option>
                  <option value="MERN">MERN</option>
                  <option value="AWS+DevOps">AWS+DevOps</option>
                  <option value="Azure+DevOps">Azure+DevOps</option>
                  <option value="Java Full Stack">Java Full Stack</option>
                  <option value="Python Full Stack">Python Full Stack</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1" htmlFor="selectedClassMode">
                  Class Mode
                </label>
                <select
                  id="selectedClassMode"
                  name="selectedClassMode"
                  value={leadData.selectedClassMode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Class Mode</option>
                  <option value="International Online">International Online</option>
                  <option value="India Online">India Online</option>
                  <option value="BLR Classroom">BLR Classroom</option>
                  <option value="HYD Classroom">HYD Classroom</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleClose}
                className="border-2 border-gray-500 text-black py-2 px-4 mx-4 rounded hover:bg-gray-500 hover:text-white"
              >
                Close
              </button>
              <button
                type="submit"
                className="border-2 border-teal-500 text-black py-2 px-4 rounded hover:bg-teal-600 hover:text-white"
              >
                Update Lead
              </button>
            </div>
          </form>
        ) : (
          <p>No lead selected.</p>
        )}
      </div>
    </div>
  )
}