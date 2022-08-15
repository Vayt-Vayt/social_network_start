import React from "react";
import styless from "./Profile.module.css";
import ProfileInfoEdit from "./ProfileInfoEdit";
import ContainerStatus from "./Status";

const ProfileInfo = ({ profile, isOwner, offEdit, onEdit, saveEdit, edit }) => {
  const {
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    aboutMe,
    contacts,
  } = profile;

  const nullValue = (value) => (value ? value : "Value not set");

  return (
    <>
      <div className={styless.status}>
        <ContainerStatus isOwner={isOwner} />
      </div>
      {!edit && (
        <div className={styless.informations} onDoubleClick={onEdit}>
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
            <label>
              {nullValue(lookingForAJob) ? "Looking for a job" : "Working"}
            </label>
          </div>
          <div>
            <b>Looking for a job description : </b>
            <label>{nullValue(lookingForAJobDescription)}</label>
          </div>
          <div>
            <b>Contacts : </b>
            {Object.keys(contacts).map((key) => (
              <div key={key}>
                <p>{key}: </p>
                <span>{contacts[key]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {edit && (
        <ProfileInfoEdit
          profile={profile}
          offEdit={offEdit}
          saveEdit={saveEdit}
        />
      )}
    </>
  );
};

export default ProfileInfo;
