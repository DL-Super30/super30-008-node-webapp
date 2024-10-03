"use client";

import { useState, useEffect, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Modal from "@/app/modal/modal";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  createLeadsApi,
  deleteLeadsApi,
  getLeadsApi,
} from "@/slices/leadsSlice";
import {
  format,
  subDays,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
} from "date-fns";
import {
  createOpportunityApi,
  deleteOpportunityApi,
  getOpportunityApi,
} from "@/slices/opportunitiesSlice";
import {
  createLearnerApi,
  deleteLearnerApi,
  getlearnerApi,
} from "@/slices/learnersSlice";

const DataList = ({ type, items }) => {
  const ITEMS_PER_PAGE = 15;
  // const [dataList, setDataList] = useState(initialData[type] || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(`My ${type}`);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [tableDataView, setTableDataView] = useState({
    notContacted: 0,
    attempted: 0,
    warmLead: 0,
    coldLead: 0,
    visited: 0,
    visiting: 0,
    demoAttended: 0,
    lostOpportunity: 0,
    upcoming: 0,
    ongoing: 0,
    onHold: 0,
    completed: 0,
  });
  const [kanbanDataView, setKanbanDataView] = useState({
    notContacted: 0,
    attempted: 0,
    warmLead: 0,
    coldLead: 0,
    visited: 0,
    visiting: 0,
    demoAttended: 0,
    lostOpportunity: 0,
    upcoming: 0,
    ongoing: 0,
    onHold: 0,
    completed: 0,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const dataList = useSelector((state) => state[type]?.[type]);
  const newDataItem = useSelector((state) => state[type]);
  const dispatch = useDispatch();
  const [actionItem, setActionItem] = useState("Select an option");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const generateOptions = (type) => [
    `All ${type}`,
    `My ${type}`,
    `Today's ${type}`,
    `Yesterday's ${type}`,
    `This week ${type}`,
    `This month ${type}`,
    `Last month ${type}`,
  ];

  const options = generateOptions(type.charAt(0).toUpperCase() + type.slice(1));

  useEffect(() => {
    if (type === "leads") {
      dispatch(getLeadsApi());
    } else if (type === "opportunities") {
      dispatch(getOpportunityApi());
    } else if (type === "learners") {
      dispatch(getlearnerApi());
    }
  }, [newDataItem?.newItem, newDataItem?.deleteItem]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleAction = () => {
    setIsActionOpen(!isActionOpen);
  };

  const handleAction = (item) => {
    if (item === "delete") {
      selectedItems.forEach((item) => {
        if (type === "leads") {
          dispatch(deleteLeadsApi(item.id));
        } else if (type === "opportunities") {
          dispatch(deleteOpportunityApi(item.id));
        } else if (type === "learners") {
          dispatch(deleteLearnerApi(item.id));
        }
      });
    }
    setActionItem(item);
    setIsActionOpen(false);
  };

  const handleCurrentDataList = (filteredList, page) => {
    console.log(currentPage);
    const selectedPage = page ?? currentPage;
    const currentDataList = filteredList?.slice(
      (selectedPage - 1) * ITEMS_PER_PAGE,
      selectedPage * ITEMS_PER_PAGE
    );
    setFilteredDataList(currentDataList ?? []);
  };

  const filterItemsByDate = (items, option) => {
    const today = new Date();
    let filteredItems = items;

    const typeWithUpperCase = type.charAt(0).toUpperCase() + type.slice(1);
    switch (option) {
      case `Today's ${typeWithUpperCase}`:
        filteredItems = items.filter(
          (item) =>
            format(new Date(item.createdAt), "yyyy-MM-dd") ===
            format(today, "yyyy-MM-dd")
        );
        break;
      case `Yesterday's ${typeWithUpperCase}`:
        const yesterday = subDays(today, 1);
        console.log(yesterday);
        filteredItems = items.filter(
          (item) =>
            format(new Date(item.createdAt), "yyyy-MM-dd") ===
            format(yesterday, "yyyy-MM-dd")
        );
        break;
      case `This week ${typeWithUpperCase}`:
        const startOfThisWeek = startOfWeek(today);
        const endOfThisWeek = endOfWeek(today);
        filteredItems = items.filter(
          (item) =>
            new Date(item.createdAt) >= startOfThisWeek &&
            new Date(item.createdAt) <= endOfThisWeek
        );
        break;
      case `This month ${typeWithUpperCase}`:
        const startOfThisMonth = startOfMonth(today);
        const endOfThisMonth = endOfMonth(today);
        filteredItems = items.filter(
          (item) =>
            new Date(item.createdAt) >= startOfThisMonth &&
            new Date(item.createdAt) <= endOfThisMonth
        );
        break;
      case `Last month ${typeWithUpperCase}`:
        const startOfLastMonth = startOfMonth(subDays(today, 30));
        const endOfLastMonth = endOfMonth(subDays(today, 30));
        filteredItems = items.filter(
          (item) =>
            new Date(item.createdAt) >= startOfLastMonth &&
            new Date(item.createdAt) <= endOfLastMonth
        );
        break;
      default:
        break;
    }

    handleCurrentDataList(filteredItems);

    // setFilteredDataList(filteredItems);
  };

  useMemo(
    () => filterItemsByDate(dataList, selectedOption),
    [dataList, selectedOption]
  );

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    if (type === "leads") {
      setStatuses(["notContacted", "attempted", "warmLead", "coldLead"]);
    } else if (type === "opportunities") {
      setStatuses(["visiting", "visited", "demoAttended", "lostOpportunity"]);
    } else if (type === "learners") {
      setStatuses(["upcoming", "ongoing", "onHold", "completed"]);
    }
    const filterDataList = [...(dataList ?? [])];
    const tableViewData = {
      notContacted: dataList?.filter(
        (item) => item.leadStatus === "notContacted"
      ).length,
      attempted: dataList?.filter((item) => item.leadStatus === "attempted")
        .length,
      warmLead: dataList?.filter((item) => item.leadStatus === "warmLead")
        .length,
      coldLead: dataList?.filter((item) => item.leadStatus === "coldLead")
        .length,
      visited: dataList?.filter((item) => item.opportunityStatus === "visited")
        .length,
      visiting: dataList?.filter(
        (item) => item.opportunityStatus === "visiting"
      ).length,
      demoAttended: dataList?.filter(
        (item) => item.opportunityStatus === "demoAttended"
      ).length,
      lostOpportunity: dataList?.filter(
        (item) => item.opportunityStatus === "lostOpportunity"
      ).length,
      upcoming: dataList?.filter((item) => item.learnerStage === "upcoming")
        .length,
      ongoing: dataList?.filter((item) => item.learnerStage === "ongoing")
        .length,
      onHold: dataList?.filter((item) => item.learnerStage === "onHold").length,
      completed: dataList?.filter((item) => item.learnerStage === "completed")
        .length,
    };
    setTableDataView(tableViewData);

    const kanbanView = {
      notContacted: dataList
        ?.filter((item) => item.leadStatus === "notContacted")
        .reduce((sum, item) => sum + item.feeQuoted, 0),
      attempted: dataList
        ?.filter((item) => item.leadStatus === "attempted")
        .reduce((sum, item) => sum + item.feeQuoted, 0),
      warmLead: dataList
        ?.filter((item) => item.leadStatus === "warmLead")
        .reduce((sum, item) => sum + item.feeQuoted, 0),
      coldLead: dataList
        ?.filter((item) => item.leadStatus === "coldLead")
        .reduce((sum, item) => sum + item.feeQuoted, 0),
    };

    const totalItems = filterDataList?.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    console.log(totalItems, totalPages);
    setKanbanDataView(kanbanView);
    setTotalItems(totalItems);
    setTotalPages(totalPages);
    handleCurrentDataList([...(filterDataList ?? [])]);

    // setFilteredDataList(filterDataList ?? []);
  }, [dataList]);

  // const totalItems = filteredDataList?.length;
  // const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  // const paginatedData = filteredDataList?.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );

  const handleSearchQuery = (searchQuery) => {
    const filterDataList = dataList?.filter((item) =>
      type === "courses"
        ? item?.course?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.courseFee.toString().includes(searchQuery)
        : item?.leadname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.phone?.includes(searchQuery)
    );

    setSearchQuery(searchQuery);
    handleCurrentDataList(filterDataList);
    // setFilteredDataList(filterDataList ?? []);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      handleCurrentDataList(dataList, page);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addNewItem = (newItem) => {
    // initialData[type]= [...initialData[type], newItem];
    if (type === "leads") {
      const itemToBeAdded = {
        leadname: newItem.name,
        phone: newItem.phone,
        email: newItem.email,
        feeQuoted: newItem.fee,
        batchTiming: newItem.time,
        leadStatus: newItem.leadStatus,
        leadSource: newItem.leadSource,
        course: newItem.course,
        selectedClassMode: newItem.classMode,
      };

      dispatch(createLeadsApi(itemToBeAdded));
      dispatch(getLeadsApi());
    } else if (type === "opportunities") {
      const itemToBeAdded = {
        name: newItem.name,
        cc: newItem.cc,
        phone: newItem.phone,
        email: newItem.email,
        feeQuoted: newItem.feeQuoted,
        batchTiming: newItem.batchTiming,
        leadStatus: newItem.leadStatus,
        stack: newItem.stack,
        ClassMode: newItem.classMode,
        opportunityStatus: newItem.opportunityStatus,
        opportunitySatge: newItem.opportunityStage,
        DemoAttendedStage: newItem.DemoAttendedStage,
        visitedStage: newItem.visitedStage,
        lostOpportunityReason: newItem.lostOpportunityReason,
        nextFollowUp: newItem.nextFollowUp,
        leadSource: newItem.leadSource,
        course: newItem.course,
        description: newItem.description,
      };

      dispatch(createOpportunityApi(itemToBeAdded));
      dispatch(getOpportunityApi());
    } else if (type === "learners") {
      const itemToBeAdded = {
        firstname: newItem.firstname,
        lastname: newItem.lastname,
        idProof: newItem.idProof,
        phone: newItem.phone,
        DOB: newItem.DOB,
        email: newItem.email,
        registeredDate: newItem.registeredDate,
        location: newItem.location,
        batchId: newItem.batchId,
        alternatePhone: newItem.alternatePhone,
        description: newItem.description,
        exchangeRate: newItem.exchangeRate,
        source: newItem.source,
        attendedDemo: newItem.attendedDemo,
        learnerOwner: newItem.learnerOwner,
        learnerStage: newItem.learnerStage,
        currency: newItem.currency,
        leadCreatedDate: newItem.leadCreatedDate,
        CounselingDoneBy: newItem.CounselingDoneBy,
        registeredCourse: newItem.registeredCourse,
        techStack: newItem.techStack,
        courseComments: newItem.courseComments,
        slackAccess: newItem.slackAccess,
        lMSAccess: newItem.lMSAccess,
        preferableTime: newItem.preferableTime,
        batchTiming: newItem.batchTiming,
        modeOfClass: newItem.modeOfClass,
        Comment: newItem.Comment,
      };
      console.log(newItem);

      dispatch(createLearnerApi(itemToBeAdded));
      dispatch(getlearnerApi());
    }
  };

  const handleStatusFilters = (status) => {
    console.log("status", status);
    const isStatusAlreadySelected = selectedStatus === status;
    let filterDataList = [];
    if (isStatusAlreadySelected) {
      filterDataList = [...dataList];
      setSelectedStatus("");
    } else {
      filterDataList = dataList?.filter((item) => item.leadStatus === status);
      setSelectedStatus(status);
    }

    handleCurrentDataList(filterDataList);

    // setFilteredDataList(filterDataList ?? []);
  };

  const handleSelectedItems = (e, item) => {
    e.stopPropagation();

    const selectedItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    let items = [...selectedItems];
    if (selectedItemIndex > -1) {
      items.splice(selectedItemIndex, 1);
    } else {
      items.push(item);
    }
    console.log(items);
    setSelectedItems(items);
  };

  const getName = (item) => {
    if (type === "leads") {
      return item.leadname;
    } else if (type === "opportunities") {
      return item.name;
    } else if (type === "learners") {
      return item.lastname;
    }
  };

  const handleRowClick = (itemID) => {
    router.push(`/details/${itemID}?type=${type}`); // Navigates to details page
  };

  return (
    <div className="m-3 mx-5">
      <div className="border border-gray-300 border-2 shadow rounded-md w-full h-screen relative flex flex-col">
        <div className="mx-3 my-4 flex justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/employee_contact.svg"
              alt="contact-icon"
              width={40}
              height={30}
            />
            <h1 className="flex items-center text-2xl gap-2 text-sky-950">
              {selectedOption}
              <FaChevronDown
                className="text-2xl font-light"
                onClick={handleToggle}
              />

              {/* Dropdown Options */}
              {isOpen && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg top-12 w-60 ml-24">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="p-4 text-gray-700 font-medium hover:bg-gray-100 cursor-pointer text-base border-b-2 rounded-lg"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </h1>
          </div>
          <div className="flex items center gap-2 ">
            <div>
              <button
                onClick={openModal}
                className="flex items-center border rounded-md px-4 py-1 gap-1"
              >
                {`Create ${type.charAt(0).toUpperCase() + type.slice(1)}`}

                <FaChevronDown className="ml-1 text-xs items-center font-thin" />
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                type={type}
                addNewItem={addNewItem}
              />
            </div>
            <div>
              <button
                onClick={toggleAction}
                className="flex items-center border rounded-md px-4 py-1 gap-1"
              >
                Actions
                <FaChevronDown className="ml-1 text-xs items-center font-thin" />
              </button>
              {isActionOpen && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg top-12 w-50 mr-5">
                  <li
                    className="p-2 text-gray-700 font-medium hover:bg-gray-100 cursor-pointer text-base border-b-2 rounded-lg"
                    onClick={() => handleAction("delete")}
                  >
                    Delete
                  </li>
                  <li
                    className="p-2 text-gray-700 font-medium hover:bg-gray-100 cursor-pointer text-base border-b-2 rounded-lg"
                    onClick={() => handleAction("editProfile")}
                  >
                    Edit Profile
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center ">
          <div className="items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearchQuery(e.target.value)}
              className="border p-1 mx-2 block w-full h-8 rounded-lg border-gray-600"
            />
          </div>
          {type === "leads" ? (
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700 rounded-s-lg text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("notContacted")}
              >
                Not Contacted
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.notContacted}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700  text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("attempted")}
              >
                Attempted
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.attempted}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700  text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("warmLead")}
              >
                Warm Lead
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.warmLead}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700 rounded-e-lg text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("coldLead")}
              >
                Cold Lead
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.coldLead}
                </p>
              </button>
            </div>
          ) : type === "opportunities" ? (
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700 rounded-s-lg text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("visiting")}
              >
                Visting
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.visiting}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700  text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("visited")}
              >
                Visited
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.visited}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700  text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("demoAttended")}
              >
                Demo Attended
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.demoAttended}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700 rounded-e-lg text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("lostOpportunity")}
              >
                Lost Opportunity
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.lostOpportunity}
                </p>
              </button>
            </div>
          ) : type === "learners" ? (
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700 rounded-s-lg text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("upcoming")}
              >
                Upcoming
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.upcoming}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700  text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("ongoing")}
              >
                Ongoing
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.ongoing}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700  text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("onHold")}
              >
                On Hold
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.onHold}
                </p>
              </button>
              <button
                className="inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border border-gray-600 focus:border-transparent' transition duration-700 rounded-e-lg text-gray-900 bg-transparent"
                onClick={() => handleStatusFilters("completed")}
              >
                Completed
                <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                  {tableDataView.completed}
                </p>
              </button>
            </div>
          ) : (
            ""
          )}

          {type !== 'courses' && <div className="flex items-center">
            <button
              onClick={() => toggleViewMode("table")}
              className="flex border rounded-l-lg py-1 px-4 gap-2 w-1/2 border-gray-600"
            >
              <Image
                src="/images/table-icon.png"
                alt="table-icon-img"
                width={25}
                height={20}
                className="p-1"
              />
              Table
            </button>
            <button
              onClick={() => toggleViewMode("kanban")}
              className="flex border rounded-r-lg py-1 px-4 gap-2 w-1/2 border-gray-600 hover: bg-blue"
            >
              <Image
                src="/images/kanban-icon.png"
                alt="kanban-icon-img"
                width={25}
                height={20}
                className="p-1"
              />
              Kanban
            </button>
          </div>}
        </div>

        {viewMode === "table" ? (
          <div className="p-4 flex-grow overflow-hidden ">
            <div className="h-full overflow-y-auto ">
              <table className=" border border-gray-300 w-full table-auto">
                <thead className="border border-gray-300 h-12 bg-gray-100">
                  <tr className="text-left">
                    <th>
                      <input type="checkbox" className="form-checkbox" />
                    </th>
                    {type === "courses" ? (
                      <>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Course Fee</th>
                      </>
                    ) : type === "learners" ? (
                      <>
                        <th className="border-r border-gray-400 ">
                          Created Time
                        </th>
                        <th className="border-r border-gray-400 ">
                          Registered Date
                        </th>
                        <th className="border-r border-gray-400 ">Last Name</th>
                        <th className="border-r border-gray-400 ">Phone</th>
                        <th className="border-r border-gray-400 ">Email</th>
                        <th className="border-r border-gray-400 ">
                          Mode of Class
                        </th>
                        <th className="border-r border-gray-400 ">
                          Tech Stack
                        </th>
                        <th className="border-r border-gray-400 ">Learner stage</th>
                        <th className="border-r border-gray-400 ">Total Fee</th>
                      </>
                    ) : type === "leads" ? (
                      <>
                        <th className="border-r border-gray-400 ">
                          Created on
                        </th>
                        <th className="border-r border-gray-400 ">
                          Lead Status
                        </th>
                        <th className="border-r border-gray-400 ">Name</th>
                        <th className="border-r border-gray-400 ">Phone</th>
                        <th className="border-r border-gray-400 ">Stack</th>
                        <th className="w-50">Course</th>
                      </>
                    ) : (
                      <>
                        <th className="border-r border-gray-400 ">
                          Created on
                        </th>
                        <th className="border-r border-gray-400 ">
                          Opportunity Status
                        </th>
                        <th className="border-r border-gray-400 ">Name</th>
                        <th className="border-r border-gray-400 ">Phone</th>
                        <th className="border-r border-gray-400 ">Stack</th>
                        <th className="w-50">Course</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="text-left font-normal">
                  {filteredDataList?.map((item) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => handleRowClick(item.id)}
                    >
                      <td
                        className="text-left font-normal"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          onClick={(e) => handleSelectedItems(e, item)}
                        />
                      </td>

                      {type === "courses" ? (
                        <>
                          <td className="text-left font-normal">
                            {item.course}
                          </td>
                          <td className="text-left font-normal">
                            {item.description}
                          </td>
                          <td className="text-left font-normal">
                            {item.courseFee}
                          </td>
                        </>
                      ) : type === "learners" ? (
                        <>
                          <td className="text-left font-normal">
                            {item.createdAt}
                          </td>
                          <td className="text-left font-normal">
                            {item.registeredDate}
                          </td>
                          <td className="text-left font-normal">
                            {item.lastname}
                          </td>
                          <td className="text-left font-normal">
                            {item.phone}
                          </td>
                          <td className="text-left font-normal">
                            {item.email}
                          </td>
                          <td className="text-left font-normal">
                            {item.modeOfClass}
                          </td>
                          <td className="text-left font-normal">
                            {item.techStack}
                          </td>
                          <td className="text-left font-normal">
                            {item.learnerStage}
                          </td>
                          <td className="text-left font-normal">
                            {item.currency}
                          </td>
                        </>
                      ) : type === "leads" ? (
                        <>
                          <td className="text-left font-normal">
                            {item.createdAt}
                          </td>
                          <td className="text-left font-normal">
                            {item.leadStatus}
                          </td>
                          <td className="text-left font-normal">
                            {getName(item)}
                          </td>
                          <td className="text-left font-normal">
                            {item.phone}
                          </td>
                          <td className="text-left font-normal">
                            {item.stack}
                          </td>
                          <td className="text-left font-normal">
                            {item.course}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="text-left font-normal">
                            {item.createdAt}
                          </td>
                          <td className="text-left font-normal">
                            {item.opportunityStatus}
                          </td>
                          <td className="text-left font-normal">
                            {getName(item)}
                          </td>
                          <td className="text-left font-normal">
                            {item.phone}
                          </td>
                          <td className="text-left font-normal">
                            {item.stack}
                          </td>
                          <td className="text-left font-normal">
                            {item.course}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-5 px-4 py-0 overflow-x-auto w-full h-full">
            <div className="flex gap-3">
              {statuses.map((status) => (
                <div key={status} className="h-full grid gap-4">
                  <div
                    className={`border-t-4 rounded-t-md h-20 min-w-96 py-3 px-5 ${
                      status === "notContacted"
                        ? "bg-green-100 border-t-green-300"
                        : status === "attempted"
                        ? "bg-blue-100 border-t-blue-300"
                        : status === "warmLead"
                        ? "bg-orange-100 border-t-stone-400"
                        : status === "coldLead"
                        ? "bg-indigo-100 border-t-slate-400"
                        : status === "visited"
                        ? "bg-green-100 border-t-slate-400"
                        : status === "visiting"
                        ? "bg-blue-100 border-t-slate-400"
                        : status === "demoAttended"
                        ? "bg-orange-100 border-t-slate-400"
                        : status === "lostOpportunity"
                        ? "bg-indigo-100 border-t-slate-400"
                        : status === "upcoming"
                        ? "bg-green-100 border-t-slate-400"
                        : status === "ongoing"
                        ? "bg-blue-100 border-t-slate-400"
                        : status === "onHold"
                        ? "bg-orange-100 border-t-slate-400"
                        : status === "completed"
                        ? "bg-indigo-100 border-t-slate-400"
                        : ""
                    }`}
                  >
                    <h3 className="text-base font-semibold">{status}</h3>
                    <p className="text-sm font-semibold">
                      ₹ {kanbanDataView?.[status]}
                      <span className="text-sm font-medium"> Leads</span>
                    </p>
                  </div>
                  <div className="bg-gray-200 h-80 p-2 max-w-96 flex rounded">
                    <div className="flex flex-col">
                      {filteredDataList
                        .filter(
                          (item) =>
                            item.leadStatus === status ||
                            item.opportunityStatus === status ||
                            item.learnerStage === status
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className="text-base"
                            onClick={() => handleRowClick(item.id)}
                          >
                            <div className="flex flex-row gap-1">
                              <p className="flex flex-row">
                                Name: <span>{getName(item)}</span>
                              </p>
                              <p>
                                Phone:<span>{item.phone}</span>
                              </p>
                              {type === "learners" ? (
                                <>
                                  <p>
                                    Total Fee: <span>{item.currency}</span>/-
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p>
                                    Fee: <span>{item.feeQuoted}</span>/-
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === "table" ? (
          <div className="border-t-2 p-3 bottom-0 w-full">
            <div className=" flex items-center justify-end text-sm mr-5 gap-10">
              <div className="flex items-center gap-1 ">
                {totalItems > 0 ? (
                  <>
                    <span className="font-bold">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                    </span>
                    {" to "}
                    <span className="font-bold">
                      {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}
                    </span>
                    {" of "}
                    <span className="font-bold">{totalItems}</span>
                  </>
                ) : (
                  "No items to display"
                )}
              </div>
              <div className="flex items-center gap-2 ">
                <span
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 flex gap-6"
                >
                  <p>{"|<"}</p>
                  &lt;
                </span>
                <span className="flex gap-1">
                  Page <h1 className="font-bold">{currentPage}</h1> of{" "}
                  <h1 className="font-bold">{totalPages}</h1>
                </span>

                <span
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 flex gap-6"
                >
                  &gt;
                  <p>{">|"}</p>
                </span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DataList;
