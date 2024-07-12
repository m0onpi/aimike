"use client"
import { useState } from 'react';

const LocationForm = () => {
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error

        const res = await fetch('/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location }),
        });

        const data = await res.json();

        if (data.success) {
            setCoordinates(data.coordinates);
        } else {
            setError(data.error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-grey rounded shadow-md">
            <h1 className="text-center font-bold text-2xl mb-4">Get GPS Coordinates</h1>
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
                    <h2 className="text-xl font-bold">Coordinates</h2>
                    <p>{coordinates.lat}, {coordinates.lng}</p>
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
