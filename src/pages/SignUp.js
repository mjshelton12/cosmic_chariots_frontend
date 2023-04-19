import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import Logo from "../images/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // declared the addUser with the useMutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
  const { name, value } = event.target;

    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if(userFormData.password.length < 5){
      window.alert("Password too short, please try again")
      return;
    }

    // use addUser function
    try {
    const { data } = await addUser({
      variables: { ...userFormData },
    });

    Auth.login(data.addUser.token);
    navigate("/")
    } catch (err) {
      console.error(JSON.stringify(err,null,2));
    }

    setUserFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  };  

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/*  Logo */}
            <div className="flex justify-center ">
              <Link to="/">
                <img data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" className="pt-10" src={Logo} alt=""/>
              </Link>
            </div>

            <div className="pt-20 pb-12 md:pt-20 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">One small click for you, one giant leap towards space adventures!</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="first_name">First Name<span className="text-red-600">*</span></label>
                      <input 
                        id="fname" 
                        type="text"
                        name="first_name" 
                        className="form-input w-full text-gray-800" 
                        placeholder="Enter your first name"
                        value={userFormData.first_name}
                        onChange={handleInputChange} 
                        required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="last_name">Last Name<span className="text-red-600">*</span></label>
                      <input 
                        id="lname" 
                        type="text"
                        name="last_name"
                        className="form-input w-full text-gray-800" 
                        placeholder="Enter your last name"
                        value={userFormData.last_name}
                        onChange={handleInputChange} 
                        required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input 
                        id="email" 
                        type="email"
                        name="email"
                        className="form-input w-full text-gray-800" 
                        placeholder="Enter your email address"
                        value={userFormData.email}
                        onChange={handleInputChange}
                        required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input 
                        id="password" 
                        type="password"
                        name="password"
                        className="form-input w-full text-gray-800" 
                        placeholder="Enter your password"
                        value={userFormData.password}
                        onChange={handleInputChange}
                        required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button 
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the <a className="underline" href="./Terms" target="_blank">terms & conditions</a>, and our <a className="underline" href="./Privacy" target="_blank">privacy policy</a>.
                                </div>
                </form>


                <div className="text-gray-600 text-center mt-6">
                  Already have an account? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>

        </section>

      </main>

    </div>
  );
}

export default SignUp;
