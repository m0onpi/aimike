"use client"
import { useState } from 'react';

const ChatForm = () => {
    const [chat, setChat] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const messages = [{ role: 'user', content: chat }];
        
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        });
        
        const data = await res.json();
        
        if (data.success) {
            setResponse(data.response);
        } else {
            setResponse('Error: ' + data.error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-grey rounded shadow-md">
            <h1 className="text-center font-bold text-2xl mb-4">Chat</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    className="w-full px-4 py-2 border rounded text-gray-800" 
                    type="text"
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                    placeholder="Enter Message"
                    required
                />
                <button 
                    className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600" 
                    type="submit"
                >
                    Enter Chat
                </button>
            </form>
            {response && (
                <div className="mt-4 p-4 bg-white rounded shadow-md">
                    <h2 className="w-full px-4 py-2 border rounded text-gray-800" >Response</h2>
                    <p className="w-full px-4 py-2 border rounded text-gray-800">{response}</p>
                </div>
            )}
        </div>
    )
}

export default ChatForm;
