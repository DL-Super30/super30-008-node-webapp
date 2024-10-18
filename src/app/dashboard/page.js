"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getLeadsApi, getTodayLeadsApi } from "@/slices/leadsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.leads?.todayLeads);
  const leadsData = useSelector((state) => state.leads?.leads);
  const [tableDataView, setTableDataView] = useState();
  const [leadLineChartData, setLeadLineChartData] = useState();
  const [leadPieChartData, setLeadPieChartData] = useState();
  const[totalLeads, setTotalLeads] = useState();
  const [leadOptions, setLeadOptions] = useState({
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Time (Hourly)",
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Number of Leads",
        },
        ticks: {
          stepSize: 0.5,
              },
      },
    },
  });

  useEffect(() => {
    dispatch(getLeadsApi());
    dispatch(getTodayLeadsApi());
  }, []);

  useEffect(() => {
    const leadData = [];
    const dataSet = [];
    let totalLeads = 0;
    const labels = [
      "12am",
      "1am",
      "2am",
      "3am",
      "4am",
      "5am",
      "6am",
      "7am",
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
      "10pm",
      "11pm",
    ];
    dataList.forEach((lead) => {
      const time = new Date(lead.hour).getHours();
      const hour = time > 12 ? `${time - 12}pm` : `${time}am`;
      leadData.push({ hour, leadCount: lead.leadCount });
      totalLeads += Number(lead.leadCount);
    });
    labels.forEach((label) => {
      const selectedLead = leadData.find((lead) => lead.hour === label);
      if (selectedLead) {
        dataSet.push(selectedLead.leadCount);
      } else {
        dataSet.push(0);
      }
    });
    const data = {
      labels: [
        "12am",
        "1am",
        "2am",
        "3am",
        "4am",
        "5am",
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
        "8pm",
        "9pm",
        "10pm",
        "11pm",
      ],
      datasets: [
        {
          label: `Today's Lead`,
          data: dataSet,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    setLeadLineChartData(data);
  }, [dataList]);

  useEffect(() => {
    const tableViewData = {
      notContacted: leadsData.filter(
        (item) => item.leadStatus === "notContacted"
      ).length,
      attempted: leadsData.filter((item) => item.leadStatus === "attempted")
        .length,
      warmLead: leadsData.filter((item) => item.leadStatus === "warmLead")
        .length,
      coldLead: leadsData.filter((item) => item.leadStatus === "coldLead")
        .length,
    };
    const totalLeads =
      tableViewData.notContacted +
      tableViewData.attempted +
      tableViewData.warmLead +
      tableViewData.coldLead;
    const leadPieData = {
      labels: ["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"],
      datasets: [
        {
          data: [
            tableViewData.notContacted,
            tableViewData.attempted,
            tableViewData.warmLead,
            tableViewData.coldLead,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 180, 50)",
            "rgb(54, 162, 235)",
            "rgb(22, 163, 74)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setTotalLeads(totalLeads);
    setTableDataView(tableViewData);
    setLeadPieChartData(leadPieData);
  }, [leadsData]);

  return (
    <div className="gap-4">
        <div className="m-5 ml-15 flex gap-5">
          <div
            className=" flex flex-row gap-3 border border-transparent rounded shadow-lg w-1/6 items-center"
          >
             <Image
              src="/images/customers-icon.png"
              alt="costomers-img"
              width={16}
              height={16}
              className="w-8 h-8"
            />
            <div>
            <p>Not Contacted</p>
            <p className="px-2 font-bold">{tableDataView?.notContacted}</p>
            </div>
          </div>
          <div
            className=" flex flex-row gap-1 border border-transparent rounded shadow-lg w-1/6 items-center"
          >
             <Image
              src="/images/customers-icon.png"
              alt="costomers-img"
              width={16}
              height={16}
              className="w-8 h-8"
            />
            <div>
            <p>Attempted</p>
            <p className="px-2 font-bold">{tableDataView?.attempted}</p>
            </div>
          </div>
          <div
            className=" flex flex-row gap-1 border border-transparent rounded shadow-lg w-1/6 items-center"
          >
             <Image
              src="/images/customers-icon.png"
              alt="costomers-img"
              width={16}
              height={16}
              className="w-8 h-8"
            />
            <div>
            <p>Warm Lead</p>
            <p className="px-2 font-bold">{tableDataView?.warmLead}</p>
            </div>
          </div>
          <div
            className=" flex flex-row gap-1 border border-transparent rounded shadow-lg w-1/6 items-center"
          >
             <Image
              src="/images/customers-icon.png"
              alt="costomers-img"
              width={16}
              height={16}
              className="w-8 h-8"
            />
            <div>
            <p>Cold Lead</p>
            <p className="px-2 font-bold">{tableDataView?.coldLead}</p>
            </div>
          </div>
        </div>
      <div className="flex flex-row items-center gap-2">
        <div className="w-1/2 flex justify-center p-4">
          {leadLineChartData && (
            <Line data={leadLineChartData} options={leadOptions} />
          )}
        </div>
        <div className="w-1/2 flex justify-center p-4">
        <div className=" flex flex-col gap-2 items-center justify-center w-80 h-80">
        <h3 className="flex text-2xl font-semibold text-violet-900 text-center">TotalLeads-<p>{totalLeads}</p></h3>
          {leadPieChartData && (
            <Pie className="w-24 h-24" data={leadPieChartData} options={{}} />
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
