import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { 
  Routes, 
  Route,
  useLocation
 } from "react-router-dom";

import "./App.css";
import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

// import Nav from "./components/Nav";
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
// import Excursion from "./pages/Excursion";
import Footer from "./components/Footer";
import User from "./pages/User";
import Launch from "./pages/Launch";
// import Dining from "./pages/Dining";
// import Activity from "./pages/Activity";
import Mission from "./pages/Mission";
import RoomType from "./pages/RoomType";
import MissionDate from "./pages/MissionDate";
import FinalBooking from "./pages/FinalBooking";
// import logo from './logo.svg';

const url = process.env.NODE_ENV === 'development'
  ? '/graphql' : "https://cosmic-chariots-backend.herokuapp.com/graphql";
const httpLink = createHttpLink({
  uri: url,
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <ApolloProvider client={client}>
        <>
          {/* <Nav /> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
              {/* <Route path='/mission/:id' element={<MissionDate />} /> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/user" element={<User />} />
            <Route path="/Launch" element={<Launch />} />
            {/* <Route path="/Excursion" element={<Excursion />} />
            <Route path="/Dining" element={<Dining />} />
            <Route path="/Activity" element={<Activity />} /> */}
            <Route path="/Mission" element={<Mission />} />
            <Route path="/accomodations" element={<RoomType />} />
            <Route path="/missiondates" element={<MissionDate />} />
            <Route path="/roomtype" element={<RoomType />} />
            <Route path="/finalBooking" element={<FinalBooking />} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Routes>
        </>
     
    </ApolloProvider>
  );
}

export default App;
