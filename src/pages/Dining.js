
import { useQuery } from '@apollo/client';
import React from "react";
import "../index.css"
import { QUERY_DININGPACKAGES } from '../utils/queries';




  
  export default function Dining() {
    const { loading, data, err} = useQuery(QUERY_DININGPACKAGES);
    const dining = data?.diningPackages || [];
    console.log("data ", data)
    console.log("dining", dining)
    console.error(JSON.stringify(err,null,2));

    return (
      <div className="flex flex-col min-h-screen overflow-hidden ">
   

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center mb-5 text-5xl">DINING PACKAGES</h2>
          <div className="flex justify-center">
          <div className="rounded-lg shadow-lg bg-white max-w-sm">
          {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> */}
            {dining.map((dining) => (
                <>
              <a key={dining._id}  className="group">
                 <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                 <img
                    src={dining.imageSrc}
                    alt={dining.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                 </div> 
              </a>
              <h3 className="mt-4 text-sm text-gray-700">{dining.package}</h3>
              <p className="mt-1 text-lg font-medium text-grey-900">{dining.description}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">{dining.cost}</p>
              </>
            ))}
            </div>
            </div>

          </div>
        </div>
      </div>

     
    )
  }


  