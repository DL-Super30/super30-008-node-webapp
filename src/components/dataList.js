"use client";

import { useState, useEffect,  useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Modal from "@/app/modal/modal";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { createLeadsApi, getLeadsApi } from "@/slices/leadsSlice";
import { format, subDays, startOfWeek, startOfMonth, endOfWeek, endOfMonth } from 'date-fns';


const DataList = ({ type, items }) => {
  const ITEMS_PER_PAGE = 15;
  // const [dataList, setDataList] = useState(initialData[type] || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(`My ${type}`);
  const dataList = useSelector((state) => state[type]?.[type]);
  const dispatch = useDispatch();

  
  const generateOptions = (type) => [
    `All ${type}`,
    `My ${type}`,
    `Today's ${type}`,
    `Yesterday's ${type}`,
    `This week ${type}`,
    `This month ${type}`,
    `Last month ${type}`
  ];

  const options = generateOptions(type.charAt(0).toUpperCase() + type.slice(1));


  useEffect(() => {
    if (type === 'leads') {
      dispatch(getLeadsApi());
    } else if (type === 'oppurtunities') {
      
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };


  const filterItemsByDate = (items, option) => {
    const today = new Date();
    let filteredItems = items;

    const typeWithUpperCase = type.charAt(0).toUpperCase() + type.slice(1);
    switch (option) {
        case `Today's ${typeWithUpperCase}`:
            filteredItems = items.filter(item => format(new Date(item.createdAt), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'));
            break;
        case `Yesterday's ${typeWithUpperCase}`:
            const yesterday = subDays(today, 1);
            console.log(yesterday);
            filteredItems = items.filter(item => format(new Date(item.createdAt), 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd'));
            break;
        case `This week ${typeWithUpperCase}`:
            const startOfThisWeek = startOfWeek(today);
            const endOfThisWeek = endOfWeek(today);
            filteredItems = items.filter(item => new Date(item.createdAt) >= startOfThisWeek && new Date(item.createdAt) <= endOfThisWeek);
            break;
        case `This month ${typeWithUpperCase}`:
            const startOfThisMonth = startOfMonth(today);
            const endOfThisMonth = endOfMonth(today);
            filteredItems = items.filter(item => new Date(item.createdAt) >= startOfThisMonth && new Date(item.createdAt) <= endOfThisMonth);
            break;
        case `Last month ${typeWithUpperCase}`:
            const startOfLastMonth = startOfMonth(subDays(today, 30));
            const endOfLastMonth = endOfMonth(subDays(today, 30));
            filteredItems = items.filter(item => new Date(item.createdAt) >= startOfLastMonth && new Date(item.createdAt) <= endOfLastMonth);
            break;
        default:
            break;
    }

    setFilteredDataList(filteredItems);
};

useMemo(() => filterItemsByDate(dataList, selectedOption), [dataList, selectedOption]);

useEffect(() => {
  const filterDataList = [...dataList];

  setFilteredDataList(filterDataList ?? []);

}, [dataList]);

  const totalItems = filteredDataList?.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = filteredDataList?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
  
    setFilteredDataList(filterDataList ?? []);
  }

  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addNewItem = (newItem) => {
    // initialData[type]= [...initialData[type], newItem];
    const itemToBeAdded = {
        leadname: newItem.name,
        phone: newItem.phone,
        email: newItem.email,
        feeQuoted: newItem.fee,
        batchTiming: newItem.time,
        leadStatus: newItem.leadStatus,
        leadSource: newItem.leadSource,
        course: newItem.course,
        selectedClassMode: newItem.classMode
    }
    dispatch(createLeadsApi(itemToBeAdded));
  };

  const getName = (item) => {
    if (type === 'leads') {
      return item.leadname;
    } else if (type === 'oppurtunities') {
      return ImageError.opportunityname;
    }
  }

 
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
            <FaChevronDown className="text-2xl font-light" onClick={handleToggle} />
            
            {/* Dropdown Options */}
            {isOpen && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg top-12 w-60 ml-24">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="p-4 text-gray-700 font-medium hover:bg-gray-100 cursor-pointer text-base border-b-2 rounded-lg">
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </h1>
        </div>
        <div className="flex items center gap-2">
          <div>
          <button onClick={openModal} className="flex items-center border rounded-md px-4 py-1 gap-1">
            {`Create ${type.charAt(0).toUpperCase() + type.slice(1)}`}

            <FaChevronDown className="ml-1 text-xs items-center font-thin" />
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} type={type} addNewItem={addNewItem} />
          </div>
          <button className="flex items-center border rounded-md px-4 py-1 gap-1">
            Actions{" "}
            <FaChevronDown className="ml-1 text-xs items-center font-thin" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center ">
        <div className="items-center">
          <input
            type="text"
            placeholder={`Search ${type} by name or phone...`}
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            className="border p-2 mx-2 inline"
          />
        </div>
        <div className="flex items-center">
          <button className="flex border rounded-l-lg p-2 px-3 w-1/2">
            <Image
              src="/images/table-icon.png"
              alt="table-icon-img"
              width={30}
              height={20}
              className="p-1"
            />
            Table
          </button>
          <button className="flex border rounded-r-lg p-2  w-1/2">
            <Image
              src="/images/kanban-icon.png"
              alt="kanban-icon-img"
              width={30}
              height={20}
              className="p-1"
            />
            Kanban
          </button>
        </div>
      </div>

      <div className="p-4 flex-grow overflow-hidden ">
        <div className="h-full overflow-y-auto">
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
              ) : (
                <>
                  <th className="border-r border-gray-400 ">Created on</th>
                  <th className="border-r border-gray-400 ">Lead Status</th>
                  <th className="border-r border-gray-400 ">Name</th>
                  <th className="border-r border-gray-400 ">Phone</th>
                  <th className="border-r border-gray-400 ">Stack</th>
                  <th className="w-50">Course</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="text-left font-normal">
            {filteredDataList.map((item) => (
              <tr key={item.id} className="cursor-pointer"
              onClick={() => handleRowClick(item.id)}>
                <td className="text-left font-normal"  onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="form-checkbox" />
                </td>
                
                {type === "courses" ? (
                  <>
                  
                    <td className="text-left font-normal">{item.course}</td>
                    <td className="text-left font-normal">
                      {item.description}
                    </td>
                    <td className="text-left font-normal">{item.courseFee}</td>
                  </>
                  
                ) : (
                    
                  <>
                    <td className="text-left font-normal">{item.createdAt}</td>
                    <td className="text-left font-normal">{item.leadStatus}</td>
                    <td className="text-left font-normal">{getName(item)}</td>
                    <td className="text-left font-normal">{item.phone}</td>
                    <td className="text-left font-normal">{item.stack}</td>
                    <td className="text-left font-normal">{item.course}</td>
                    
                  </>
                )}
              </tr>
            ))}
            
          </tbody>
        </table>
        </div>
      </div>

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
    </div>
    </div>
  );
};

export default DataList;
