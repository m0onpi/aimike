"use client"
import { useState } from 'react';

const LocationForm = () => {
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [localLeads, setLocalLeads] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error

        try {
            const res = await fetch('/api/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location, category }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data.success) {
                setCoordinates(data.coordinates);
                setLocalLeads(data.localLeads); // Set the local leads
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const formatContacts = (contacts) => {
        return Object.entries(contacts).map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map((item, index) => (
                    <div key={`${key}-${index}`}>{`${key}: ${item}`}</div>
                ));
            }
            return <div key={key}>{`${key}: ${value}`}</div>;
        });
    };

    const exportToCSV = () => {
        const headers = ["Name", "Address", "Rating", "Emails and Contacts", "Link"];
        const rows = localLeads.map(lead => [
            lead.name,
            lead.full_address,
            lead.rating,
            JSON.stringify(lead.emails_and_contacts),
            lead.place_link
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(row => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "local_leads.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="flex space-x-4 p-4">
            <div className="w-1/3 bg-grey rounded shadow-md p-4">
                <h1 className="text-center font-bold text-2xl mb-4">Get Leads From Area</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full px-4 py-2 border rounded text-gray-800"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter Location"
                        required
                    />
                    <input
                        className="w-full px-4 py-2 border rounded text-gray-800"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter Category"
                        required
                    />
                    <button
                        className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
                        type="submit"
                    >
                        Get Leads
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-4 bg-red-200 text-red-800 rounded shadow-md">
                        <p>{error}</p>
                    </div>
                )}
            </div>
            <div className="w-2/3 bg-white rounded shadow-md p-4">
                {localLeads.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Local Leads</h2>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-gray-800">Name</th>
                                    <th className="py-2 px-4 border-b text-gray-800">Address</th>
                                    <th className="py-2 px-4 border-b text-gray-800">Emails and Contacts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localLeads.map((lead, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b text-gray-800">{lead.name}</td>
                                        <td className="py-2 px-4 border-b text-gray-800">{lead.full_address}</td>
                                        <td className="py-2 px-4 border-b text-gray-800">{formatContacts(lead.emails_and_contacts)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={exportToCSV}
                            className="w-full bg-blue-700 text-white py-2 mt-4 rounded hover:bg-blue-600"
                        >
                            Export to CSV
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LocationForm;
