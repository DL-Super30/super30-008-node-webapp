"use client"

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../components/modalSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LeadUpdateModal() {
  const dispatch = useDispatch();
  const { isModalOpen, selectedLead } = useSelector((state) => state.modal);
  const [editingFields, setEditingFields] = useState({});
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
  });

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
      });
      setEditingFields({});
    }
  }, [selectedLead]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingFields[name]) {
      setLeadData({ ...leadData, [name]: name === 'feeQuoted' ? Number(value) : value });
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Function to handle full form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        toast.success('Lead updated successfully!', {
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
        toast.warn('Failed to update lead.', {
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
      console.error("Error updating lead:", error);
      toast.error('An error occurred while updating the lead.', {
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
      [fieldKey]: leadData[fieldKey]
    };

    try {
      const response = await fetch(`${API_BASE_URL}/leads/${selectedLead.id}`, {
        method: 'PATCH',
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

  const toggleEditing = (key) => {
    setEditingFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isAnyFieldEditing = Object.values(editingFields).some(value => value);

  if (!isModalOpen) {
    return null;
  }

  const renderField = (key, label, options = null) => (
    <div key={key} className="mb-4">
      <label htmlFor={key} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center mt-1">
        {options ? (
          <select
            id={key}
            name={key}
            value={leadData[key]}
            onChange={handleInputChange}
            disabled={!editingFields[key]}
            className={`w-full p-2 border rounded-md ${editingFields[key] ? 'border-teal-500' : 'bg-gray-100 border-gray-300'}`}
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={key === 'feeQuoted' ? 'number' : 'text'}
            id={key}
            name={key}
            value={leadData[key]}
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
              handlePatch(e, key);
            } else {
              toggleEditing(key);
            }
          }}
        >
          <span className="material-icons">
            {editingFields[key] ? 'save' : 'edit'}
          </span>
        </button>
      </div>
    </div>
  );

  const leadStatusOptions = ["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"];
  const leadSourceOptions = ["None", "Walk-In", "Student Referral", "Demo", "Website", "Website Chat", "Inbound Call", "Google Adverts", "Facebook Ads", "Google Business", "WhatsApp Skill Capital"];
  const courseOptions = ["HR Business Partner", "HR Generalist", "HR Analytics", "Spoken English", "Public Speaking", "Communication Skills", "Soft Skills", "Aptitude", "IELTS", "TOEFL", "GRE", "JFS", "PFS", "MERN", "AWS+DevOps", "Azure+DevOps", "Java Full Stack", "Python Full Stack"];
  const classModeOptions = ["International Online", "India Online", "BLR Classroom", "HYD Classroom"];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl h-full sm:h-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-teal-500">Lead Details: <span className="text-black mx-2">{leadData.leadname}</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField('leadname', 'Lead Name')}
            {renderField('email', 'Email')}
            {renderField('phone', 'Phone')}
            {renderField('feeQuoted', 'Fee Quoted')}
            {renderField('batchTiming', 'Batch Timing')}
            {renderField('leadStatus', 'Lead Status', leadStatusOptions)}
            {renderField('leadSource', 'Lead Source', leadSourceOptions)}
            {renderField('course', 'Course', courseOptions)}
            {renderField('selectedClassMode', 'Class Mode', classModeOptions)}
          </div>
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
                Update Lead
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}