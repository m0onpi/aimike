// app/products/page.tsx
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover"/>
            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
