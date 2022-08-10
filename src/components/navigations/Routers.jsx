import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import ProfileContainer from "../profile/Profile";
import { UsersContainer } from "../users/users";
import styless from './Routers.module.css'

const Routers = () => {
  return (
    <div className={styless.rout}>
      <Routes>
        <Route path="/" element={<ProfileContainer />} >
          <Route path='profile/:id' element={<ProfileContainer />} />
        </Route>
        <Route path="/users" element={<UsersContainer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Routers;
