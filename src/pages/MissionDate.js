import { useQuery, useMutation } from '@apollo/client';
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../index.css"
import { QUERY_MISSIONS } from '../utils/queries';
import Header from '../components/Header';
import Legal from '../components/Legal';
import Footer from '../components/Footer';
import { CREATE_RESERVATION, UPDATE_RESERVATION_MISSIONDATE } from '../utils/mutations';


export default function MissionDate(props) {

  const [ mission, setMission] = useState({})
  const { loading, data } = useQuery(QUERY_MISSIONS, {});
  const missionDate = data?.missionDates|| [];
  console.log("data", data)
  console.log("mission dates", missionDate)
  const location = useLocation();
  const navigate = useNavigate();
  const reservationId = ""

  console.log("props", location)

  const locArray = []

  for(let i=0;i<missionDate.length;i++){
    if (missionDate[i].location === location.state.name){
      locArray.push(missionDate[i])
    }
  }
  console.log("location array", locArray)

  const [createReservation] = useMutation(CREATE_RESERVATION)

  const toRoomTypes = () => {
    navigate('/roomtype', {reservationId: reservationId})
  }

  const [updateReservationMissionDate, { error }] = useMutation(UPDATE_RESERVATION_MISSIONDATE, {
    variables: {reservationId: reservationId, input:{ _id:mission._id, date: mission.date, destination: mission.destination}}
  })

  
  const  handleClick = async (event) => {
    let missionId = event.target.id
    
    for(let i=0; i<locArray.length; i++){
      if(locArray[i]._id === missionId){
        setMission(locArray[i])
      }
    }

    try {
      const { data } = await createReservation({});

      reservationId = data._id
      console.log("reservationId", data)
      console.log("Success!")

      const { dat } = await UPDATE_RESERVATION_MISSIONDATE({})

      
      toRoomTypes()

    }
    catch (err) {
    console.error(JSON.stringify(err,null,2));
    }

    navigate('/mission', {reservationId: reservationId})

  }

  


  return (
 <>
  <Header />
      <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
  
        <h2 className="text-center text-5xl text-black mb-5">Your Mission, Should You Choose to Accept</h2>
        <div className="flex justify-center">
        <div className="rounded-lg shadow-lg bg-white max-w-sm">

          {locArray.map((missionDate) => (

            <div className="border-4 rounded-md border-blue-100 text-white">
                <div className="bg-blue-100">
                <h3 className=" text-center underline text-3xl text-black ">
                  {missionDate.destination}
                </h3>
                <p className="mt-1  text-center text-lg font-medium text-black">
                  {missionDate.date}
                </p>
                <p className="mt-3 text-center text-xl font-lg  text-black">
                  {missionDate.description}
                </p>
                <a
              
              className="mt-3 mb-4 ml-16 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700" id={missionDate._id} onClick={handleClick}
            >
              Start A Reservation
            </a>
               </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  <Legal />
  <Footer />
 </>

  );
}
