"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex">
        <img src={product.images[0]} alt={product.name} className="w-1/2 h-96 object-cover" />
        <div className="ml-10">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-4">${product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <button className="bg-blue-500 text-white mt-4 py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
