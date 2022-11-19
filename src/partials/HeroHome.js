import React, { useState } from 'react';
import Modal from '../utils/Modal';

import MoonImage from '../images/billwright-moonscape2aa-650.jpg';
import MarsImage from '../images/buzzaldrin-mars.jpg';
import SpaceVideo from '../videos/mars_cut.mp4';

function HeroHome() {

  return (
    <section className="relative">

<header
  class="relative flex items-center justify-center h-screen mb-12 overflow-hidden"
>
  <div
    class="text-center relative z-30 p-5 text-2xl text-white bg-blue-800 bg-opacity-50 rounded-xl"
  >
    <p class="italic font-bold">Space Frontiers: Cosmic Chariots</p>
    <p>Galactic Adventures Company</p>
  </div>
  <video
    autoPlay
    loop
    muted
    class="absolute z-10 w-auto min-w-full min-h-full max-w-none"
  >
    <source
      src={SpaceVideo}
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</header>

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="italic text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Space Frontiers:  {'\n'}<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Cosmic Chariots</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Welcome to Space Frontiers, home of the Cosmic Chariots Starship!</p>
 
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Space Adventures Now Open!<br/>What Mission Will You Accept?</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div class="flex justify-center px-1">
                  <div class="rounded-lg shadow-lg bg-white max-w-sm">
                    <a href="#!">
                      <img class="rounded-t-lg" src={MoonImage} alt=""/>
                    </a>
                    <div class="p-6">
                      <h5 class="text-gray-900 text-xl font-medium mb-2">Lunar Leap</h5>
                      <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">7 Day Experience</button>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center px-1">
                  <div class="rounded-lg shadow-lg bg-white max-w-sm">
                    <a href="#!">
                      <img class="rounded-t-lg" src={MarsImage} alt="" />
                    </a>
                    <div class="p-6">
                      <h5 class="text-gray-900 text-xl font-medium mb-2">Mars Explorer</h5>
                      <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">14 Day Experience</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroHome;