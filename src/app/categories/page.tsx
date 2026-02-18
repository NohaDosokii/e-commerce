'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllCategories, getSubcategoriesByCategoryId } from '../_services/category.service';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCategories();
      setCategories(data || []);
    }
    fetchData();
  }, []);

  const handleCategoryClick = async (id: string, name: string) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);

    setLoading(true); 

    const subs = await getSubcategoriesByCategoryId(id);
    setSubcategories(subs);

    setLoading(false); 
  };

  return (
    <div className="container mx-auto px-4 py-10 relative">
      <h1 className="text-4xl font-semibold text-center mb-12 text-[#524f46]">
        All Categories
      </h1>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => handleCategoryClick(cat._id, cat.name)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl cursor-pointer text-center transition"
          >
            <div className="w-full h-56 relative mx-auto mb-4">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <h2 className="text-xl font-medium">{cat.name}</h2>
          </div>
        ))}
      </div>

     
      {selectedCategoryId && (
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-[#77756b]">
            {selectedCategoryName} subcategories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((sub) => (
              <div
                key={sub._id}
                className="border p-5 rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg transition text-center font-medium"
              >
                {sub.name}
              </div>
            ))}
          </div>
        </div>
      )}

   {loading && (
  <div className="fixed inset-0 bg-gray-500/20 flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-white border-t-[#77756b] rounded-full animate-spin" />
  </div>
)}

    </div>
  );
}
