import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import ReservationCard from '../components/ReservationCard';
import Auth from '../utils/auth';

export default function Reservations() {
// const reservations = []

// async function getReservations() {
//   let userReservations = await userdata.reservation

//   for(let i=0; i<userReservations.length; i++){
//     let reservationId = userdata.reservation[i]._id
//     reservations.push(reservationId)
//   }
// }

// getReservations()

// console.log(reservations)

const userId = Auth.getProfile().data.email

console.log("userId ", userId)

const { loading, data, err } = useQuery(QUERY_USER, {
    variables: { email: userId },
});

const userdata = data?.user.reservation || [];
console.log("userdata ", userdata)


  return (
    <>
      <p>This is from Reservations</p>
      <div>
        {userdata.map((userdata) => (<ReservationCard key={userdata._id} id={userdata._id}/>))}
        
      </div>
    </>
  );
}
