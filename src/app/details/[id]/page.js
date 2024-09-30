"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { convertLeadsApi, getLeadsApi, updateLeadsApi } from "@/slices/leadsSlice";

const DetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const queryParams = useSearchParams();
  const type = queryParams.get("type");
  const [item, setItem] = useState(null);
  const dataList = useSelector((state) => state.leads.leads);
  const dispatch = useDispatch();

  console.log(params, queryParams.get("type"));

  useEffect(() => {
    if (!type || !params.id) return;

    dispatch(getLeadsApi());
  }, [type, params.id]);

  useEffect(() => {
    const foundItem = dataList.find((data) => data.id === Number(params.id));
    console.log(foundItem);
    const itemNeedToBeAdded = {};
    if (foundItem) {
      console.log(foundItem, "foundItem");
      Object.keys(foundItem).forEach((key) => {
        itemNeedToBeAdded[key] = { value: foundItem[key], editEnabled: false };
      });
    }

    setItem(itemNeedToBeAdded);
  }, [dataList]);

  const handleBack = () => {
    router.back(); // This will navigate back to the previous page
  };

  const enableEditable = (key) => {
    if (!item[key]) {
      item[key] = {};
    }
    item[key].editEnabled = true;
    setItem({ ...item });
  };

  const saveDetails = (key) => {
    const itemInfo = {
      [key]: item[key]?.value,
    };
    console.log(itemInfo);
    item[key].editEnabled = false;
    setItem({ ...item });
    dispatch(updateLeadsApi({ itemInfo, id: params.id }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    item[name].value = value;
    setItem({ ...item });
  };

  const handleConvertLeadToOpportunity = () => {
    console.log('convert');
    dispatch(convertLeadsApi(params.id));
    handleBack();
  }

  if (!item) return;

  return (
    <div className="">
      {type === "leads" && (
        <>
          <div className="flex flex-col mx-3">
            <div className="pt-3 px-3 shadow-lg shadow-gray-200 fixed w-full h-32 bg-white z-10 items-center">
              <div className="flex justify-between mx-2 border-b-2 pb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="flex font-medium cursor-pointer"
                    onClick={handleBack}
                  >
                    <Image
                      src="/images/backarrow.png"
                      alt="backarrow-icon"
                      width={30}
                      height={20}
                    />
                    <span>Back</span>
                  </div>
                  <Image
                    src="/images/employee_contact.svg"
                    alt="contact-icon"
                    width={40}
                    height={30}
                  />
                  <h1 className="flex items-center font-semibold text-xl gap-2 text-black-500">
                    {item?.leadname?.value}
                  </h1>
                </div>

                <div className="mx-3 ">
                  <button className="text-base bg-cyan-500 text-center px-3 py-1 border rounded-md" onClick={() => handleConvertLeadToOpportunity()}>
                    Convert
                  </button>
                </div>
              </div>

              <div className="flex justify-between mx-5 mt-2">
                <div className="gap-1">
                  <h1>Lead Source</h1>
                  <p className="text-sky-700">{item?.leadSource?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Phone</h1>
                  <p className="text-sky-700">{item?.phone?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Email</h1>
                  <p className="text-sky-700">{item?.email?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Lead Status</h1>
                  <p className="text-green-700">{item?.leadStatus?.value}</p>
                </div>
              </div>
            </div>

            <div className="mt-40 pt-3 px-3 shadow-lg shadow-gray-400">
              <div className="w-full border-b-2 p-2">
                <ul className="flex items-center justify-between w-1/2">
                  <li>
                    <a href="#leadsDetails">Details</a>
                  </li>
                  <li>
                    <a href="#leadsActivity">Activity</a>
                  </li>
                  <li>
                    <a href="#leadsNotes">Notes</a>
                  </li>
                  <li>
                    <a href="#leadsAskAI">Ask AI</a>
                  </li>
                </ul>
              </div>

              <div id="#leadsDetails">
                <div className="grid grid-cols-2 gap-4 px-3">
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      Name
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium "
                        placeholder=""
                        value={item.leadname?.value}
                        onChange={(e) => handleChange(e)}
                        disabled={!item.leadname?.editEnabled}
                        name="leadname"
                      />
                      {!item.leadname?.editEnabled && (
                        <button onClick={() => enableEditable("leadname")}>
                          <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                      {item.leadname?.editEnabled && (
                        <button onClick={() => saveDetails("leadname")}>
                          <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Lead status
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder=""
                      value={item.leadStatus?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.leadStatus?.editEnabled}
                      name="leadStatus"
                    >
                      <option value="">Select Lead Status</option>
                      <option className="text-neutral-800" value="notContacted">
                        Not Contacted
                      </option>
                      <option className="text-neutral-800" value="attempted">
                        Attempted
                      </option>
                      <option className="text-neutral-800" value="warmLead">
                        Warm Lead
                      </option>
                      <option className="text-neutral-800" value="coldLead">
                        Cold Lead
                      </option>
                    </select>
                    {!item.leadStatus?.editEnabled && (
                      <button onClick={() => enableEditable("leadStatus")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.leadStatus?.editEnabled && (
                      <button onClick={() => saveDetails("leadStatus")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      CC
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder=""
                      value={item.cc?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.cc?.editEnabled}
                      name="cc"
                    />
                    {!item.cc?.editEnabled && (
                      <button onClick={() => enableEditable("cc")}> <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}
                    {item.cc?.editEnabled && (
                      <button onClick={() => saveDetails("cc")}> <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Lead Source
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder="Lead source"
                      value={item.leadSource?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.leadSource?.editEnabled}
                      name="leadSource"
                    >
                      <option className="text-neutral-800" value="">
                        Select Lead Source
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option className="text-neutral-800" value="walkIn">
                        Walk In
                      </option>
                      <option
                        className="text-neutral-800"
                        value="studentReferral"
                      >
                        Student Referral
                      </option>
                      <option className="text-neutral-800" value="demo">
                        Demo
                      </option>
                      <option className="text-neutral-800" value="webSite">
                        WebSite
                      </option>
                      <option className="text-neutral-800" value="websiteChat">
                        Website Chat
                      </option>
                      <option className="text-neutral-800" value="inboundCall">
                        Inbound Call
                      </option>
                      <option
                        className="text-neutral-800"
                        value="googleAdWords"
                      >
                        Google AdWords
                      </option>
                      <option className="text-neutral-800" value="facebookAds">
                        Facebook Ads
                      </option>
                      <option
                        className="text-neutral-800"
                        value="googleMyBusiness"
                      >
                        Google My Business
                      </option>
                      <option
                        className="text-neutral-800"
                        value="whatsAppSkillCapital"
                      >
                        WhatsApp - Skill Capital
                      </option>
                    </select>
                    {!item.leadSource?.editEnabled && (
                      <button onClick={() => enableEditable("leadSource")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.leadSource?.editEnabled && (
                      <button onClick={() => saveDetails("leadSource")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Phone</label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter phone no."
                      value={item.phone?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.phone?.editEnabled}
                      name="phone"
                    />
                    {!item.phone?.editEnabled && (
                      <button onClick={() => enableEditable("phone")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.phone?.editEnabled && (
                      <button onClick={() => saveDetails("phone")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Stack
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder="Enter Stack"
                      value={item.stack?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.stack?.editEnabled}
                      name="stack"
                    >
                      <option className="text-neutral-800" value="">
                        Select Stack
                      </option>
                      <option className="text-neutral-800" value="lifeSkills">
                        Life Skills
                      </option>
                      <option className="text-neutral-800" value="studyAbroad">
                        Study Abroad
                      </option>
                      <option className="text-neutral-800" value="hr">
                        HR
                      </option>
                    </select>
                    {!item.stack?.editEnabled && (
                      <button onClick={() => enableEditable("stack")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.stack?.editEnabled && (
                      <button onClick={() => saveDetails("stack")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Email"
                      value={item.email?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.email?.editEnabled}
                      name="email"
                    />
                    {!item.email?.editEnabled && (
                      <button onClick={() => enableEditable("email")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.email?.editEnabled && (
                      <button onClick={() => saveDetails("email")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Course</label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Course"
                      value={item.course?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.course?.editEnabled}
                      name="course"
                    />
                    {!item.course?.editEnabled && (
                      <button onClick={() => enableEditable("course")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.course?.editEnabled && (
                      <button onClick={() => saveDetails("course")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Fee Quoted
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Fee quoted"
                      value={item.feeQuoted?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.feeQuoted?.editEnabled}
                      name="feeQuoted"
                    />
                    {!item.feeQuoted?.editEnabled && (
                      <button onClick={() => enableEditable("feeQuoted")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.feeQuoted?.editEnabled && (
                      <button onClick={() => saveDetails("feeQuoted")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Class Mode
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder="Select class mode"
                      value={item.selectedClassMode?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.selectedClassMode?.editEnabled}
                      name="selectedClassMode"
                    >
                      <option className="text-neutral-800" value="">
                        Select Class Mode
                      </option>
                      <option
                        className="text-neutral-800"
                        value="internationalOnline"
                      >
                        International Online
                      </option>
                      <option className="text-neutral-800" value="IndiaOnline">
                        India Online
                      </option>
                      <option className="text-neutral-800" value="blrClassRoom">
                        BLR Class Room
                      </option>
                      <option className="text-neutral-800" value="hydClassRoom">
                        HYD Class Room
                      </option>
                    </select>
                    {!item.selectedClassMode?.editEnabled && (
                      <button
                        onClick={() => enableEditable("selectedClassMode")}
                      >
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.selectedClassMode?.editEnabled && (
                      <button onClick={() => saveDetails("selectedClassMode")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Batch Timing
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Select timing"
                      value={item.batchTiming?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.batchTiming?.editEnabled}
                      name="batchTiming"
                    />
                    {!item.batchTiming?.editEnabled && (
                      <button onClick={() => enableEditable("batchTiming")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.batchTiming?.editEnabled && (
                      <button onClick={() => saveDetails("batchTiming")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Next FollowUp
                    </label>
                    <div className="flex">
                    <input
                      type="datetime-local"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Select next followup"
                      value={item.nextFollowUp?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.nextFollowUp?.editEnabled}
                      name="nextFollowUp"
                    />
                    {!item.nextFollowUp?.editEnabled && (
                      <button onClick={() => enableEditable("nextFollowUp")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.nextFollowUp?.editEnabled && (
                      <button onClick={() => saveDetails("nextFollowUp")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Description"
                      value={item.description?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.description?.editEnabled}
                      name="description"
                    />
                    {!item.description?.editEnabled && (
                      <button onClick={() => enableEditable("description")}>
                        {" "}
                        <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.description?.editEnabled && (
                      <button onClick={() => saveDetails("description")}>
                        <Image
                          src="/images/save-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "opportunities" && (
        <>
          <div className="flex flex-col mx-3">
            <div className="pt-3 px-3 shadow-lg shadow-gray-200 fixed w-full h-32 bg-white z-10 items-center">
              <div className="flex justify-between mx-2 border-b-2 pb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="flex font-medium cursor-pointer"
                    onClick={handleBack}
                  >
                    <Image
                      src="/images/backarrow.png"
                      alt="backarrow-icon"
                      width={30}
                      height={20}
                    />
                    <span>Back</span>
                  </div>
                  <Image
                    src="/images/employee_contact.svg"
                    alt="contact-icon"
                    width={40}
                    height={30}
                  />
                  <h1 className="flex items-center font-semibold text-xl gap-2 text-black-500">
                    {item?.name?.value}
                  </h1>
                </div>

                <div className="mx-3 ">
                  <button className="text-base bg-cyan-500 text-center px-3 py-1 border rounded-md">
                    Convert
                  </button>
                </div>
              </div>

              <div className="flex justify-between mx-5 mt-2">
                <div className="gap-1">
                  <h1>Lead Source</h1>
                  <p className="text-sky-700">{item?.leadSource?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Phone</h1>
                  <p className="text-sky-700">{item?.phone?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Email</h1>
                  <p className="text-sky-700">{item?.email?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Opportunity Status</h1>
                  <p className="text-green-700">{item?.opportunityStatus?.value}</p>
                </div>
              </div>
            </div>

            <div className="mt-40 pt-3 px-3 shadow-lg shadow-gray-400">
              <div className="w-full border-b-2 p-2">
                <ul className="flex items-center justify-between w-1/2">
                  <li>
                    <a href="#opportunitiesDetails">Details</a>
                  </li>
                  <li>
                    <a href="#opportunitiesActivity">Activity</a>
                  </li>
                  <li>
                    <a href="#opportunitiesNotes">Notes</a>
                  </li>
                  <li>
                    <a href="#opportunitiesAskAI">Ask AI</a>
                  </li>
                </ul>
              </div>

              <div id="#opportunitiesDetails">
                <div className="grid grid-cols-2 gap-4 px-3">
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      Name
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder="Enter name"
                      value={item.name?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.name?.editEnabled}
                      name="name"
                    />
                    {!item.name?.editEnabled && (
                      <button onClick={() => enableEditable("name")}>
                         <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.name?.editEnabled && (
                      <button onClick={() => saveDetails("name")}> <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Opportunity Status
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder="Lead status"
                      value={item.opportunityStatus?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.opportunityStatus?.editEnabled}
                      name="opportunityStatus"
                    >
                      <option className="text-neutral-800" value="">
                        Select Opportunity Status
                      </option>
                      <option className="text-neutral-800" value="visiting">
                        Visiting
                      </option>
                      <option className="text-neutral-800" value="visited">
                        Visited
                      </option>
                      <option className="text-neutral-800" value="demoAttended">
                        Demo Attended
                      </option>
                      <option
                        className="text-neutral-800"
                        value="lostOpportunity"
                      >
                        lost Opportunity
                      </option>
                    </select>
                    {!item.opportunityStatus?.editEnabled && (
                      <button
                        onClick={() => enableEditable("opportunityStatus")}
                      >
                         <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.opportunityStatus?.editEnabled && (
                      <button onClick={() => saveDetails("opportunityStatus")}>
                         <Image
                          src="/images/save-icon.png"
                          alt="save-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      CC
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder=""
                      value={item.cc?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.cc?.editEnabled}
                      name="cc"
                    />
                    {!item.cc?.editEnabled && (
                      <button onClick={() => enableEditable("cc")}>Edit</button>
                    )}
                    {item.cc?.editEnabled && (
                      <button onClick={() => saveDetails("cc")}>Save</button>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Opportunity Stage
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder=""
                      value={item.opportunityStage?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.opportunityStage?.editEnabled}
                      name="opportunityStage"
                    >
                      <option className="text-neutral-800" value="">
                        Select Opportunity Stage
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option
                        className="text-neutral-800"
                        value="advancedDiscussion"
                      >
                        Advanced Discussion
                      </option>
                      <option
                        className="text-neutral-800"
                        value="hrreadyToJoin"
                      >
                        Ready To Join
                      </option>
                      <option className="text-neutral-800" value="visiting">
                        Visiting
                      </option>
                      <option
                        className="text-neutral-800"
                        value="feesNegotiation"
                      >
                        Fees Negotiation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="batchAllocation"
                      >
                        Batch Allocation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="interestedInDemo"
                      >
                        Interested in Demo
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisWeek"
                      >
                        Need Time This Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextWeek"
                      >
                        Need Time Next Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisMonth"
                      >
                        Need Time This Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextMonth"
                      >
                        Need Time Next Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="specialRequirements"
                      >
                        Special Requirements{" "}
                      </option>
                      <option
                        className="text-neutral-800"
                        value="paymentLinkSent"
                      >
                        Payment Link Sent
                      </option>
                      <option className="text-neutral-800" value="closedWon">
                        Closed won (Registered)
                      </option>
                      <option
                        className="text-neutral-800"
                        value="Busy&AskedACallBack"
                      >
                        Busy & Asked a call back
                      </option>
                      <option className="text-neutral-800" value="closedlost">
                        Closed Lost
                      </option>
                    </select>
                    {!item.opportunityStage?.editEnabled && (
                      <button
                        onClick={() => enableEditable("opportunityStage")}
                      >
                         <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.opportunityStage?.editEnabled && (
                      <button onClick={() => saveDetails("opportunityStage")}>
                          <Image
                          src="/images/save-icon.png"
                          alt="save-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Phone</label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.phone?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.phone?.editEnabled}
                      name="phone"
                    />
                    {!item.phone?.editEnabled && (
                      <button onClick={() => enableEditable("phone")}>
                         <Image
                          src="/images/edit-icon.png"
                          alt="edit-icon"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {item.phone?.editEnabled && (
                      <button onClick={() => saveDetails("phone")}> <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Demo attended Stage
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder=""
                      value={item.DemoAttendedStage?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.DemoAttendedStage?.editEnabled}
                      name="DemoAttendedStage"
                    >
                      <option className="text-neutral-800" value="">
                        Select Demo Attended Stage
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option
                        className="text-neutral-800"
                        value="advancedDiscussion"
                      >
                        Advanced Discussion
                      </option>
                      <option
                        className="text-neutral-800"
                        value="callNotAnswered"
                      >
                        Call Not Answered
                      </option>
                      <option
                        className="text-neutral-800"
                        value="hrreadyToJoin"
                      >
                        Ready To Join
                      </option>
                      <option className="text-neutral-800" value="visiting">
                        Visiting
                      </option>
                      <option
                        className="text-neutral-800"
                        value="feesNegotiation"
                      >
                        Fees Negotiation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="batchAllocation"
                      >
                        Batch Allocation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisWeek"
                      >
                        Need Time This Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextWeek"
                      >
                        Need Time Next Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisMonth"
                      >
                        Need Time This Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextMonth"
                      >
                        Need Time Next Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="specialRequirements"
                      >
                        Special Requirements{" "}
                      </option>
                      <option className="text-neutral-800" value="closedWon">
                        Closed won (Registered)
                      </option>
                      <option className="text-neutral-800" value="closedlost">
                        Closed Lost (Cold Lead)
                      </option>
                    </select>
                    {!item.DemoAttendedStage?.editEnabled && (
                      <button
                        onClick={() => enableEditable("DemoAttendedStage")}
                      >
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                    {item.DemoAttendedStage?.editEnabled && (
                      <button onClick={() => saveDetails("DemoAttendedStage")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Email"
                      value={item.email?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.email?.editEnabled}
                      name="email"
                    />
                    {!item.email?.editEnabled && (
                      <button onClick={() => enableEditable("email")}>
                         <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.email?.editEnabled && (
                      <button onClick={() => saveDetails("email")}> <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Visited Stage
                    </label>
                    <div className="flex">
                    <select
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.visitedStage?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.visitedStage?.editEnabled}
                      name="visitedStage"
                    >
                      <option className="text-neutral-800" value="">
                        Select Visited Stage
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option
                        className="text-neutral-800"
                        value="callNotAnswered"
                      >
                        Call Not Answered
                      </option>
                      <option
                        className="text-neutral-800"
                        value="hrreadyToJoin"
                      >
                        Ready To Join
                      </option>
                      <option
                        className="text-neutral-800"
                        value="feesNegotiation"
                      >
                        Fees Negotiation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="batchAllocation"
                      >
                        Batch Allocation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="interestedDemo"
                      >
                        Interested Demo
                      </option>
                      <option
                        className="text-neutral-800"
                        value="specialRequirements"
                      >
                        Special Requirements{" "}
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisWeek"
                      >
                        Need Time This Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextWeek"
                      >
                        Need Time Next Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisMonth"
                      >
                        Need Time This Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextMonth"
                      >
                        Need Time Next Month
                      </option>
                      <option className="text-neutral-800" value="closedWon">
                        Closed won (Registered)
                      </option>
                      <option className="text-neutral-800" value="closedlost">
                        Closed Lost (Cold Lead)
                      </option>
                    </select>
                    {!item.visitedStage?.editEnabled && (
                      <button onClick={() => enableEditable("visitedStage")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.visitedStage?.editEnabled && (
                      <button onClick={() => saveDetails("visitedStage")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Fee Quoted
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.feeQuoted?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.feeQuoted?.editEnabled}
                      name="feeQuoted"
                    />
                    {!item.feeQuoted?.editEnabled && (
                      <button onClick={() => enableEditable("feeQuoted")}>
                       <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.feeQuoted?.editEnabled && (
                      <button onClick={() => saveDetails("feeQuoted")}>
                      <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Lost Opportunity Reason
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.lostOpportunityReason?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.lostOpportunityReason?.editEnabled}
                      name="lostOpportunityReason"
                    >
                      <option className="text-neutral-800" value="">
                        Select Lost Opportunity Reason
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option
                        className="text-neutral-800"
                        value="invalidNumber"
                      >
                        Invalid Number
                      </option>
                      <option
                        className="text-neutral-800"
                        value="notInterested"
                      >
                        Not Interested
                      </option>
                      <option
                        className="text-neutral-800"
                        value="joinedAnotherInstitute"
                      >
                        Joined Another Institute
                      </option>
                      <option
                        className="text-neutral-800"
                        value="askingFreeCourse"
                      >
                        Asking Free Course
                      </option>
                      <option
                        className="text-neutral-800"
                        value="payAfterPlacement"
                      >
                        Pay After Placement
                      </option>
                    </select>
                    {!item.lostOpportunityReason?.editEnabled && (
                      <button
                        onClick={() => enableEditable("lostOpportunityReason")}
                      >
                       <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.lostOpportunityReason?.editEnabled && (
                      <button
                        onClick={() => saveDetails("lostOpportunityReason")}
                      >
                       <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Batch Timing
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.batchTiming?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.batchTiming?.editEnabled}
                      name="batchTiming"
                    />
                    {!item.batchTiming?.editEnabled && (
                      <button onClick={() => enableEditable("batchTiming")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.batchTiming?.editEnabled && (
                      <button onClick={() => saveDetails("batchTiming")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Next FollowUp
                    </label>
                    <div className="flex">
                    <input
                      type="datetime-local"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.nextFollowUp?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.nextFollowUp?.editEnabled}
                      name="nextFollowUp"
                    />
                    {!item.nextFollowUp?.editEnabled && (
                      <button onClick={() => enableEditable("nextFollowUp")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.nextFollowUp?.editEnabled && (
                      <button onClick={() => saveDetails("nextFollowUp")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Lead Status
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.leadStatus?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.leadStatus?.editEnabled}
                      name="leadStatus"
                    >
                      <option value="">Select Lead Status</option>
                      <option className="text-neutral-800" value="notContacted">
                        Not Contacted
                      </option>
                      <option className="text-neutral-800" value="attempted">
                        Attempted
                      </option>
                      <option className="text-neutral-800" value="warmLead">
                        Warm Lead
                      </option>
                      <option className="text-neutral-800" value="coldLead">
                        Cold Lead
                      </option>
                    </select>
                    {!item.leadStatus?.editEnabled && (
                      <button onClick={() => enableEditable("leadStatus")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.leadStatus?.editEnabled && (
                      <button onClick={() => saveDetails("leadStatus")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Lead Source
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.leadSource?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.leadSource?.editEnabled}
                      name="leadSource"
                    >
                      <option className="text-neutral-800" value="">
                        Select Lead Source
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option className="text-neutral-800" value="walkIn">
                        Walk In
                      </option>
                      <option
                        className="text-neutral-800"
                        value="studentReferral"
                      >
                        Student Referral
                      </option>
                      <option className="text-neutral-800" value="demo">
                        Demo
                      </option>
                      <option className="text-neutral-800" value="webSite">
                        WebSite
                      </option>
                      <option className="text-neutral-800" value="websiteChat">
                        Website Chat
                      </option>
                      <option className="text-neutral-800" value="inboundCall">
                        Inbound Call
                      </option>
                      <option
                        className="text-neutral-800"
                        value="googleAdWords"
                      >
                        Google AdWords
                      </option>
                      <option className="text-neutral-800" value="facebookAds">
                        Facebook Ads
                      </option>
                      <option
                        className="text-neutral-800"
                        value="googleMyBusiness"
                      >
                        Google My Business
                      </option>
                      <option
                        className="text-neutral-800"
                        value="whatsAppSkillCapital"
                      >
                        WhatsApp - Skill Capital
                      </option>
                    </select>
                    {!item.leadSource?.editEnabled && (
                      <button onClick={() => enableEditable("leadSource")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.leadSource?.editEnabled && (
                      <button onClick={() => saveDetails("leadSource")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Stack
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.stack?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.stack?.editEnabled}
                      name="stack"
                    >
                      <option className="text-neutral-800" value="">
                        Select Stack
                      </option>
                      <option className="text-neutral-800" value="lifeSkills">
                        Life Skills
                      </option>
                      <option className="text-neutral-800" value="studyAbroad">
                        Study Abroad
                      </option>
                      <option className="text-neutral-800" value="hr">
                        HR
                      </option>
                    </select>
                    {!item.stack?.editEnabled && (
                      <button onClick={() => enableEditable("stack")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.stack?.editEnabled && (
                      <button onClick={() => saveDetails("stack")}><Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Course
                    </label>
                    <div>
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.course?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.course?.editEnabled}
                      name="course"
                    />
                    {!item.course?.editEnabled && (
                      <button onClick={() => enableEditable("course")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.course?.editEnabled && (
                      <button onClick={() => saveDetails("course")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Class Mode
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.classMode?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.classMode?.editEnabled}
                      name="classMode"
                    >
                      <option className="text-neutral-800" value="">
                        Select Class Mode
                      </option>
                      <option
                        className="text-neutral-800"
                        value="internationalOnline"
                      >
                        International Online
                      </option>
                      <option className="text-neutral-800" value="IndiaOnline">
                        India Online
                      </option>
                      <option className="text-neutral-800" value="blrClassRoom">
                        BLR Class Room
                      </option>
                      <option className="text-neutral-800" value="hydClassRoom">
                        HYD Class Room
                      </option>
                    </select>
                    {!item.classMode?.editEnabled && (
                      <button onClick={() => enableEditable("classMode")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.classMode?.editEnabled && (
                      <button onClick={() => saveDetails("classMode")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.description?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.description?.editEnabled}
                      name="description"
                    />
                    {!item.description?.editEnabled && (
                      <button onClick={() => enableEditable("description")}>
                        <Image
                      src="/images/edit-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}
                    {item.description?.editEnabled && (
                      <button onClick={() => saveDetails("description")}>
                        <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    />
                      </button>
                    )}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "learners" && (
        <>
          <div className="flex flex-col mx-3">
            <div className="pt-3 px-3 shadow-lg shadow-gray-200 fixed w-full h-32 bg-white z-10 items-center">
              <div className="flex justify-between mx-2 border-b-2 pb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="flex font-medium cursor-pointer"
                    onClick={handleBack}
                  >
                    <Image
                      src="/images/backarrow.png"
                      alt="backarrow-icon"
                      width={30}
                      height={20}
                    />
                    <span>Back</span>
                  </div>
                  <Image
                    src="/images/employee_contact.svg"
                    alt="contact-icon"
                    width={40}
                    height={30}
                  />
                  <h1 className="flex items-center font-semibold text-xl gap-2 text-black-500">
                    {item?.lastname?.value}
                  </h1>
                </div>

                <div className="mx-3 ">
                  <button className="text-base bg-cyan-500 text-center px-3 py-1 border rounded-md">
                    Convert
                  </button>
                </div>
              </div>

              <div className="flex justify-between mx-5 mt-2">
                <div className="gap-1">
                  <h1>Lead Source</h1>
                  <p className="text-sky-700">{item?.leadSource?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Phone</h1>
                  <p className="text-sky-700">{item?.phone?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Email</h1>
                  <p className="text-sky-700">{item?.email?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Lead Status</h1>
                  <p className="text-sky-700">{item?.leadStatus?.value}</p>
                </div>
              </div>
            </div>

            <div className="mt-40 pt-3 px-3 shadow-lg shadow-gray-400">
              <div className="w-full border-b-2 p-2">
                <ul className="flex items-center justify-between w-1/2">
                  <li>
                    <a href="#learnersDetails">Details</a>
                  </li>
                  <li>
                    <a href="#learnersActivity">Activity</a>
                  </li>
                  <li>
                    <a href="#learnersNotes">Notes</a>
                  </li>
                  <li>
                    <a href="#learnersAskAI">Ask AI</a>
                  </li>
                </ul>
              </div>

              <div className="#learnersDetails">
                <div className="grid grid-cols-2 gap-4 px-3">
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      First Name
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder=""
                      value={item.firstname?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.firstname?.editEnabled}
                      name="firstname"
                    />
                    {!item.firstname?.editEnabled && (
                      <button onClick={() => enableEditable("firstname")}>
                         <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.firstname?.editEnabled && (
                      <button onClick={() => saveDetails("firstname")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Last Name
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder=""
                      value={item.lastname?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.lastname?.editEnabled}
                      name="lastname"
                    >
                      <option className="text-neutral-800" value="">
                        Select Opportunity Status
                      </option>
                      <option className="text-neutral-800" value="visiting">
                        Visiting
                      </option>
                      <option className="text-neutral-800" value="visited">
                        Visited
                      </option>
                      <option className="text-neutral-800" value="demoAttended">
                        Demo Attended
                      </option>
                      <option
                        className="text-neutral-800"
                        value="lostOpportunity"
                      >
                        lost Opportunity
                      </option>
                    </select>
                    {!item.lastname?.editEnabled && (
                      <button onClick={() => enableEditable("lastname")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.lastname?.editEnabled && (
                      <button onClick={() => saveDetails("lastname")}>
                       <Image
                            src="/images/save-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      Id Proof
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder=""
                      value={item.idProof?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.idProof?.editEnabled}
                      name="idProof"
                    />
                    {!item.idProof?.editEnabled && (
                      <button onClick={() => enableEditable("idProof")}>
                           <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.idProof?.editEnabled && (
                      <button onClick={() => saveDetails("idProof")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Phone
                    </label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder=""
                      value={item.phone?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.phone?.editEnabled}
                      name="phone"
                    />
                    {!item.phone?.editEnabled && (
                      <button onClick={() => enableEditable("phone")}>
                         <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.phone?.editEnabled && (
                      <button onClick={() => saveDetails("phone")}><Image
                      src="/images/save-icon.png"
                      alt="edit-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Phone</label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.phone?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.phone?.editEnabled}
                      name="phone"
                    />
                    {!item.phone?.editEnabled && (
                      <button onClick={() => enableEditable("phone")}>
                         <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.phone?.editEnabled && (
                      <button onClick={() => saveDetails("phone")}> <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      DOB
                    </label>
                    <div className="flex">
                    <input
                      type="date"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder=""
                      value={item.DOB?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.DOB?.editEnabled}
                      name="DOB"
                    />
                    {!item.DOB?.editEnabled && (
                      <button onClick={() => enableEditable("DOB")}>
                         <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.DOB?.editEnabled && (
                      <button onClick={() => saveDetails("DOB")}> <Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Email"
                      value={item.email?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.email?.editEnabled}
                      name="email"
                    />
                    {!item.email?.editEnabled && (
                      <button onClick={() => enableEditable("email")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.email?.editEnabled && (
                      <button onClick={() => saveDetails("email")}><Image
                      src="/images/save-icon.png"
                      alt="save-icon"
                      width={20}
                      height={20}
                    /></button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Registered Date
                    </label>
                    <div className="flex">
                    <input
                      type="date"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.registeredDate?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.registeredDate?.editEnabled}
                      name="registeredDate"
                    />
                    {!item.registeredDate?.editEnabled && (
                      <button onClick={() => enableEditable("registeredDate")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.registeredDate?.editEnabled && (
                      <button onClick={() => saveDetails("registeredDate")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Location
                    </label>
                    <div className="flex">
                    <select
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.location?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.location?.editEnabled}
                      name="location"
                    >
                      <option className="text-neutral-800" value="">
                        Select Location
                      </option>
                      <option className="text-neutral-800" value="hyderabad">
                        Hyderabad
                      </option>
                    </select>
                    {!item.location?.editEnabled && (
                      <button onClick={() => enableEditable("location")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.location?.editEnabled && (
                      <button onClick={() => saveDetails("location")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Batch Id&apos;s
                    </label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.batchId?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.batchId?.editEnabled}
                      name="batchId"
                    />
                    {!item.batchId?.editEnabled && (
                      <button onClick={() => enableEditable("batchId")}>
                       <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.batchId?.editEnabled && (
                      <button onClick={() => saveDetails("batchId")}>
                         <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Alternate Phone
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.alternatePhone?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.alternatePhone?.editEnabled}
                      name="alternatePhone"
                    />
                    {!item.alternatePhone?.editEnabled && (
                      <button onClick={() => enableEditable("alternatePhone")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.alternatePhone?.editEnabled && (
                      <button onClick={() => saveDetails("alternatePhone")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <div className="flex">
                    <input
                      type="datetime-local"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.description?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.description?.editEnabled}
                      name="description"
                    />
                    {!item.description?.editEnabled && (
                      <button onClick={() => enableEditable("description")}>
                         <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.description?.editEnabled && (
                      <button onClick={() => saveDetails("description")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Exchange Rate
                    </label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.exchangeRate?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.exchangeRate?.editEnabled}
                      name="exchangeRate"
                    />
                    {!item.exchangeRate?.editEnabled && (
                      <button onClick={() => enableEditable("exchangeRate")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.exchangeRate?.editEnabled && (
                      <button onClick={() => saveDetails("exchangeRate")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Source
                    </label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.source?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.source?.editEnabled}
                      name="source"
                    />
                    {!item.source?.editEnabled && (
                      <button onClick={() => enableEditable("source")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.source?.editEnabled && (
                      <button onClick={() => saveDetails("source")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Attended Demo
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.attendedDemo?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.attendedDemo?.editEnabled}
                      name="attendedDemo"
                    >
                      <option className="text-neutral-800" value="">
                        Select Attended Demo
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option
                        className="text-neutral-800"
                        value="advancedDiscussion"
                      >
                        Advanced Discussion
                      </option>
                      <option className="text-neutral-800" value="readyToJoin">
                        Ready To Join
                      </option>
                      <option
                        className="text-neutral-800"
                        value="callNotAnswered"
                      >
                        Call Not Answered
                      </option>
                      <option className="text-neutral-800" value="visiting">
                        Visiting
                      </option>
                      <option
                        className="text-neutral-800"
                        value="feesNegotiation"
                      >
                        Fees Negotiation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="batchAllocation"
                      >
                        Batch Allocation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisWeek"
                      >
                        Need Time This Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextWeek"
                      >
                        Need Time Next Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisMonth"
                      >
                        Need Time This Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextMonth"
                      >
                        Need Time Next Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="specialRequirements"
                      >
                        Special Requirements
                      </option>
                      <option className="text-neutral-800" value="closedWon">
                        Closed Won (Registered)
                      </option>
                      <option className="text-neutral-800" value="closedLost">
                        Closed Lost (ColdLead)
                      </option>
                    </select>
                    {!item.attendedDemo?.editEnabled && (
                      <button onClick={() => enableEditable("attendedDemo")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.attendedDemo?.editEnabled && (
                      <button onClick={() => saveDetails("attendedDemo")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Learner Owner
                    </label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.learnerOwner?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.learnerOwner?.editEnabled}
                      name="learnerOwner"
                    />
                    {!item.learnerOwner?.editEnabled && (
                      <button onClick={() => enableEditable("learnerOwner")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.learnerOwner?.editEnabled && (
                      <button onClick={() => saveDetails("learnerOwner")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Learner Stage
                    </label>
                    <div className="flex">
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-800"
                      placeholder=""
                      value={item.learnerStage?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.learnerStage?.editEnabled}
                      name="learnerStage"
                    >
                      <option className="text-neutral-800" value="">
                        Select Learner Stage
                      </option>
                      <option className="text-neutral-800" value="none">
                        None
                      </option>
                      <option
                        className="text-neutral-800"
                        value="advancedDiscussion"
                      >
                        Advanced Discussion
                      </option>
                      <option className="text-neutral-800" value="readyToJoin">
                        Ready To Join
                      </option>
                      <option
                        className="text-neutral-800"
                        value="callNotAnswered"
                      >
                        Call Not Answered
                      </option>
                      <option className="text-neutral-800" value="visiting">
                        Visiting
                      </option>
                      <option
                        className="text-neutral-800"
                        value="feesNegotiation"
                      >
                        Fees Negotiation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="batchAllocation"
                      >
                        Batch Allocation
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisWeek"
                      >
                        Need Time This Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextWeek"
                      >
                        Need Time Next Week
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeThisMonth"
                      >
                        Need Time This Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="needTimeNextMonth"
                      >
                        Need Time Next Month
                      </option>
                      <option
                        className="text-neutral-800"
                        value="specialRequirements"
                      >
                        Special Requirements
                      </option>
                      <option className="text-neutral-800" value="closedWon">
                        Closed Won (Registered)
                      </option>
                      <option className="text-neutral-800" value="closedLost">
                        Closed Lost (ColdLead)
                      </option>
                    </select>
                    {!item.learnerStage?.editEnabled && (
                      <button onClick={() => enableEditable("learnerStage")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.learnerStage?.editEnabled && (
                      <button onClick={() => saveDetails("learnerStage")}>
                       <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                    </div>
                    </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Currency
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.currency?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.currency?.editEnabled}
                      name="currency"
                    />
                    {!item.currency?.editEnabled && (
                      <button onClick={() => enableEditable("currency")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.currency?.editEnabled && (
                      <button onClick={() => saveDetails("currency")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                    </div>
                    </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Counselling Done By
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.CounselingDoneBy?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.CounselingDoneBy?.editEnabled}
                      name="CounselingDoneBy"
                    />
                    {!item.CounselingDoneBy?.editEnabled && (
                      <button
                        onClick={() => enableEditable("CounselingDoneBy")}
                      >
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.CounselingDoneBy?.editEnabled && (
                      <button onClick={() => saveDetails("CounselingDoneBy")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}</div>
                    </div>
                  <br />
                  <h1 className="font-bold text2xl">Course Details</h1>
                  <br />
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Registered Course
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.registeredCourse?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.registeredCourse?.editEnabled}
                      name="registeredCourse"
                    />
                    {!item.registeredCourse?.editEnabled && (
                      <button
                        onClick={() => enableEditable("registeredCourse")}
                      >
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.registeredCourse?.editEnabled && (
                      <button onClick={() => saveDetails("registeredCourse")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Preferable Time
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.preferableTime?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.preferableTime?.editEnabled}
                      name="preferableTime"
                    />
                    {!item.preferableTime?.editEnabled && (
                      <button onClick={() => enableEditable("preferableTime")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.preferableTime?.editEnabled && (
                      <button onClick={() => saveDetails("preferableTime")}>
                       <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Tech Stack
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.techStack?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.techStack?.editEnabled}
                      name="techStack"
                    />
                    {!item.techStack?.editEnabled && (
                      <button onClick={() => enableEditable("techStack")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.techStack?.editEnabled && (
                      <button onClick={() => saveDetails("techStack")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Batch Timing
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.batchTiming?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.batchTiming?.editEnabled}
                      name="batchTiming"
                    />
                    {!item.batchTiming?.editEnabled && (
                      <button onClick={() => enableEditable("batchTiming")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.batchTiming?.editEnabled && (
                      <button onClick={() => saveDetails("batchTiming")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Course Comments
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.courseComments?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.courseComments?.editEnabled}
                      name="courseComments"
                    />
                    {!item.courseComments?.editEnabled && (
                      <button onClick={() => enableEditable("courseComments")}>
                         <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.courseComments?.editEnabled && (
                      <button onClick={() => saveDetails("courseComments")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Mode Of Class
                    </label>
                    <div className="flex">
                    <select
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.modeOfClass?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.modeOfClass?.editEnabled}
                      name="modeOfClass"
                    >
                      option
                      <option className="text-neutral-800" value="indiaOnline">
                        India online
                      </option>
                      option
                      <option
                        className="text-neutral-800"
                        value="internationalOnline"
                      >
                        Internationalonline
                      </option>
                    </select>
                    {!item.modeOfClass?.editEnabled && (
                      <button onClick={() => enableEditable("modeOfClass")}>
                       <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.modeOfClass?.editEnabled && (
                      <button onClick={() => saveDetails("modeOfClass")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Slack Access
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.slackAccess?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.slackAccess?.editEnabled}
                      name="slackAccess"
                    />
                    {!item.slackAccess?.editEnabled && (
                      <button onClick={() => enableEditable("slackAccess")}>
                       <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.slackAccess?.editEnabled && (
                      <button onClick={() => saveDetails("slackAccess")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Comment</label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.Comment?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.Comment?.editEnabled}
                      name="Comment"
                    />
                    {!item.Comment?.editEnabled && (
                      <button onClick={() => enableEditable("Comment")}>
                         <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.Comment?.editEnabled && (
                      <button onClick={() => saveDetails("Comment")}>
                       <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      LMS Access
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder=""
                      value={item.lMSAccess?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.lMSAccess?.editEnabled}
                      name="lMSAccess"
                    />
                    {!item.lMSAccess?.editEnabled && (
                      <button onClick={() => enableEditable("lMSAccess")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.lMSAccess?.editEnabled && (
                      <button onClick={() => saveDetails("lMSAccess")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "courses" && (
        <>
          <div className="flex flex-col mx-3">
            <div className="pt-3 px-3 shadow-lg shadow-gray-200 fixed w-full h-32 bg-white z-10 items-center">
              <div className="flex justify-between mx-2 border-b-2 pb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="flex font-medium cursor-pointer"
                    onClick={handleBack}
                  >
                    <Image
                      src="/images/backarrow.png"
                      alt="backarrow-icon"
                      width={30}
                      height={20}
                    />
                    <span>Back</span>
                  </div>
                  <Image
                    src="/images/employee_contact.svg"
                    alt="contact-icon"
                    width={40}
                    height={30}
                  />
                  <h1 className="flex items-center font-semibold text-xl gap-2 text-black-500">
                    {item?.courseName?.value}
                  </h1>
                </div>

                <div className="mx-3 ">
                  <button className="text-base bg-cyan-500 text-center px-3 py-1 border rounded-md">
                    Convert
                  </button>
                </div>
              </div>

              <div className="flex justify-between mx-5 mt-2">
                <div className="gap-1">
                  <h1>Lead Source</h1>
                  <p className="text-sky-700">{item?.leadSource?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Phone</h1>
                  <p className="text-sky-700">{item?.phone?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Email</h1>
                  <p className="text-sky-700">{item?.email?.value}</p>
                </div>
                <div className="gap-1">
                  <h1>Lead Status</h1>
                  <p className="text-green-700">{item?.leadStatus?.value}</p>
                </div>
              </div>
            </div>

            <div className="mt-40 pt-3 px-3 shadow-lg shadow-gray-400">
            <div className="w-full border-b-2 p-2">
            <ul className="flex items-center justify-between w-1/2">
                  <li>
                    <a href="#coursesDetails">Details</a>
                  </li>
                  <li>
                    <a href="#coursesActivity">Activity</a>
                  </li>
                  <li>
                    <a href="#coursesNotes">Notes</a>
                  </li>
                  <li>
                    <a href="#coursesAskAI">Ask AI</a>
                  </li>
                </ul>
              </div>

              <div id="#coursesDetails">
                <div className="grid grid-cols-2 gap-4 px-3">
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      Course Name
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder=""
                      value={item.courseName?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.courseName?.editEnabled}
                      name="courseName"
                    />
                    {!item.courseName?.editEnabled && (
                      <button onClick={() => enableEditable("courseName")}>
                       <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.courseName?.editEnabled && (
                      <button onClick={() => saveDetails("courseName")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Description
                    </label>
                    <div className="flex">
                    <input
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder=""
                      value={item.description?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.description?.editEnabled}
                      name="description"
                    />
                    {!item.description?.editEnabled && (
                      <button onClick={() => enableEditable("description")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.description?.editEnabled && (
                      <button onClick={() => saveDetails("description")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      Course Fee
                    </label>
                    <div className="flex">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder=""
                      value={item.courseFee?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.courseFee?.editEnabled}
                      name="courseFee"
                    />
                    {!item.courseFee?.editEnabled && (
                      <button onClick={() => enableEditable("courseFee")}>
                        <Image
                            src="/images/edit-icon.png"
                            alt="edit-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}
                    {item.courseFee?.editEnabled && (
                      <button onClick={() => saveDetails("courseFee")}>
                        <Image
                            src="/images/save-icon.png"
                            alt="save-icon"
                            width={20}
                            height={20}
                          />
                      </button>
                    )}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default DetailPage;
