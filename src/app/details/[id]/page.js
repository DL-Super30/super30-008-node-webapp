"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { initialData } from "@/app/data/data";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getLeadsApi, updateLeadsApi } from "@/slices/leadsSlice";

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
      console.log(foundItem, 'foundItem');
      Object.keys(foundItem).forEach(key => {
        itemNeedToBeAdded[key] = {value: foundItem[key], editEnabled: false};
      })
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
    setItem({...item });
  }

  const saveDetails = (key) => {
    const itemInfo = {
      [key]: item[key]?.value
    }
    console.log(itemInfo);
    item[key].editEnabled = false;
    setItem({...item });
    dispatch(updateLeadsApi({itemInfo, id: params.id}));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    item[name].value = value;
    setItem({...item });
  }

  if (!item) return;

  return (
    <div className="">
      {type === "leads" && (
        <>
          <div className="flex flex-col">
            <div className="pt-3 px-3 shadow-lg shadow-gray-200 fixed w-full h-28 bg-white z-10 items-center">
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
                    {item?.name}
                  </h1>
                </div>

                <div className="mx-3 ">
                  <button className="text-base bg-cyan-500 text-center px-3 py-1 border rounded-md">
                    Convert
                  </button>
                </div>
              </div>

              <div className="flex justify-between mx-5">
                <div>
                  <h1>Lead Source</h1>
                  <p>{item?.leadSource?.value}</p>
                </div>
                <div>
                  <h1>Phone</h1>
                  <p>{item?.phone?.value}</p>
                </div>
                <div>
                  <h1>Email</h1>
                  <p>{item?.email?.value}</p>
                </div>
                <div>
                  <h1>Lead Status</h1>
                  <p>{item?.leadStatus?.value}</p>
                </div>
              </div>
            </div>

            <div className="mt-36">
              <div className="w-full">
                <ul className="flex items-center justify-between">
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

              <div>
                <div className="grid grid-cols-2 gap-4 px-3">
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-800 ">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-base font-medium"
                      placeholder="Enter lead name"
                      value={item.leadname?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.leadname?.editEnabled}
                      name="leadname"
                    />
                    {!item.leadname?.editEnabled && <button onClick={() => enableEditable('leadname')}>Edit</button>}
                    {item.leadname?.editEnabled && <button onClick={() => saveDetails('leadname')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Lead status
                    </label>
                    <select
                      type=""
                      className="w-full border-b-2 border-gray-300 p-2 rounded text-gray-800"
                      placeholder="Lead status"
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
                    {!item.leadStatus?.editEnabled && <button onClick={() => enableEditable('leadStatus')}>Edit</button>}
                    {item.leadStatus?.editEnabled && <button onClick={() => saveDetails('leadStatus')}>Save</button>}
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
                    {!item.cc?.editEnabled && <button onClick={() => enableEditable('cc')}>Edit</button>}
                    {item.cc?.editEnabled && <button onClick={() => saveDetails('cc')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Lead Source
                    </label>
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
                    {!item.leadSource?.editEnabled && <button onClick={() => enableEditable('leadSource')}>Edit</button>}
                    {item.leadSource?.editEnabled && <button onClick={() => saveDetails('leadSource')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter phone no."
                      value={item.phone?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.phone?.editEnabled}
                      name="phone"
                    />
                    {!item.phone?.editEnabled && <button onClick={() => enableEditable('phone')}>Edit</button>}
                    {item.phone?.editEnabled && <button onClick={() => saveDetails('phone')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Stack
                    </label>
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
                    {!item.stack?.editEnabled && <button onClick={() => enableEditable('stack')}>Edit</button>}
                    {item.stack?.editEnabled && <button onClick={() => saveDetails('stack')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Email"
                      value={item.email?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.email?.editEnabled}
                      name="email"
                    />
                    {!item.email?.editEnabled && <button onClick={() => enableEditable('email')}>Edit</button>}
                    {item.email?.editEnabled && <button onClick={() => saveDetails('email')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Course</label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Course"
                      value={item.course?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.course?.editEnabled}
                      name="course"
                    />
                    {!item.course?.editEnabled && <button onClick={() => enableEditable('course')}>Edit</button>}
                    {item.course?.editEnabled && <button onClick={() => saveDetails('course')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Fee Quoted
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Enter Fee quoted"
                      value={item.feeQuoted?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.feeQuoted?.editEnabled}
                      name="feeQuoted"
                    />
                    {!item.feeQuoted?.editEnabled && <button onClick={() => enableEditable('feeQuoted')}>Edit</button>}
                    {item.feeQuoted?.editEnabled && <button onClick={() => saveDetails('feeQuoted')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-base font-medium gap-2 text-gray-500">
                      Class Mode
                    </label>
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
                    {!item.selectedClassMode?.editEnabled && <button onClick={() => enableEditable('selectedClassMode')}>Edit</button>}
                    {item.selectedClassMode?.editEnabled && <button onClick={() => saveDetails('selectedClassMode')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Batch Timing
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Select timing"
                      value={item.batchTiming?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.batchTiming?.editEnabled}
                      name="batchTiming"
                    />
                    {!item.batchTiming?.editEnabled && <button onClick={() => enableEditable('batchTiming')}>Edit</button>}
                    {item.batchTiming?.editEnabled && <button onClick={() => saveDetails('batchTiming')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Next FollowUp
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Select next followup"
                      value={item.nextFollowUp?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.nextFollowUp?.editEnabled}
                      name="nextFollowUp"
                    />
                    {!item.nextFollowUp?.editEnabled && <button onClick={() => enableEditable('nextFollowUp')}>Edit</button>}
                    {item.nextFollowUp?.editEnabled && <button onClick={() => saveDetails('nextFollowUp')}>Save</button>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 rounded"
                      placeholder="Description"
                      value={item.description?.value}
                      onChange={(e) => handleChange(e)}
                      disabled={!item.description?.editEnabled}
                      name="description"
                    />
                    {!item.description?.editEnabled && <button onClick={() => enableEditable('description')}>Edit</button>}
                    {item.description?.editEnabled && <button onClick={() => saveDetails('description')}>Save</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "oppurtunities" && (
        <>
          <div className="pt-3 px-3 shadow-lg shadow-gray-200 fixed w-full h-28 bg-white z-10 items-center">
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
                  {item?.name}
                </h1>
              </div>

              <div className="mx-3 ">
                <button className="text-base bg-cyan-500 text-center px-3 py-1 border rounded-md">
                  Convert
                </button>
              </div>
            </div>

            <div className="flex justify-between mx-5">
              <div>
                <h1>Lead Source</h1>
                <p>{item.leadSource}</p>
              </div>
              <div>
                <h1>Phone</h1>
                <p>{item.phone}</p>
              </div>
              <div>
                <h1>Email</h1>
                <p>{item.email}</p>
              </div>
              <div>
                <h1>Lead Status</h1>
                <p>{item.leadStatus}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default DetailPage;
