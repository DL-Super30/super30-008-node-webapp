"use client";
import React from "react";
import { useState } from "react";

export default function Modal({ isOpen, onClose, type, addNewItem }) {
  const [leadsData, setLeadsData] = useState({
    id: Math.random(),
    name: "",
    leadStatus:"",
    cc:"",
    leadSource:"",
    phone: "",
    stack: "",
    email:"",
    course: "",
    fee:"",
    classMode:"",
    time:"",
    nextFollowUp:"",
    description:"",
   
  });

  const [oppurtunitiesData, setOppurtunitiesData] = useState({
    id: Math.random(),
    name: "",
    phone: "",
    stack: "",
    course: "",
    createdOn: "",
    createdOn: (new Date()).toDateString()
  });

  const [learnersData, setLearnersData] = useState({
    id: Math.random(),
    name: "",
    phone: "",
    stack: "",
    course: "",
    createdOn: "",
    createdOn: (new Date()).toDateString()
  });

  const [coursesData, setCoursesData] = useState({
    id: Math.random(),
    course: "",
    description: "",
    courseFee: "",
    createdOn: "",
    createdOn: (new Date()).toDateString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newItem;
    
    if (type === "leads") {
      newItem = { ...leadsData};
    } else if (type === "oppurtunities") {
      newItem = { ...oppurtunitiesData };
    } else if (type === "learners") {
      newItem = { ...learnersData };
    } else if (type === "courses") {
      newItem = { ...coursesData };
    }

    addNewItem(newItem);
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
   

    if (type === "leads") {
      setLeadsData({ ...leadsData, [name]: value });
    } else if (type === "opportunities") {
      setOppurtunitiesData({ ...oppurtunitiesData, [name]: value });
    } else if (type === "learners") {
      setLearnersData({ ...learnersData, [name]: value });
    } else if (type === "courses") {
      setCoursesData({ ...coursesData, [name]: value });
    }
  };


console.log('yes');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md shadow-lg w-4/5 h-4/5 overflow-y-auto mt-8">
        <h2 className="text-xl font-bold mb-4">{`Create ${type}`}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 ">
          {/* Form Fields for Leads */}
          {type === "leads" && (
            <>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">Name</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                  placeholder="Enter lead name"
                  value={leadsData.name}
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">Lead status</label>
                <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Lead status"
                  value={leadsData.leadStatus}
                  name="leadStatus"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Lead Status</option>
                    <option className="text-neutral-800" value="notContacted">Not Contacted</option>
                    <option className="text-neutral-800" value="attempted">Attempted</option>
                    <option className="text-neutral-800" value="warmLead">Warm Lead</option>
                    <option className="text-neutral-800" value="coldLead">Cold Lead</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">CC</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                  placeholder=""
                  value={leadsData.cc}
                  name="cc"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
              <label className="block text-base font-medium gap-2 text-gray-500">Lead Source</label>
              <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Lead source"
                  value={leadsData.leadSource}
                  name="leadSource"
                  onChange={handleChange}
                  required
                >
                  <option className="text-neutral-800" value="">Select Lead Source</option>
                  <option className="text-neutral-800" value="none">None</option>
                  <option className="text-neutral-800" value="walkIn">Walk In</option>
                  <option className="text-neutral-800" value="studentReferral">Student Referral</option>
                  <option className="text-neutral-800" value="demo">Demo</option>
                  <option className="text-neutral-800" value="webSite">WebSite</option>
                  <option className="text-neutral-800" value="websiteChat">Website Chat</option>
                  <option className="text-neutral-800" value="inboundCall">Inbound Call</option>
                  <option className="text-neutral-800" value="googleAdWords">Google AdWords</option>
                  <option className="text-neutral-800" value="facebookAds">Facebook Ads</option>
                  <option className="text-neutral-800" value="googleMyBusiness">Google My Business</option>
                  <option className="text-neutral-800" value="whatsAppSkillCapital">WhatsApp - Skill Capital</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded"
                  placeholder="Enter phone no."
                  value={leadsData.phone}
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
              <label className="block text-base font-medium gap-2 text-gray-500">Stack</label>
                <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Enter Stack"
                  value={leadsData.stack}
                  name="stack"
                  onChange={handleChange}
                  required
                >
                  <option className="text-neutral-800"value="">Select Stack</option>
                  <option className="text-neutral-800"value="lifeSkills">Life Skills</option>
                  <option className="text-neutral-800" value="studyAbroad">Study Abroad</option>
                  <option className="text-neutral-800" value="hr">HR</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded"
                  placeholder="Enter Email"
                  value={leadsData.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Course</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded"
                  placeholder="Enter Course"
                  value={leadsData.course}
                  name="course"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Fee Quoted</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded"
                  placeholder="Enter Fee quoted"
                  value={leadsData.fee}
                  name="fee"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">Class Mode</label>
                <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                  placeholder="Select class mode"
                  value={leadsData.classMode}
                  name="classMode"
                  onChange={handleChange}
                  required
                >
                    <option className="text-neutral-800"value="">Select Class Mode</option>
                    <option className="text-neutral-800"value="internationalOnline">International Online</option>
                    <option className="text-neutral-800"value="IndiaOnline">India Online</option>
                    <option className="text-neutral-800"value="blrClassRoom">BLR Class Room</option>
                    <option className="text-neutral-800"value="hydClassRoom">HYD Class Room</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Batch Timing
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded"
                  placeholder="Select timing"
                  value={leadsData.time}
                  name="time"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Next FollowUp
                </label>
                <input
                  type="datetime-local"
                  className="w-full border-b-2 border-gray-300 p-2 rounded"
                  placeholder="Select next followup"
                  value={leadsData.nextFollowUp}
                  name="nextFollowUp"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded"
                  placeholder="Description"
                  value={leadsData.description}
                  name="description"
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {/* Form Fields for Opportunities */}
          {type === "oppurtunities" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Opportunity Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter opportunity name"
                  value={oppurtunitiesData.name}
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter description"
                  value={oppurtunitiesData.name}
                onChange={handleChange}
                required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Opportunity Value
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter value"
                  value={oppurtunitiesData.name}
                onChange={handleChange}
                required
                />
              </div>
            </>
          )}

          {/* Form Fields for Learners */}
          {type === "learners" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Learner Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter learner name"
                  value={learnersData.name}
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter learner email"
                  value={learnersData.name}
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Course Enrolled
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter course"
                  value={learnersData.name}
                onChange={handleChange}
                required
                />
              </div>
            </>
          )}

          {/* Form Fields for Courses */}
          {type === "courses" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium">Course Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter course name"
                  name="course"
                  value={coursesData.courseFee}
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter course description"
                  value={coursesData.courseFee}
                onChange={handleChange}
                required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Course Fee</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter course fee"
                  value={coursesData.courseFee}
                onChange={handleChange}
                required
                />
              </div>
            </>
          )}
          </form>
          <div className="w-full text-center mt-4">
            <div className="flex justify-center gap-2">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded "
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded "
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        
      </div>
    </div>
  );
}
