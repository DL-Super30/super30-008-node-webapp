// components/SelectedLeadsInfo.js
"use client"
import { useSelector } from 'react-redux';

export default function SelectedLeadsInfo() {
  const selectedLeads = useSelector(state => state.leads.selectedLeads);
  const allLeads = useSelector(state => state.leads.leads);

  const selectedLeadsData = allLeads.filter(lead => selectedLeads.includes(lead.id));
  console.log(selectedLeads);

  return (
    <div>
      <h2>Selected Leads</h2>
      {selectedLeadsData.map(lead => (
        <div key={lead.id}>
          <p>{lead.name} - {lead.phone}</p>
        </div>
      ))}
    </div>
  );
}