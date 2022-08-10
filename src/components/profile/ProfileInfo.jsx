import React from "react";
import styless from "./Profile.module.css";
import ContainerStatus from "./Status";

const ProfileInfo = ({ profile }) => {
  const { lookingForAJob, lookingForAJobDescription, fullName, aboutMe, contacts } =
    profile;
  const nullValue = (value) => (value ? value : "Value not set");

  return (
    <>
      <div className={styless.status}>
        <ContainerStatus />
      </div>
      <div className={styless.informations}>
        <div>
          <b>Full name : </b>
          <label>{nullValue(fullName)}</label>
        </div>
        <div>
          <b>About Me : </b>
          <label>{nullValue(aboutMe)}</label>
        </div>
        <div>
          <b>Looking for a job : </b>
          <label>{nullValue(lookingForAJob) ? 'Looking for a job' : 'Working'}</label>
        </div>
        <div>
          <b>Looking for a job description : </b>
          <label>{nullValue(lookingForAJobDescription)}</label>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
