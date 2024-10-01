"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function Modal({ isOpen, onClose, type, addNewItem }) {
  const [leadsData, setLeadsData] = useState({
    
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

  const [opportunitiesData, setOpportunitiesData] = useState({
    name: "",
    leadStatus: "",
    cc: "",
    leadSource: "",
    phone: "",
    stack: "",
    email: "",
    course: "",
    classMode: "",
    nextFollowUp: "",
    description: "",
    feeQuoted: "",
    batchTiming: "",
    opportunityStatus: "",
    opportunityStage: "",
    DemoAttendedStage: "",
    visitedStage: "",
    lostOpportunityReason: "",
  
  });

  const [learnersData, setLearnersData] = useState({
    
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
   
  });

  const [coursesData, setCoursesData] = useState({
    
    course: "",
    description: "",
    courseFee: "",
   
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newItem;
    
    if (type === "leads") {
      newItem = { ...leadsData};
    } else if (type === "opportunities") {
      newItem = { ...opportunitiesData };
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
      setOpportunitiesData({ ...opportunitiesData, [name]: value });
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
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold mb-4">{`Create ${type}`}</h2>
        <Image
              src="/images/cancel-icon.jpg"
              alt="cancel-icon"
              width={20}
              height={4}
              className="w-4 h-4 cursor-pointer"
              onClick={onClose}
            />
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 ">
          {/* Form Fields for Leads */}
          {type === "leads" && (
            <>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">Name</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
          {type === "opportunities" && (
            <>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
                  placeholder="Name"
                  value={opportunitiesData.name}
                  name="name"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">Opportunity Status</label>
                <select
                  className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                  placeholder="Visting"
                  value={opportunitiesData.opportunityStatus}
                  name="opportunityStatus"
                onChange={handleChange}
                required
                >
                  <option className="text-neutral-800"value="">Select Opportunity Status</option>
                  <option className="text-neutral-800"value="visiting">Visiting</option>
                  <option className="text-neutral-800" value="visited">Visited</option>
                  <option className="text-neutral-800" value="demoAttended">Demo Attended</option>
                  <option className="text-neutral-800" value="lostOpportunity">lost Opportunity</option>
                                  
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  CC
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
                  placeholder="CC"
                  value={opportunitiesData.cc}
                  name="cc"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Opportunity Stage
                </label>
                <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Select Opportunity Stage"
                  value={opportunitiesData.opportunityStage}
                  name="opportunityStage"
                onChange={handleChange}
                required
                >
                  <option className="text-neutral-800"value="">Select Opportunity Stage</option>
                  <option className="text-neutral-800"value="none">None</option>
                  <option className="text-neutral-800" value="advancedDiscussion">Advanced Discussion</option>
                  <option className="text-neutral-800" value="hrreadyToJoin">Ready To Join</option>
                  <option className="text-neutral-800"value="visiting">Visiting</option>
                  <option className="text-neutral-800"value="feesNegotiation">Fees Negotiation</option>
                  <option className="text-neutral-800" value="batchAllocation">Batch Allocation</option>
                  <option className="text-neutral-800" value="interestedInDemo">Interested in Demo</option>
                  <option className="text-neutral-800"value="needTimeThisWeek">Need Time This Week</option>
                  <option className="text-neutral-800"value="needTimeNextWeek">Need Time Next Week</option>
                  <option className="text-neutral-800" value="needTimeThisMonth">Need Time This Month</option>
                  <option className="text-neutral-800" value="needTimeNextMonth">Need Time Next Month</option>
                  <option className="text-neutral-800"value="specialRequirements">Special Requirements </option>
                  <option className="text-neutral-800"value="paymentLinkSent">Payment Link Sent</option>
                  <option className="text-neutral-800" value="closedWon">Closed won (Registered)</option>
                  <option className="text-neutral-800" value="Busy&AskedACallBack">Busy & Asked a call back</option>
                  <option className="text-neutral-800"value="closedlost">Closed Lost</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Phone"
                  value={opportunitiesData.phone}
                  name="phone"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                 Demo attended Stage
                </label>
                <select
                  type="number"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Demo Attended Stage"
                  value={opportunitiesData.DemoAttendedStage}
                  name="DemoAttendedStage"
                onChange={handleChange}
                required
                >
                  <option className="text-neutral-800"value="">Select Demo Attended Stage</option>
                  <option className="text-neutral-800"value="none">None</option>
                  <option className="text-neutral-800" value="advancedDiscussion">Advanced Discussion</option>
                  <option className="text-neutral-800" value="callNotAnswered">Call Not Answered</option>
                  <option className="text-neutral-800" value="hrreadyToJoin">Ready To Join</option>
                  <option className="text-neutral-800"value="visiting">Visiting</option>
                  <option className="text-neutral-800"value="feesNegotiation">Fees Negotiation</option>
                  <option className="text-neutral-800" value="batchAllocation">Batch Allocation</option>
                  <option className="text-neutral-800"value="needTimeThisWeek">Need Time This Week</option>
                  <option className="text-neutral-800"value="needTimeNextWeek">Need Time Next Week</option>
                  <option className="text-neutral-800" value="needTimeThisMonth">Need Time This Month</option>
                  <option className="text-neutral-800" value="needTimeNextMonth">Need Time Next Month</option>
                  <option className="text-neutral-800"value="specialRequirements">Special Requirements </option>
                  <option className="text-neutral-800" value="closedWon">Closed won (Registered)</option>
                  <option className="text-neutral-800"value="closedlost">Closed Lost (Cold Lead)</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Email"
                  value={opportunitiesData.email}
                  name="email"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Visited Stage
                </label>
                <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Visited stage"
                  value={opportunitiesData.visitedStage}
                  name="visitedStage"
                onChange={handleChange}
                required
                >
                   <option className="text-neutral-800"value="">Select Visited Stage</option>
                  <option className="text-neutral-800"value="none">None</option>
                  <option className="text-neutral-800" value="callNotAnswered">Call Not Answered</option>
                  <option className="text-neutral-800" value="hrreadyToJoin">Ready To Join</option>
                  <option className="text-neutral-800"value="feesNegotiation">Fees Negotiation</option>
                  <option className="text-neutral-800" value="batchAllocation">Batch Allocation</option>
                  <option className="text-neutral-800"value="interestedDemo">Interested Demo</option>
                  <option className="text-neutral-800"value="specialRequirements">Special Requirements </option>
                  <option className="text-neutral-800"value="needTimeThisWeek">Need Time This Week</option>
                  <option className="text-neutral-800"value="needTimeNextWeek">Need Time Next Week</option>
                  <option className="text-neutral-800" value="needTimeThisMonth">Need Time This Month</option>
                  <option className="text-neutral-800" value="needTimeNextMonth">Need Time Next Month</option>
                  <option className="text-neutral-800" value="closedWon">Closed won (Registered)</option>
                  <option className="text-neutral-800"value="closedlost">Closed Lost (Cold Lead)</option>
                  </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Fee Quoted
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Select Fee Quoted"
                  value={opportunitiesData.feeQuoted}
                  name="feeQuoted"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Lost Opportunity Reason
                </label>
                <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Lost Opportunity Reason"
                  value={opportunitiesData.lostOpportunityReason}
                  name="lostOpportunityReason"
                onChange={handleChange}
                required
                >
                  <option className="text-neutral-800"value="">Select Lost Opportunity Reason</option>
                  <option className="text-neutral-800"value="none">None</option>
                  <option className="text-neutral-800" value="invalidNumber">Invalid Number</option>
                  <option className="text-neutral-800" value="notInterested">Not Interested</option>
                  <option className="text-neutral-800"value="joinedAnotherInstitute">Joined Another Institute</option>
                  <option className="text-neutral-800" value="askingFreeCourse">Asking Free Course</option>
                  <option className="text-neutral-800"value="payAfterPlacement">Pay After Placement</option>
                  </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Batch Timing
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Batch Timing"
                  value={opportunitiesData.batchTiming}
                  name="batchTiming"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Next FollowUp
                </label>
                <input
                  type="datetime-local"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Next Follow Up"
                  value={opportunitiesData.nextFollowUp}
                  name="nextFollowUp"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Lead Status
                </label>
                <select
                  type=""
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Lead Status"
                  value={opportunitiesData.leadStatus}
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
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Lead Source
                </label>
                <select
                  type="number"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="CC"
                  value={opportunitiesData.leadSource}
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
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Stack
                </label>
                <select
                  type="number"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Stack"
                  value={opportunitiesData.stack}
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
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Course
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="course"
                  value={opportunitiesData.course}
                  name="course"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                 Class Mode
                </label>
                <select
                  type="number"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                  placeholder="Select class mode"
                  value={opportunitiesData.classMode}
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
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Description"
                  value={opportunitiesData.description}
                  name="description"
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
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="First Name"
                  value={learnersData.firstname}
                  name="firstname"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">Last Name</label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Last Name"
                  value={learnersData.lastname}
                  name="lastname"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Id Proof
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Id Proof"
                  value={learnersData.idProof}
                  name="idProof"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Phone"
                  value={learnersData.phone}
                  name="phone"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  DOB
                </label>
                <input
                  type="date"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="DOB"
                  value={learnersData.DOB}
                  name="DOB"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Email"
                  value={learnersData.email}
                  name="email"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Registered Date
                </label>
                <input
                  type="date"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="registered Date"
                  value={learnersData.registeredDate}
                  name="registeredDate"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Location
                </label>
                <select
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                  placeholder="Location"
                  value={learnersData.location}
                  name="location"
                onChange={handleChange}
                required
                ><option className="text-neutral-800"value="">Select Location</option>
                <option className="text-neutral-800"value="hyderabad">Hyderabad</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Batch Id&apos;s
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Batch Id"
                  value={learnersData.batchId}
                  name="batchId"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Alternate Phone
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Alternate Phone"
                  value={learnersData.alternatePhone}
                  name="alternatePhone"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Description"
                  value={learnersData.description}
                  name="description"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Exchange Rate
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Exchange Rate"
                  value={learnersData.exchangeRate}
                  name="exchangeRate"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Source
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Source"
                  value={learnersData.source}
                  name="source"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Attended Demo
                </label>
                <select
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                  placeholder="Attended Demo"
                  value={learnersData.attendedDemo}
                  name="attendedDemo"
                onChange={handleChange}
                required
                >
                  <option className="text-neutral-800"value="">Select Attended Demo</option>
                  <option className="text-neutral-800"value="none">None</option>
                <option className="text-neutral-800"value="advancedDiscussion">Advanced Discussion</option>
                <option className="text-neutral-800"value="readyToJoin">Ready To Join</option>
                <option className="text-neutral-800"value="callNotAnswered">Call Not Answered</option>
                <option className="text-neutral-800"value="visiting">Visiting</option>
                <option className="text-neutral-800"value="feesNegotiation">Fees Negotiation</option>
                <option className="text-neutral-800"value="batchAllocation">Batch Allocation</option>
                <option className="text-neutral-800"value="needTimeThisWeek">Need Time This Week</option>
                <option className="text-neutral-800"value="needTimeNextWeek">Need Time Next Week</option>
                <option className="text-neutral-800"value="needTimeThisMonth">Need Time This Month</option>
                <option className="text-neutral-800"value="needTimeNextMonth">Need Time Next Month</option>
                <option className="text-neutral-800"value="specialRequirements">Special Requirements</option>
                <option className="text-neutral-800"value="closedWon">Closed Won (Registered)</option>
                <option className="text-neutral-800"value="closedLost">Closed Lost (ColdLead)</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Learner Owner
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Learner Owner"
                  value={learnersData.learnerOwner}
                  name="learnerOwner"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Learner Stage
                </label>
                <select
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                  placeholder="learner Stage"
                  value={learnersData.learnerStage}
                  name="learnerStage"
                onChange={handleChange}
                required
                >
                  <option className="text-neutral-800"value="">Select Learner Stage</option>
                  <option className="text-neutral-800"value="upcoming">Upcoming</option>
                  <option className="text-neutral-800"value="ongoing">Ongoing</option>
                  <option className="text-neutral-800"value="onHold">On Hold</option>
                  <option className="text-neutral-800"value="completed">Completed</option>
                
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Currency
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Currency"
                  value={learnersData.currency}
                  name="currency"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Lead Created Date
                </label>
                <input
                  type="date"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="lead Created Date"
                  value={learnersData.leadCreatedDate}
                  name="leadCreatedDate"
                onChange={handleChange}
                required
                />
              </div>              
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Counselling Done By
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Counselling Done By"
                  value={learnersData.CounselingDoneBy}
                  name="CounselingDoneBy"
                onChange={handleChange}
                required
                />
              </div> 
              <br/>
              <h1 className="font-bold text2xl">Course Details</h1> 
              <br/>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Registered Course
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Registered Course"
                  value={learnersData.registeredCourse}
                  name="registeredCourse"
                onChange={handleChange}
                required
                />
              </div>  
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Preferable Time
                </label>
                <input
                  type="time"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Preferable Time"
                  value={learnersData.preferableTime}
                  name="preferableTime"
                onChange={handleChange}
                required
                />
              </div> 
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Tech Stack
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Tech Stack"
                  value={learnersData.techStack}
                  name="techStack"
                onChange={handleChange}
                required
                />
              </div> 
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Batch Timing
                </label>
                <input
                  type="datet"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Batch Timing"
                  value={learnersData.batchTiming}
                  name="batchTiming"
                onChange={handleChange}
                required
                /> 
                </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Course Comments
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Course Comments"
                  value={learnersData.courseComments}
                  name="courseComments"
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-500">
                  Mode Of Class
                </label>
                <select
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                  placeholder="Mode of Class"
                  value={learnersData.modeOfClass}
                  name="modeOfClass"
                onChange={handleChange}
                required
                >
                  option<option className="text-neutral-800"value="indiaOnline">India online</option>
                  option<option className="text-neutral-800"value="internationalOnline">Internationalonline</option>
                </select>
              </div>   
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Slack Access
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Slack Access"
                  value={learnersData.slackAccess}
                  name="slackAccess"
                onChange={handleChange}
                required
                />
              </div> 
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  Comment
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Comment"
                  value={learnersData.Comment}
                  name="Comment"
                onChange={handleChange}
                required
                />
              </div> 
              <div className="mb-4">
                <label className="block text-base font-medium gap-2 text-gray-800 ">
                  LMS Access
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="LMS Access"
                  value={learnersData.lMSAccess}
                  name="lMSAccess"
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
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none"
                  placeholder="Enter course name"
                  name="courseName"
                  value={coursesData.courseName}
                onChange={handleChange}
                required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
                  placeholder="Enter course description"
                  value={coursesData.description}
                onChange={handleChange}
                required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Course Fee</label>
                <input
                  type="number"
                  className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium focus-visible:outline-none "
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
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer "
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
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
