import { DiseaseDetails } from './DiseaseDetails'
import React, { useState } from "react";

export default function Disease() {

  const [search, setSearch] = useState("");

  const result = DiseaseDetails.filter((DiseaseData) =>
    DiseaseData.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
    <div className="mt-[7.5rem]">
      <div className='ml-16 mt-[8.5rem]'>
        <input id='search-bar' value={search}
          onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search..... ' className='w-[19rem] px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400' />
      </div>

      <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-x-[1rem] mx-[4rem] mt-[3rem] '>

        {result.length > 0 ? (

          result.map((data, index) => (
            <div key={index}>

              <div className='h-[23rem] w-[23rem] border border-pink-300  rounded-md object-cover transform transition duration-500 hover:scale-105 hover:brightness-90 hover:shadow-xl'>

                <img src={data.image} alt={data.title} />
                <h1 className='font-bold text-2xl m-3 text-pink-700'>{data.title}</h1>
                <p className='m-3 text-gray-800'>{data.description}</p>

              </div>

            </div>
          ))
        ) :
          (
            <p className="text-gray-500 text-center col-span-full">
              No disease found.
            </p>)
        }
      </div>
      </div>
    </>
  )
}
