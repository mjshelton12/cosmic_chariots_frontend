import { useQuery } from "@apollo/client";
import React from "react";
import "../index.css";
import { QUERY_EXCURSIONS } from "../utils/queries";

function Excursion({ setCurrent }) {
  const { loading, data } = useQuery(QUERY_EXCURSIONS);
  const excursion = data?.excursions || [];
  // console.log("data ", data);
  // console.log("excursion", excursion);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="flex content-start justify-center my-3">
          <a href="#" onClick={() => setCurrent("Main")}>
            <button
              type="button"
              class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Return to Mission Preparations
            </button>
          </a>
        </div>
        <h2 className="text-center text-5xl text-black mb-5">Excursions</h2>
        <div className="flex justify-center">
          <div className="rounded-lg shadow-lg bg-white max-w-sm">
            {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 text-white"> */}
            {excursion.map((excursion) => (
              <div className="border-4 rounded-md border-blue-100 text-white">
                <a key={excursion._id} href={excursion.href} className="group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-blue-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={excursion.imageSrc}
                      alt={excursion.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                </a>
                <div className="bg-blue-100">
                  <h3 className=" text-center underline text-3xl text-black ">
                    {excursion.excursion}
                  </h3>
                  <p className="mt-1  text-center text-lg font-medium text-black">
                    {excursion.description}
                  </p>
                  <p className="mt-3 text-center text-xl font-lg  text-black">
                    {excursion.cost}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="content-start">
          <div class="flex content-start justify-center my-3">
            <a href="#" onClick={() => setCurrent("Main")}>
              <button
                type="button"
                class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Return to Mission Preparations
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Excursion;
