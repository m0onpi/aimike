"use client"
import { useState } from 'react';

interface JobResponse {
    success: boolean;
    projectId?: number;
    status?: string;
    error?: string;
}

const JobRequestForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budgetMin, setBudgetMin] = useState('');
    const [budgetMax, setBudgetMax] = useState('');
    const [currencyId, setCurrencyId] = useState(3); // Default currency ID
    const [jobIds, setJobIds] = useState<number[]>([]);
    const [response, setResponse] = useState<JobResponse | null>(null);
    const [error, setError] = useState<string>('');

    const handleJobIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.target.value);
        if (e.target.checked) {
            setJobIds([...jobIds, id]);
        } else {
            setJobIds(jobIds.filter(jobId => jobId !== id));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Reset error

        try {
            const res = await fetch('/api/job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    budget: {
                        minimum: parseInt(budgetMin),
                        maximum: parseInt(budgetMax),
                    },
                    currency: {
                        id: currencyId, // Example: USD (ID: 1)
                    },
                    jobs: jobIds.map(id => ({ id })), // Converts jobIds array to the required format
                }),
            });

            const data: JobResponse = await res.json();

            if (res.ok && data.success) {
                setResponse(data);
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        }
    };

    return (
        <div className="flex space-x-4 p-4">
            <div className="w-1/3 bg-grey rounded shadow-md p-4">
                <h1 className="text-center font-bold text-2xl mb-4">Request a Job</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full px-4 py-2 border rounded text-gray-800"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Job Title"
                        required
                    />
                    <textarea
                        className="w-full px-4 py-2 border rounded text-gray-800"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Job Description"
                        required
                    />
                    <input
                        className="w-full px-4 py-2 border rounded text-gray-800"
                        type="number"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        placeholder="Minimum Budget"
                        required
                    />
                    <input
                        className="w-full px-4 py-2 border rounded text-gray-800"
                        type="number"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        placeholder="Maximum Budget"
                        required
                    />
                    <div className="space-y-2">
                        <label className="block font-bold text-gray-800">Job Categories:</label>
                        <label>
                            <input
                                type="checkbox"
                                value={3}
                                onChange={handleJobIdChange}
                            />
                            PHP
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value={17}
                                onChange={handleJobIdChange}
                            />
                            Website Design
                        </label>
                        {/* Add more job categories as needed */}
                    </div>
                    <button
                        className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
                        type="submit"
                    >
                        Submit Job Request
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-4 bg-red-200 text-red-800 rounded shadow-md">
                        <p>{error}</p>
                    </div>
                )}
            </div>
            <div className="w-2/3 bg-white rounded shadow-md p-4">
                {response && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Job Request Successful</h3>
                        <p className="text-gray-800">Project ID: {response.projectId}</p>
                        <p className="text-gray-800">Status: {response.status}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobRequestForm;
