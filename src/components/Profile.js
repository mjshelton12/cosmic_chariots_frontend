import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

export default function Profile() {

    const [userData, setUserData] = useState({
        email: Auth.getProfile().data.email,
        first_name: "",
        last_name: "",
        phone_number: "",
        street_address_1: "",
        street_address_2: "",
        city: "",
        state: "",
        zip: "",
        country: "",

    })

    const [userFormData, setUserFormData] = useState({
        email: Auth.getProfile().data.email,
        first_name: Auth.getProfile().data.first_name,
        last_name: "",
        phone_number: "",
        street_address_1: "",
        street_address_2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    })

    const email = Auth.getProfile().data.email
    console.log(email)

    const { loading, data, err } = useQuery(QUERY_USER, {
        variables: { email: email },
    });

    let userdata = data?.user || {};
    console.log("userdata", userdata)
    const first_name = userdata.first_name
    const last_name = userdata.last_name
    const phone_number = userdata.phone_number
    const street_address_1 = userdata.street_address_1
    const street_address_2 = userdata.street_address_2
    const city = userdata.city
    const state = userdata.state
    const zip = userdata.zip
    const country = userdata.country


    // declared the updateUser with the useMutation
    const [updateUser, { error }] = useMutation(UPDATE_USER, {
        variables: { email: email, first_name: first_name, last_name: last_name, phone_number: phone_number, street_address_1: street_address_1, street_address_2: street_address_2, city: city, state: state, zip: zip, country: country },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (err) {
      return `Error! ${err}`;
    }

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setUserFormData({ ...userFormData, [name]: value });
    // console.log("userformdata", userFormData)
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(userData);
    
        // use updateUser function
        try {
        const { data } = await updateUser({
          variables: { ...userFormData },
        });

        console.log("data", data)
        console.log("Success!")
        window.location.reload()
    
        Auth.loggedIn(data.updateUser.token);
        } catch (err) {
          console.error(JSON.stringify(err,null,2));
        }
    
        setUserData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            street_address_1: "",
            street_address_2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone_number: "",
        });
      }; 
    
    return (
        <>
        {/* Form */}
        <div class="mt-10 sm:mt-0">
            <div class="">
                <div class="">
                <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p class="mt-1 text-sm text-gray-600 italic">
                Use a permanent address where you can receive mail.
                </p>
                </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleFormSubmit}>
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label htmlFor="first_name" class="block text-sm font-medium text-gray-700">First name</label>
                                        <input 
                                            type="text" 
                                            name="first_name" 
                                            id="first_name" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                            value={userdata.first_name} 
                                            readOnly
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label htmlFor="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
                                        <input 
                                            type="text" 
                                            name="last_name" 
                                            id="last_name" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                            value={userdata.last_name}
                                            readOnly
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label htmlFor="email" class="block text-sm font-medium text-gray-700">Email address</label>
                                        <input 
                                            type="text" 
                                            name="email" 
                                            id="email" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                            value={userdata.email}
                                            readOnly
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label htmlFor="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input 
                                            type="text" 
                                            name="phone_number" 
                                            id="phone_number" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                            defaultValue={userdata.phone_number}
                                            onChange={handleInputChange}
                                            required/>
                                    </div>

                                    <div class="col-span-6">
                                        <label htmlFor="street_address_1" class="block text-sm font-medium text-gray-700">Street address</label>
                                        <input 
                                            type="text" 
                                            name="street_address_1" 
                                            id="street_address_1" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={userdata.street_address_1}
                                            onChange={handleInputChange}
                                            required/>
                                    </div>

                                    <div class="col-span-6">
                                        <label htmlFor="street_address_2" class="block text-sm font-medium text-gray-700">Street address cont.</label>
                                        <input 
                                            type="text" 
                                            name="street_address_2" 
                                            id="street_address_2" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={userdata.street_address_2}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <label htmlFor="city" class="block text-sm font-medium text-gray-700">City</label>
                                        <input 
                                        type="text" 
                                        name="city" 
                                        id="city" 
                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        defaultValue={userdata.city}
                                        onChange={handleInputChange}
                                        required/>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label htmlFor="state" class="block text-sm font-medium text-gray-700">State / Province</label>
                                        <input 
                                            type="text" 
                                            name="state" 
                                            id="state" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={userdata.state}
                                            onChange={handleInputChange}
                                            required/>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label 
                                            htmlFor="zip" 
                                            class="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                                        <input 
                                            type="text" 
                                            name="zip" 
                                            id="zip" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={userdata.zip}
                                            onChange={handleInputChange}
                                            required/>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label htmlFor="country" class="block text-sm font-medium text-gray-700">Country</label>
                                        <input 
                                            type="text" 
                                            name="country" 
                                            id="country" 
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={userdata.country}
                                            onChange={handleInputChange}
                                            required/>
                                    </div>

                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>

    )

}


