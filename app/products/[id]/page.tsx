// app/products/[id]/page.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

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
        <img src={product.images[0]} alt={product.name} className="w-1/2 h-96 object-cover"/>
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
