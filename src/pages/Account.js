import React from 'react';

import Auth from '../utils/auth';

import AcctHeader from '../components/AcctHeader';
import Footer from '../components/Footer';
import AcctHdrImg from '../images/starship.jpg';
import AccTabs from '../components/AccTabs';

function Account() {
  return (
    <div className="flex flex-col min-h-screen  ">

      {/*  Site header */}
      <AcctHeader />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <section
          className="relative flex items-start justify-start h-screen mb-12 "
        >
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div >

          {/* Section header */}
          <div className="pt-12 md:pt-16 w-full flex flex-col h-screen ">
            <img src={AcctHdrImg} className="rounded" data-aos="fade-down" />
            <h1 className="italic text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 capitalize text-center" data-aos="zoom-y-out">Space Frontiers: <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Cosmic Chariots</span></h1>
            <div >

                <AccTabs />

            </div>
            {<Footer />}
          </div>

        </div>

        </div>
        </section>
      </main>

      {/* <Banner /> */}

    </div>
  );
}

export default Account;