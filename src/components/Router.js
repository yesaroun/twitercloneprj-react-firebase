import React, {useState} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation/>}
      <Routes>
        {/* {isLoggedIn ? (1) : (2)} 이 구문이다*/}

        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj}/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </>
        ) : (
          <>
            <Route path="/" element={<Auth/>}/>
          </>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;