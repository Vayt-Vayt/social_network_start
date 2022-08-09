import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import { UsersContainer } from "../users/users";
import styless from './Routers.module.css'

const Routers = () => {
  return (
    <div className={styless.rout}>
      <Routes>
        <Route path="/" element={<Profile />} >
          <Route path='profile/:id' element={<Profile />} />
        </Route>
        <Route path="/users" element={<UsersContainer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Routers;
