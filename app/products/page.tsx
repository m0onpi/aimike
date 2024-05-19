// app/products/page.tsx
"use client"
import { useState } from 'react';

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function Page() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Product = { name, description, price, stock };
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      await createProduct(event);
      // Reset form or display success message
    } catch (error) {
      console.error(error);
      // Display error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        placeholder="Stock"
      />
      <button type="submit">Create Product</button>
    </form>
  );
}
