'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function AdminDashboard() {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch users who have paid
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/getPaidUsers');
        const data = await response.json();
        setUsers(data.users || []); // Safeguard against undefined data.users
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFetchBids = async (userId) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/admin/fetchBids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Bids fetched successfully for user ${userId}`);
        // Update user status or re-fetch users if needed
      } else {
        setMessage(`Error fetching bids: ${data.error}`);
      }
    } catch (error) {
      setMessage('An error occurred while fetching bids.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {message && (
        <div className={`mb-4 p-2 ${message.startsWith('Error') ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-900">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-900">Email</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-900">Project Status</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 px-4 text-gray-900">{user.name}</td>
                <td className="py-2 px-4 text-gray-900">{user.email}</td>
                <td className="py-2 px-4">
                  <Link legacyBehavior href={`/admin/${user.id}`}>
                    <a className="text-indigo-600 hover:text-indigo-900">View Details</a>
                  </Link>
                  </td>
                <td className="py-2 px-4 text-gray-900">{user.hasProject ? 'Project Created' : 'No Project'}</td>
                <td className="py-2 px-4 text-gray-900">
                    
                  <button
                    onClick={() => handleFetchBids(user.projectId)}
                    className="bg-indigo-600 text-white py-1 px-4 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                    disabled={loading}
                  >
                    {loading ? 'Fetching...' : 'Fetch Bids'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
