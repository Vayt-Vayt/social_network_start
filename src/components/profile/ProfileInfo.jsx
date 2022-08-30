import React from "react";
import { ContactsInfo } from "./Contacts";
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
  const jobStatus = (vale) => (vale ? "Looking for a job" : "Working");

  return (
    <>
      <div className={styless.status}>
        <ContainerStatus isOwner={isOwner} />
      </div>
      {edit ? (
        <div className={styless.informations}>
          <ProfileInfoEdit
            profile={profile}
            offEdit={offEdit}
            saveEdit={saveEdit}
          />
        </div>
      ) : (
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
            <label>{jobStatus(nullValue(lookingForAJob))}</label>
          </div>
          <div>
            <b>Looking for a job description : </b>
            <label>{nullValue(lookingForAJobDescription)}</label>
          </div>
          <ContactsInfo contacts={contacts} />
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
