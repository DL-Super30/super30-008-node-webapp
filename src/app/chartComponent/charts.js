import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import React from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Charts = ({ leadsByHour, leadsByStatus }) => {
    // Line chart data (Leads by Time)
    const lineData = {
        labels: leadsByHour.map((lead) => lead.hour), // 24-hour format in IST
        datasets: [
            {
                label: 'Leads per Hour',
                data: leadsByHour.map((lead) => lead.leadCount), // Lead counts per hour
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,  // Smooth line
            },
        ],
    };

    // Doughnut chart data (Leads by Status)
    const doughnutData = {
        labels: leadsByStatus.labels,
        datasets: [
            {
                label: 'Leads by Status',
                data: leadsByStatus.data,  // Array with counts of each status
                backgroundColor: ['#f87171', '#4ade80', '#facc15', '#60a5fa'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="flex flex-col md:flex-row justify-around items-center w-full space-y-8 md:space-y-0 md:space-x-8 ">
            {/* Line Chart */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-center text-xl font-bold mb-4">Today&apos;s Leads by Time</h2>
                <Line data={lineData} options={{
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                text: 'Hour of the Day (IST 24-hour format)',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Lead Count',
                            },
                        },
                    },
                }} />
            </div>

            {/* Doughnut Chart */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-center text-xl font-bold mb-4">Leads by Status</h2>
                <Doughnut data={doughnutData} />
            </div>
        </div>
    );
};

export default Charts;