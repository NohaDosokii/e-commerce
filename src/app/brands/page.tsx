'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllBrands, getBrandById } from '../_services/brands.services';

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true);
        const data = await getAllBrands();
        setBrands(data || []);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  const handleCardClick = async (brandId: string) => {
    try {
      setLoading(true);
      const brandData = await getBrandById(brandId);
      setSelectedBrand(brandData);
    } finally {
      setLoading(false); 
    }
  };

  const closeModal = () => setSelectedBrand(null);

  return (
    <div className="container mx-auto px-4 py-10 relative">
     
        {loading && (
  <div className="fixed inset-0 bg-gray-500/20 flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-white border-t-[#77756b] rounded-full animate-spin" />
  </div>
)}

      <h1 className="text-4xl font-semibold text-center mb-12 text-[#524f46]">
        All Brands
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => handleCardClick(brand._id)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center border border-gray-100 group cursor-pointer"
          >
            <div className="w-40 h-45 relative mb-4 flex items-center justify-center">
              <Image
                src={brand.image}
                alt={brand.name}
                width={140}
                height={100}
                className="object-contain max-h-24"
                unoptimized
              />
            </div>
            <h2 className="text-xl font-medium text-[#3E3C34] group-hover:text-[#77756b] transition-colors">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-80 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              ✕
            </button>

            <div className="w-30 h-25 relative mx-auto mb-4">
              <Image
                src={selectedBrand.image}
                alt={selectedBrand.name}
                width={120}
                height={120}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>

            <h1 className="text-2xl font-bold text-[#524f46] mb-2 text-center">
              {selectedBrand.name}
            </h1>
            <p className="text-gray-500 text-center mb-4">
              {selectedBrand.slug}
            </p>

            <button
              onClick={closeModal}
              className="mt-2 w-full py-2 bg-[#77756b] text-white rounded-lg hover:bg-[#524f46] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
