// components/InvoiceForm.js
"use client"
import { useState } from 'react';

const InvoiceForm = () => {
    const [customerEmail, setCustomerEmail] = useState('');
    const [item, setItem] = useState({ description: '', amount: '', currency: 'usd', quantity: 1 });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formattedItem = {
            ...item,
            amount: parseFloat(item.amount) * 100, // Convert to cents
        };

        const res = await fetch('/api/send-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerEmail, item: formattedItem }),
        });
        const data = await res.json();
        if (data){
            alert(await data.success);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-grey rounded shadow-md">
            <h1 className="text-center font-bold text-2xl mb-4">Payment Link</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full px-4 py-2 border rounded text-gray-800" 
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Customer Email"
                required
            />
                <input className="w-full px-4 py-2 border rounded text-gray-800" 
                    type="text"
                    value={item.description}
                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                    placeholder="Description"
                    required
                />
                <input className="w-full px-4 py-2 border rounded text-gray-800" 
                    type="number"
                    value={item.amount}
                    onChange={(e) => setItem({ ...item, amount: e.target.value })}
                    placeholder="Amount"
                    required
                />
                <input className="w-full px-4 py-2 border rounded text-gray-800" 
                    type="text"
                    value={item.currency}
                    onChange={(e) => setItem({ ...item, currency: e.target.value })}
                    placeholder="Currency"
                    required
                />
                <input className="w-full px-4 py-2 border rounded text-gray-800" 
                    type="number"
                    value={item.quantity}
                    onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value, 10) })}
                    placeholder="Quantity"
                    required
                />
            <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600" type="submit">Create Invoice</button>
        </form>
        </div>
    )
}

export default InvoiceForm;
