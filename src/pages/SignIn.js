import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import Logo from "../images/logo.png";

const SignIn = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate(-1)
    } catch (err) {
      console.error(JSON.stringify(err,null,2));
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">



      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/*  Logo */}
            <div className="flex justify-center ">
              <Link to="/">
                <img data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" class="pt-10" src={Logo} alt=""/>
              </Link>
            </div>

            <div className="pt-20 pb-12 md:pt-20 md:pb-20">
              
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back, space adventurer! Sign in to view your profile or reservations!</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input
                          id="email"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your email address"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input
                          id="password"
                          className="form-input w-full text-gray-800"
                          placeholder="******"
                          name="password"
                          type="password"
                          value={formState.password}
                          onChange={handleChange}
                          required
                        />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                        <button
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          style={{ cursor: 'pointer' }}
                          type="submit"
                        >
                          Submit
                        </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
                  {error && (
                    <div className="my-3 p-3 bg-danger text-red">
                      <span className="my-3 p-3 bg-danger text-red-500">{error.message}</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
