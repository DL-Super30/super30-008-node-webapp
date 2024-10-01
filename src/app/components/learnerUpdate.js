"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../components/modalSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateLearnerModal() {
  const dispatch = useDispatch();
  const { isModalOpen, selectedLead } = useSelector((state) => state.modal);
  const [editingFields, setEditingFields] = useState({});
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
    nextFollowUp: "",
  });

  const [dropdowns, setDropdowns] = useState({
    location: false,
    learnerStage: false,
    modeOfClass: false,
    source: false,
    attendedDemo: false,
    registeredCourse: false,
    techStack: false,
    batchTiming: false
  });

  useEffect(() => {
    if (selectedLead) {
      setLearner({
        firstname: selectedLead.firstname || "",
        lastname: selectedLead.lastname || "",
        idProof: selectedLead.idProof || "",
        phone: selectedLead.phone || "",
        DOB: selectedLead.DOB ? new Date(selectedLead.DOB).toISOString().split('T')[0] : "",
        email: selectedLead.email || "",
        registeredDate: selectedLead.registeredDate ? new Date(selectedLead.registeredDate).toISOString().split('T')[0] : "",
        location: selectedLead.location || "",
        batchId: selectedLead.batchId ? String(selectedLead.batchId) : "",
        alternatePhone: selectedLead.alternatePhone || "",
        description: selectedLead.description || "",
        exchangeRate: selectedLead.exchangeRate ? String(selectedLead.exchangeRate) : "",
        source: selectedLead.source || "",
        attendedDemo: selectedLead.attendedDemo ? String(selectedLead.attendedDemo) : "",
        learnerOwner: selectedLead.learnerOwner || "",
        learnerStage: selectedLead.learnerStage || "",
        currency: selectedLead.currency || "",
        leadCreatedDate: selectedLead.leadCreatedDate ? new Date(selectedLead.leadCreatedDate).toISOString().split('T')[0] : "",
        CounselingDoneBy: selectedLead.CounselingDoneBy || "",
        registeredCourse: selectedLead.registeredCourse ? String(selectedLead.registeredCourse) : "",
        techStack: selectedLead.techStack || "",
        courseComments: selectedLead.courseComments || "",
        slackAccess: selectedLead.slackAccess ? String(selectedLead.slackAccess) : "",
        lMSAccess: selectedLead.lMSAccess ? String(selectedLead.lMSAccess) : "",
        preferableTime: selectedLead.preferableTime || "",
        batchTiming: selectedLead.batchTiming || "",
        modeOfClass: selectedLead.modeOfClass || "",
        Comment: selectedLead.Comment || "",
        nextFollowUp: selectedLead.nextFollowUp ? new Date(selectedLead.nextFollowUp).toISOString().split('T')[0] : "",
      });
      setEditingFields({});
    }
  }, [selectedLead]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingFields[name]) {
      setLearner({ ...learner, [name]: value });
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Function to handle full form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedLearner = {
      ...learner,
      DOB: learner.DOB ? learner.DOB : null,
      registeredDate: learner.registeredDate ? learner.registeredDate : null,
      leadCreatedDate: learner.leadCreatedDate ? learner.leadCreatedDate : null,
      nextFollowUp: learner.nextFollowUp ? learner.nextFollowUp : null,
      batchId: learner.batchId ? parseInt(learner.batchId, 10) : null,
      registeredCourse: learner.registeredCourse ? parseInt(learner.registeredCourse, 10) : null,
      exchangeRate: learner.exchangeRate ? parseFloat(learner.exchangeRate) : null,
      attendedDemo: learner.attendedDemo ? Boolean(learner.attendedDemo) : null,
      slackAccess: learner.slackAccess ? Boolean(learner.slackAccess) : null,
      lMSAccess: learner.lMSAccess ? Boolean(learner.lMSAccess) : null,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/learner/${selectedLead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedLearner),
      });

      if (response.ok) {
        toast.success('Learner updated successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 2000);
      } else {
        toast.warn('Failed to update learner.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating learner:", error);
      toast.error('An error occurred while updating the learner.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Function to handle partial updates (PATCH request)
  const handlePatch = async (e, fieldKey) => {
    e.preventDefault();

    const updatedField = {
      [fieldKey]: learner[fieldKey]
    };

    try {
      const response = await fetch(`${API_BASE_URL}/learner/${selectedLead.id}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedField),
      });

      if (response.ok) {
        toast.success(`${fieldKey} updated successfully!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setEditingFields((prev) => ({ ...prev, [fieldKey]: false }));
      } else {
        toast.warn(`Failed to update ${fieldKey}.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(`Error updating ${fieldKey}:`, error);
      toast.error(`An error occurred while updating ${fieldKey}.`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Toggle editing state for a specific field
  const toggleEditing = (key) => {
    setEditingFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isAnyFieldEditing = Object.values(editingFields).some(value => value);

  const handleDropdownToggle = (dropdown) => {
    // Only allow dropdown toggle if the field is in edit mode
    if (editingFields[dropdown]) {
      setDropdowns((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
    }
  };

  const handleDropdownSelect = (dropdown, value) => {
    setLearner((prev) => ({ ...prev, [dropdown]: value }));
    setDropdowns((prev) => ({ ...prev, [dropdown]: false }));
  };

  if (!isModalOpen) {
    return null;
  }

  const renderField = (key, label, options = null) => (
    <div key={key} className="mb-4">
      <label htmlFor={key} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center mt-1">
        {options ? (
          <div className="relative w-full">
            <div
              onClick={() => handleDropdownToggle(key)}
              className={`cursor-pointer border rounded-md w-full p-2 flex justify-between items-center ${editingFields[key] ? 'bg-white' : 'bg-gray-100 cursor-default'}`}
            >
              <span>{learner[key] || `Select ${label}`}</span>
              <span className="material-icons">expand_more</span>
            </div>
            {dropdowns[key] && editingFields[key] && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDropdownSelect(key, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : key === 'description' || key === 'courseComments' || key === 'Comment' ? (
          <textarea
            id={key}
            name={key}
            value={learner[key]}
            onChange={handleInputChange}
            disabled={!editingFields[key]}
            className={`w-full p-2 border rounded-md ${editingFields[key] ? 'border-teal-500' : 'bg-gray-100 border-gray-300'}`}
            rows="3"
          />
        ) : ['DOB', 'registeredDate', 'leadCreatedDate', 'nextFollowUp'].includes(key) ? (
          <input
            type="date"
            id={key}
            name={key}
            value={learner[key]}
            onChange={handleInputChange}
            disabled={!editingFields[key]}
            className={`w-full p-2 border rounded-md ${editingFields[key] ? 'border-teal-500' : 'bg-gray-100 border-gray-300'}`}
          />
        ) : ['batchId', 'exchangeRate'].includes(key) ? (
          <input
            type="number"
            id={key}
            name={key}
            value={learner[key]}
            onChange={handleInputChange}
            disabled={!editingFields[key]}
            className={`w-full p-2 border rounded-md ${editingFields[key] ? 'border-teal-500' : 'bg-gray-100 border-gray-300'}`}
          />
        ) : (
          <input
            type="text"
            id={key}
            name={key}
            value={learner[key]}
            onChange={handleInputChange}
            disabled={!editingFields[key]}
            className={`w-full p-2 border rounded-md ${editingFields[key] ? 'border-teal-500' : 'bg-gray-100 border-gray-300'}`}
          />
        )}
        <button
          type="button"
          className="ml-2 p-1 text-gray-500 hover:text-teal-500"
          onClick={(e) => {
            if (editingFields[key]) {
              // If the button is in "save" mode, submit the PATCH request
              handlePatch(e, key);
            } else {
              // If the button is in "edit" mode, switch to "save" mode
              toggleEditing(key);
            }
          }}
        >
          <span className="material-icons">
            {editingFields[key] ? 'save' : 'edit'} {/* Conditionally show icon */}
          </span>
        </button>
      </div>
    </div>
  );

  const attendedDemoOptions = [
    "None", "Advanced Discussion", "Ready to Join", "Visiting", "Fees Negotiation",
    "Batch Allocation", "Interested in Demo", "Need Time This Week", "Need Time Next Week",
    "Need Time This Month", "Need Time Next Month", "Special Requirements", "Payment Link Sent",
    "Closed Won (Registered)", "Closed Lost (Cold Lead)", "Busy & Asked a Call Back"
  ];

  const locationOptions = ["Hyderabad", "Bangalore", "Kakinada"];

  const registeredCourseOptions = [
    "HR Business", "HR Generalist", "HR Analytics", "Spoken English", "Public Speaking",
    "Communication Skills", "Soft Skills", "Aptitude", "IELTS", "TOEFL", "GRE",
    "JFS", "PFS", "ERN", "AWS+DevOps", "Azure+DevOps", "Java Full-Stack", "Python Full-Stack"
  ];

  const techStackOptions = ["Life Skills", "Study Skills", "HR"];

  const batchTimingOptions = Array.from({ length: 15 }, (_, i) => `${i + 7}:00 - ${i + 8}:00`);

  const modeOfClassOptions = ["India Online", "Offline", "Hybrid"];

  const sourceOptions = ["Demo", "Website", "Referral", "Social Media"];

  const learnerStageOptions = ["New", "Upcoming", "Ongoing", "Onhold", "Completed"];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl h-full sm:h-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-teal-500">Learner Details: <span className="text-black mx-2">{learner.firstname} {learner.lastname}</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/** Personal Information Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Personal Information:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField('firstname', 'First Name')}
              {renderField('lastname', 'Last Name')}
              {renderField('email', 'Email')}
              {renderField('phone', 'Phone')}
              {renderField('alternatePhone', 'Alternate Phone')}
              {renderField('DOB', 'Date of Birth')}
              {renderField('location', 'Location', locationOptions)}
              {renderField('idProof', 'ID Proof')}
            </div>
          </div>

          {/** Course Information Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Course Information:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField('registeredCourse', 'Registered Course', registeredCourseOptions)}
              {renderField('techStack', 'Tech Stack', techStackOptions)}
              {renderField('batchId', 'Batch ID')}
              {renderField('batchTiming', 'Batch Timing', batchTimingOptions)}
              {renderField('modeOfClass', 'Mode of Class', modeOfClassOptions)}
              {renderField('preferableTime', 'Preferable Time')}
            </div>
          </div>

          {/** Lead Information Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Lead Information:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField('source', 'Source', sourceOptions)}
              {renderField('attendedDemo', 'Attended Demo', attendedDemoOptions)}
              {renderField('learnerStage', 'Learner Stage', learnerStageOptions)}
              {renderField('learnerOwner', 'Learner Owner')}
              {renderField('CounselingDoneBy', 'Counseling Done By')}
              {renderField('leadCreatedDate', 'Lead Created Date')}
            </div>
          </div>

          {/** Additional Information Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Additional Information:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField('registeredDate', 'Registered Date')}
              {renderField('exchangeRate', 'Exchange Rate')}
              {renderField('currency', 'Currency')}
              {renderField('slackAccess', 'Slack Access')}
              {renderField('lMSAccess', 'LMS Access')}
              {renderField('nextFollowUp', 'Next Follow Up')}
            </div>
          </div>

          {/** Description and Comments Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description and Comments:</h3>
            <div className="grid grid-cols-1 gap-4">
              {renderField('description', 'Description')}
              {renderField('courseComments', 'Course Comments')}
              {renderField('Comment', 'Additional Comments')}
            </div>
          </div>

          {/** Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Close
            </button>
            {isAnyFieldEditing && (
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Update Learner
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
