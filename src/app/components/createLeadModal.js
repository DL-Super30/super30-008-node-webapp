"use client";
import { useState } from "react";
import axios from "axios";

export default function CreateLeadModal({ isOpen, onClose, onSuccess }) {
  const [successMessage, setSuccessMessage] = useState(""); // Add success message state
  const [lead, setLead] = useState({
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
    classMode: "",
    nextFollowUp: "",
    description: "",
    createdAt: new Date().toISOString(),
  });
  const [error, setError] = useState("");
  const [dropdowns, setDropdowns] = useState({
    countryCode: false,
    leadStatus: false,
    leadSource: false,
    stack: false,
    course: false,
    batchTiming: false,
    classMode: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownToggle = (dropdown) => {
    setDropdowns((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const handleDropdownSelect = (dropdown, value) => {
    setLead((prev) => ({ ...prev, [dropdown]: value }));
    setDropdowns((prev) => ({ ...prev, [dropdown]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/save-data", lead);
      setSuccessMessage("Lead saved successfully!"); // Set success message
      setError(""); // Clear error message if any
      onSuccess();

      // Optionally refresh the page after a delay to show the updated data
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 3 seconds
      }, 3000);
    } catch (err) {
      setError("Failed to save the lead");
    }
  };

  const generateBatchTimingOptions = () => {
    const options = [];
    for (let hour = 7; hour <= 21; hour++) {
      options.push(`${hour}:00`);
    }
    return options;
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl h-full sm:h-auto max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4 text-rose-500">Create New Lead</h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="relative">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={lead.name}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700">Country Code</label>
              <div
                onClick={() => handleDropdownToggle("countryCode")}
                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-rose-300"
              >
                <span>{lead.countryCode || "Select Country Code"}</span>
                <span className="material-icons">expand_more</span>
              </div>
              {dropdowns.countryCode && (
                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                  <div onClick={() => handleDropdownSelect("countryCode", "+49")} className="p-2 cursor-pointer hover:bg-rose-200">Germany (+49)</div>
                  <div onClick={() => handleDropdownSelect("countryCode", "+1")} className="p-2 cursor-pointer hover:bg-rose-200">USA (+1)</div>
                  <div onClick={() => handleDropdownSelect("countryCode", "+91")} className="p-2 cursor-pointer hover:bg-rose-200">India (+91)</div>
                  <div onClick={() => handleDropdownSelect("countryCode", "+44")} className="p-2 cursor-pointer hover:bg-rose-200">UK (+44)</div>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={lead.phone}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
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
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700">Lead Status</label>
              <div
                onClick={() => handleDropdownToggle("leadStatus")}
                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-rose-300"
              >
                <span>{lead.leadStatus || "Select Status"}</span>
                <span className="material-icons"> expand_more</span>
              </div>
              {dropdowns.leadStatus && (
                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                  <div onClick={() => handleDropdownSelect("leadStatus", "Not Contacted")} className="p-2 cursor-pointer hover:bg-rose-200">Not Contacted</div>
                  <div onClick={() => handleDropdownSelect("leadStatus", "Attempted")} className="p-2 cursor-pointer hover:bg-rose-200">Attempted</div>
                  <div onClick={() => handleDropdownSelect("leadStatus", "Warm Lead")} className="p-2 cursor-pointer hover:bg-rose-200">Warm Lead</div>
                  <div onClick={() => handleDropdownSelect("leadStatus", "Cold Lead")} className="p-2 cursor-pointer hover:bg-rose-200">Cold Lead</div>
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-gray-700">Lead Source</label>
              <div
                onClick={() => handleDropdownToggle("leadSource")}
                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-rose-300"
              >
                <span>{lead.leadSource || "Select Source"}</span>
                <span className="material-icons">expand_more</span>
              </div>
              {dropdowns.leadSource && (
                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                  <div onClick={() => handleDropdownSelect("leadSource", "None")} className="p-2 cursor-pointer hover:bg-rose-200">None</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Walk In")} className="p-2 cursor-pointer hover:bg-rose-200">Walk In</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Student Referral")} className="p-2 cursor-pointer hover:bg-rose-200">Student Referral</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Demo")} className="p-2 cursor-pointer hover:bg-rose-200">Demo</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Website")} className="p-2 cursor-pointer hover:bg-rose-200">Website</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Website Chat")} className="p-2 cursor-pointer hover:bg-rose-200">Website Chat</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Inbound Call")} className="p-2 cursor-pointer hover:bg-rose-200">Inbound Call</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Google Adverts")} className="p-2 cursor-pointer hover:bg-rose-200">Google Adverts</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Facebook Ads")} className="p-2 cursor-pointer hover:bg-rose-200">Facebook Ads</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Google Business")} className="p-2 cursor-pointer hover:bg-rose-200">Google Business</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "YouTube Channel")} className="p-2 cursor-pointer hover:bg-rose-200">YouTube Channel</div>
                  <div onClick={() => handleDropdownSelect("leadSource", "Not Specified")} className="p-2 cursor-pointer hover:bg-rose-200">Not Specified</div>
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-gray-700">Stack</label>

              <div
                onClick={() => handleDropdownToggle("stack")}
                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-rose-300"
              >
                <span>{lead.stack || "Select Stack"}</span>
                <span className="material-icons">expand_more</span>
              </div>
              {dropdowns.stack && (
                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                  <div onClick={() => handleDropdownSelect("stack", "Life Skill")} className="p-2 cursor-pointer hover:bg-rose-200">Life Skill</div>
                  <div onClick={() => handleDropdownSelect("stack", "Study Aboard")} className="p-2 cursor-pointer hover:bg-rose-200">Study Aboard</div>
                  <div onClick={() => handleDropdownSelect("stack", "HR")} className="p-2 cursor-pointer hover:bg-rose-200">HR</div>
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-gray-700">Course</label>
              <div
                onClick={() => handleDropdownToggle("course")}
                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-rose-300"
              >
                <span>{lead.course || "Select Course"}</span>
                <span className="material-icons">expand_more</span>
              </div>
              {dropdowns.course && (
                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                  <div onClick={() => handleDropdownSelect("course", "HR Bussiness")} className="p-2 cursor-pointer hover:bg-rose-200">HR Bussiness</div>
                  <div onClick={() => handleDropdownSelect("course", "HR Generalist")} className="p-2 cursor-pointer hover:bg-rose-200">HR Generalist</div>
                  <div onClick={() => handleDropdownSelect("course", "HR Analytics")} className="p-2 cursor-pointer hover:bg-rose-200">HR Analytics</div>
                  <div onClick={() => handleDropdownSelect("course", "Spoken English")} className="p-2 cursor-pointer hover:bg-rose-200">Spoken English</div>
                  <div onClick={() => handleDropdownSelect("course", "Public Speaking")} className="p-2 cursor-pointer hover:bg-rose-200">Public Speaking</div>
                  <div onClick={() => handleDropdownSelect("course", "Communication Skills")} className="p-2 cursor-pointer hover:bg-rose-200">Communication Skills</div>

                  <div onClick={() => handleDropdownSelect("course", "Soft Skills")} className="p-2 cursor-pointer hover:bg-rose-200">Soft Skills</div>
                  <div onClick={() => handleDropdownSelect("course", "Aptitude")} className="p-2 cursor-pointer hover:bg-rose-200">Aptitude</div>
                  <div onClick={() => handleDropdownSelect("course", "IELTS")} className="p-2 cursor-pointer hover:bg-rose-200">IELTS</div>
                  <div onClick={() => handleDropdownSelect("course", "TOFEL")} className="p-2 cursor-pointer hover:bg-rose-200">TOFEL</div>
                  <div onClick={() => handleDropdownSelect("course", "GRE")} className="p-2 cursor-pointer hover:bg-rose-200">GRE</div>
                  <div onClick={() => handleDropdownSelect("course", "JFS")} className="p-2 cursor-pointer hover:bg-rose-200">JFS</div>

                  <div onClick={() => handleDropdownSelect("course", "PFS")} className="p-2 cursor-pointer hover:bg-rose-200">PFS</div>
                  <div onClick={() => handleDropdownSelect("course", "MERN")} className="p-2 cursor-pointer hover:bg-rose-200">MERN</div>
                  <div onClick={() => handleDropdownSelect("course", "AWS+Devops")} className="p-2 cursor-pointer hover:bg-rose-200">AWS+Devops</div>
                  <div onClick={() => handleDropdownSelect("course", "Azure+Devops")} className="p-2 cursor-pointer hover:bg-rose-200">Azure+Devops</div>
                  <div onClick={() => handleDropdownSelect("course", "Java Full-stack")} className="p-2 cursor-pointer hover:bg-rose-200">Java Full-stack</div>
                  <div onClick={() => handleDropdownSelect("course", "Python Full-stack")} className="p-2 cursor-pointer hover:bg-rose-200">Python Full-stack</div>
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-gray-700">Batch Timing</label>
              <div
                onClick={() => handleDropdownToggle("batchTiming")}
                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-rose-300"
              >
                <span>{lead.batchTiming || "Select Timing"}</span>
                <span className="material-icons">expand_more</span> {/* Material icon */}
              </div>
              {dropdowns.batchTiming && (
                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                  {generateBatchTimingOptions().map((timing) => (
                    <div
                      key={timing}
                      onClick={() => handleDropdownSelect("batchTiming", timing)}
                      className="p-2 cursor-pointer hover:bg-rose-100"
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
                onClick={() => handleDropdownToggle("classMode")}
                className="cursor-pointer border-2 rounded-md w-full p-2 flex justify-between items-center hover:border-rose-300"
              >
                <span>{lead.classMode || "Select Class Mode"}</span>
                <span className="material-icons">expand_more</span>
              </div>
              {dropdowns.classMode && (
                <div className="absolute z-10 border rounded-md mt-2 bg-white w-full max-h-40 overflow-y-auto">
                  <div onClick={() => handleDropdownSelect("classMode", "Online")} className="p-2 cursor-pointer hover:bg-rose-200">International Online</div>
                  <div onClick={() => handleDropdownSelect("classMode", "India Online")} className="p-2 cursor-pointer hover:bg-rose-200">India Online</div>
                  <div onClick={() => handleDropdownSelect("classMode", "BLR Classroom")} className="p-2 cursor-pointer hover:bg-rose-200">BLR Classroom</div>
                  <div onClick={() => handleDropdownSelect("classMode", "Hyd Classroom")} className="p-2 cursor-pointer hover:bg-rose-200">Hyd Classroom</div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Next Follow-Up</label>
              <input
                type="datetime-local"
                name="nextFollowUp"
                value={lead.nextFollowUp}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={lead.description}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
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
              className="bg-white border-2 border-rose-500 text-black px-4 py-2 rounded-md hover:bg-rose-500 hover:font-bold hover:text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
