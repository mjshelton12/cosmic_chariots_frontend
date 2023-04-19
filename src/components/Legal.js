import React from "react";

export default function Legal(){
  return (
    <section className="text-center">
        <br />
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            {/* <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li> */}
            <li>
                <a href="/Terms" className="mr-4 hover:underline md:mr-6" target="_blank">Terms of Use</a>
            </li>
            <li>
                <a href="/Privacy" className="mr-4 hover:underline md:mr-6" target="_blank">Privacy Policy</a>
            </li>
            {/* <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Contact</a>
            </li> */}
        </ul>
    </section>
  );
}