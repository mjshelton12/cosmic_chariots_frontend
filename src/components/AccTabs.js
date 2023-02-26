import React from "react";
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_ME, QUERY_USER } from '../utils/queries';

import Profile from '../components/Profile';
import Reservations from '../components/Reservations';

import Auth from '../utils/auth';

export default function TabsRender() {
  const [openTab, setOpenTab] = React.useState(1);
  
    // const userId = Auth.getProfile().data._id
    // // console.log(Auth.getProfile().data)
    // // console.log(userId)

    // // let { loading, data, err } = useQuery(GET_ME, {
    // //   variables: { userId: userId },});
    // // let userdata = data?.me || {};
    // // console.log(userdata)

    // const { loading, data, err } = useQuery(QUERY_USER, {
    //     variables: { userId: userId },
    // });

    // let userdata = data?.user || {};
    // console.log(userdata)

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (err) {
    //   return `Error! ${err}`;
    // }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Profile
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i>  Reservations
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <Profile />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>
                    <Reservations />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

