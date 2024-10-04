
"use client"
import { useRouter } from "next/navigation";
import Charts from '../chartComponent/charts';
import { useEffect, useState, useCallback } from 'react';

function Dashboard() {
    const router = useRouter();
    const [leadsByHour, setLeadsByHour] = useState([]);
    const [leadsByStatus, setLeadsByStatus] = useState([]);
    const [totalLeads, setTotalLeads] = useState(0);

    // Define text colors for each lead status
    const statusColors = {
        'Not Contacted': 'text-red-600',
        'Attempted': 'text-green-600',
        'Warm Lead': 'text-yellow-600',
        'Cold Lead': 'text-blue-600',
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!savedToken) {
            router.push('/');
        }
    }, [router]);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



    // Process leads to ensure 24-hour data in IST format
    const processLeadsByHour = useCallback((leads) => {
        const hoursInDay = Array.from({ length: 24 }, (_, i) => i); // 0 to 23
        const leadsPerHour = hoursInDay.map((hour) => {
            const leadForHour = leads.find((lead) => {
                const localTime = new Date(lead.hour).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    hour: '2-digit',
                    hour12: false,
                });
                return parseInt(localTime) === hour;
            });
            return {
                hour: hour.toString().padStart(2, '0') + ':00',
                leadCount: leadForHour ? parseInt(leadForHour.leadCount) : 0,
            };
        });
        return leadsPerHour;
    }, []);

    // Function to process leads by status
    const processLeadsByStatus = useCallback((leads) => {
        const statusLabels = ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'];
        const statusData = statusLabels.map((status) => {
            const lead = leads.find(lead => lead.leadStatus === status);
            return lead ? parseInt(lead.leadCount) : 0;
        });

        const total = statusData.reduce((acc, count) => acc + count, 0); // Calculate total leads

        return {
            processedLeadsByStatus: {
                labels: statusLabels,
                data: statusData,
            },
            total,
        };
    }, []);

    useEffect(() => {
        const fetchLeadsData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/leadstatus/todayLeadsOnHourly`);
                const result = await response.json();
                const leads = result.data;

                // Process leads by time
                const processedLeadsByHour = processLeadsByHour(leads);

                // Fetch lead status data
                const statusResponse = await fetch(`${API_BASE_URL}/leadstatus/getleadStatus`);
                const statusResult = await statusResponse.json();
                const { processedLeadsByStatus, total } = processLeadsByStatus(statusResult.data);

                setLeadsByHour(processedLeadsByHour);
                setLeadsByStatus(processedLeadsByStatus);
                setTotalLeads(total);
            } catch (error) {
                console.error('Error fetching leads data:', error);
            }
        };

        fetchLeadsData();
    }, [API_BASE_URL, processLeadsByHour, processLeadsByStatus]);

    return (
        <div className="min-h-screen bg-slate-100 py-8">
            <div className="container mx-auto">
                <h1 className="text-center text-3xl font-bold mb-8">Leads Dashboard</h1>

                {/* Lead Count Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 px-5">
                    {leadsByStatus.labels && leadsByStatus.labels.map((label, index) => (
                        <div key={label} className="bg-white shadow-md rounded-lg p-4 text-center">
                            <h2 className={`text-xl font-semibold ${statusColors[label]}`}><span className="material-icons text-3xl">badge</span>{label}</h2>
                            <p className="text-2xl font-bold">{leadsByStatus.data[index]}</p>
                        </div>
                    ))}
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-xl font-semibold text-purple-600">Total Leads</h2>
                        <p className="text-2xl font-bold">{totalLeads}</p>
                    </div>
                </div>

                <Charts leadsByHour={leadsByHour} leadsByStatus={leadsByStatus} />
            </div>
        </div>
    );
}

export default Dashboard;
