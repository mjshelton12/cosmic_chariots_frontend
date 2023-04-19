import { useQuery, useMutation } from '@apollo/client'
import React,{ useState } from "react";
import "../index.css";
import { QUERY_ROOMTYPES } from '../utils/queries';
import { UPDATE_RESERVATION_ROOM_TYPE } from '../utils/mutations';
import { useLocation, useNavigate } from "react-router-dom";

import Header from '../components/Header';
import Legal from '../components/Legal';
import Footer from '../components/Footer';

export default function RoomType({reservationId}) {
  const [myRoom, setMyRoom] = useState({})

  const location = useLocation();
  // console.log("reservationId", location.state.reservationId)
  const resId = location.state.reservationId

  const navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_ROOMTYPES);
  const roomType = data?.roomTypes || [];

  const toFinalBooking = (resId) => {
    navigate('/finalbooking', {state:{id:1, reservationId: resId}})
  }

  const [updateReservationRoomType, { error }] = useMutation(UPDATE_RESERVATION_ROOM_TYPE, {
    variables: {reservationId: reservationId, input: {_id: myRoom._id, suite: myRoom.suite}},
});

  const  handleClick = async (event) => {
    let clickedRoom = event.target.id

    const roomSelected = roomType.find(obj => {
      return obj._id === clickedRoom;
    })

    try {
      const { data } = await updateReservationRoomType({
        variables: {reservationId: resId, input: {_id: roomSelected._id, suite: roomSelected.suite}}
      })

      toFinalBooking(resId)
    }
    catch (err) {
    console.error(JSON.stringify(err,null,2));
    }

    // navigate('/finalbooking', {reservationId: reservationId})

  }


  return (
    <>
    <Header />
    <div className="bg-white">


      {/*  Page content */}
      <div>
      <div className="bg-white">
      <div className="mx-auto max-w-2xl py-24 px-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div>
              <h1 className="text-5xl text-center p-9">Fly in Comfort and Style</h1>
              <div className="flex justify-center gap-x-10">
              {roomType.map((roomType) => (
                <div className="justify-center text-center mt-1 text-lg font-medium text-gray-900 border w-full rounded-md shadow-lg" key={roomType._id} >
                  <p className="underline m-3 text-3xl font-medium text-gray-900 ">{roomType.suite}</p>
            
                  <ul>
                    Amenities include:
                    <li className=''>{roomType.amenities_1}</li>
                    <li className=''>{roomType.amenities_2}</li>
                    <li className=''>{roomType.amenities_3}</li>
                    <li className=''>{roomType.amenities_4}</li>
                  </ul>
                  <div className="mt-1 text-lg font-medium text-black-900">{roomType.cost}</div>
                  <button className="mt-3 mb-4 ml inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700" id={roomType._id} onClick={handleClick}>Click to Choose</button>
                </div>
              ))}
              </div>
              </div>
              </div>
              </div>
              
             
      </div>


      {<Footer />}
    </div>

    </>

  );
}
