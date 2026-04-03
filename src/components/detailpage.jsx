import React from "react";
import { useParams } from "react-router-dom";
import { DiseaseDetails } from "./DiseaseDetails";
// import { Detailspage } from "./Detailspage";

export default function DetailPage() {
    const { slug } = useParams();
    const disease = DiseaseDetails.find((d) => d.slug === slug);

    return (
        <>
            <div className="mt-[8rem] ml-[4rem]">

              <h1 className="text-3xl font-semibold text-white bg-pink-500 px-6 py-2 rounded-full shadow-lg inline-block">
  {disease.title}
</h1>
                <div className="mt-[2.5rem] text-center flex">
                    <div>
                        <img
                            src={disease.image}
                            alt={disease.title}
                            className="mx-auto mt-5 w-[400px] rounded-lg shadow-lg mr-[4rem]"
                        />
                    </div>
                    <div className="">
                        <p className=" mt-[5rem] text-left text-gray-900 text-2xl mx-auto max-w-2xl">
                            {disease.description}
                        </p>
                        
                    </div>
                    
                </div>
                <div>
                       <p className="mt-[2.5rem] text-left text-gray-700 text-lg ">
                            {disease.para}
                        </p>
                    </div>
            </div></>
    );
}
