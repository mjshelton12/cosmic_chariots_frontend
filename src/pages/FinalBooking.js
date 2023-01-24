// import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { QUERY_RESERVATION, QUERY_ROOMTYPES } from "../utils/queries"
import { ADD_RESERVATION } from "../utils/mutations";
import { useNavigate, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

import Header from "../components/Header"
import Footer from "../components/Footer"
import AcctHdrImg from '../images/starship.jpg';

export default function FinalBooking(props) {
  const navigate = useNavigate();
  const location = useLocation()
  // console.log("props", location)
  const resId = location.state.reservationId
  // console.log("resId", resId)

  const {loading,data, err} = useQuery(QUERY_RESERVATION, {
    variables: { reservationId: location.state.reservationId}
  })

  // console.log("resData", data)
  const userId = Auth.getProfile().data._id
  // console.log("user", userId)

  const [AddReservation, { error }] = useMutation(ADD_RESERVATION,{
    variables: {userId: userId, reservationId: resId}
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err) {
    return `Error! ${err}`;
  }

    const  handleClick = async (event) => {
      
      try{
        if (Auth.loggedIn()){
          const { data } = await AddReservation({
            variables: {userId: userId, reservationId: resId}
          })

          console.log("Success!")
          alert("Reservation booked!")
          navigate('/account')
        } else {
          console.log("Not Logged In!")
        }
      }
      catch (err){
        console.error(JSON.stringify(err,null,2));
      }
   
    }
    

  return (
    <>
    <div className="flex flex-col min-h-screen  ">
      <Header />

        <div className="flex-grow">
          <div class="relative flex items-center justify-self-center h-screen mb-12 ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div >
            <div className="pt-12 md:pt-16 w-full flex flex-col h-screen text-center ">
              <img src={AcctHdrImg} className="rounded" data-aos="fade-down" />

              <div class="text-gray-900 font-bold text-3xl mb-2 pt-5">
                {data.reservation.mission.destination}
              </div>
              <p class="text-blue-500 text-xl">
                Launch Date: {data.reservation.mission.date}
              </p>
              <p class="text-blue-500 text-xl">
                Suite: {data.reservation.room_type.suite}
              </p>              
            
            </div>
            <div class="relative flex items-center justify-center content-center">
              <button class="rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-center font-medium text-white hover:bg-indigo-700" onClick={handleClick}>Book Reservation!</button>
            </div>
          </div>
        </div>
          </div>
        </div>

      <Footer />
    </div>

    </>
  )
}