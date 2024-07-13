"use client"
import { useState } from 'react';

const LocationForm = () => {
    const [location, setLocation] = useState('');
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
                body: JSON.stringify({ location }),
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

    return (
        <div className="max-w-md mx-auto p-4 bg-grey rounded shadow-md">
            <h1 className="text-center font-bold text-2xl mb-4">Get GPS Coordinates and Local Leads</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full px-4 py-2 border rounded text-gray-800"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter Location"
                    required
                />
                <button
                    className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
                    type="submit"
                >
                    Get Coordinates
                </button>
            </form>
            {coordinates && (
                <div className="mt-4 p-4 bg-white rounded shadow-md">
                    <h2 className="text-xl font-bold ">Coordinates</h2>
                    <p className="text-xl font-bold text-gray-800">{coordinates.lat}, {coordinates.lon}</p>
                </div>
            )}
            {localLeads.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">Local Leads</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-gray-800">Name</th>
                                <th className="py-2 px-4 border-b text-gray-800">Address</th>
                                <th className="py-2 px-4 border-b text-gray-800">Rating</th>
                                <th className="py-2 px-4 border-b text-gray-800">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localLeads.map((lead, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-gray-800">{lead.name}</td>
                                    <td className="py-2 px-4 border-b text-gray-800">{lead.full_address}</td>
                                    <td className="py-2 px-4 border-b text-gray-800">{lead.rating}</td>
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        <a href={lead.place_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View on Map</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {error && (
                <div className="mt-4 p-4 bg-red-200 text-red-800 rounded shadow-md">
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}

export default LocationForm;
