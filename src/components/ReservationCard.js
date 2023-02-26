
import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_RESERVATION } from "../utils/queries";
import { DELETE_RESERVATION } from "../utils/mutations"

export default function ReservationCard({ id }) {
  const reservationId = id;

  const [deleteReservation] = useMutation(DELETE_RESERVATION, {variables: { reservationId: reservationId }})

  const { loading, data, err } = useQuery(QUERY_RESERVATION, {
    variables: { reservationId: reservationId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err) {
    return `Error! ${err}`;
  }

 ;

  const handleDelete = async (event) => {
    event.preventDefault()

    try {
      await deleteReservation({});

    } catch (err) {
      console.error(JSON.stringify(err,null,2));
    }

    window.location.reload()
  };

  let cardData = (<p></p>)

  if(data.reservation != null){
    let excursions = "No Excursions Booked";
    if (data.reservation.excursion) {
      const array = [];
      for (let i = 0; i < data.reservation.excursion.length; i++) {
        array.push(data.reservation.excursion[i].excursion);
      }
      excursions = array.join(', ');
    }
  
    let activities = "No Activities Booked";
    if (data.reservation.on_board_activity) {
      const array = [];
      for (let i = 0; i < data.reservation.on_board_activity.length; i++) {
        array.push(data.reservation.on_board_activity[i].on_board_activity);
      }
      activities = array.join(', ');
    }
  
    let dining = "No Packages Booked";
    if (data.reservation.dining_package) {
      const array = [];
      for (let i = 0; i < data.reservation.dining_package.length; i++) {
        array.push(data.reservation.dining_package[i].dining_package);
      }
      dining = array.join(', ');
    }

    cardData = (<div class="max-w-lg w-full lg:max-w-full lg:flex">
    <div className="w-screen border-b border-gray-400 lg:border-l-0 lg:border-b lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <p className="text-sm text-gray-600 flex items-center">
          Launch Date {data.reservation.mission.date}
        </p>
        <div className="text-gray-900 font-bold text-xl mb-2">
          {data.reservation.mission.destination}
        </div>
        <p className="text-gray-700 text-base">
          Suite: {data.reservation.room_type.suite}
        </p>
        <p className="text-gray-700 text-base">
          Planet Excursions Booked: {excursions}
        </p>
        <p className="text-gray-700 text-base">
          On-Board Activities Scheduled: {activities}
        </p>
        <p className="text-gray-700 text-base">Dining Packages: {dining}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p className="text-gray-900 leading-none">See you on board soon!</p>
        </div>
        <div><button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" id={data.reservation._id} onClick={handleDelete}>Delete</button></div>
      </div>
    </div>
  </div>)
  }

  return (
    <>
      <div>{cardData}</div>
    </>
  );
}
