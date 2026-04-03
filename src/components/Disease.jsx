import { DiseaseDetails } from './DiseaseDetails'
import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Disease() {
  const [search, setSearch] = useState("");

  const result = DiseaseDetails.filter((DiseaseData) =>
    DiseaseData.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-8 px-4 md:px-8">
      
      {/* Search Bar */}
      <div className='max-w-md mx-auto mb-8'>
        <input 
          id='search-bar' 
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          type="text" 
          placeholder='Search diseases...' 
          className='w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition text-sm md:text-base' 
        />
      </div>

      {/* Disease Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto'>
        {result.length > 0 ? (
          result.map((data, index) => (
            <Link key={index} to={`/detailpage/${data.slug}`}>
              <div className='bg-white overflow-hidden h-full border border-pink-200 rounded-xl transform transition duration-300 hover:scale-[1.02] hover:shadow-xl'>
                <div className='aspect-video overflow-hidden'>
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-4'>
                  <h2 className='font-bold text-lg md:text-xl text-pink-700 mb-2 line-clamp-1'>{data.title}</h2>
                  <p className='text-gray-600 text-sm md:text-base line-clamp-3'>{data.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full py-12">
            No disease found.
          </p>
        )}
      </div>
    </div>
  )
}
