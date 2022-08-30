import React from "react";
import { useNavigate } from "react-router-dom";
import { PhotoModal } from "../modal/MyModal";
import userPhoto from "../../images/users.jpg";
import styless from "./Users.module.css";
import MyButton from "../ui/button/MyButton";
import { useState } from "react";

const User = ({ user, follow, unFollow, disabledFollow }) => {
  const [photoModal, setPhotoModal] = useState(false);
  const onModal = () => setPhotoModal(true);
  const router = useNavigate();
  const loginNavigation = (id) => {
    router(`/profile/${id}`);
  };
  const stopPropaginations = (e) => e.stopPropagation();
  return (
    <div className={styless.elemUser} onClick={() => loginNavigation(user.id)}>
      <div className={styless.namePhoto} onClick={stopPropaginations}>
        <img
          alt="avatar"
          src={user.photos.small ? user.photos.small : userPhoto}
          onClick={onModal}
        />
        <PhotoModal
          photo={user.photos.small ? user.photos.small : userPhoto}
          setState={setPhotoModal}
          state={photoModal}
        />
      </div>
      <div className={styless.elemInfo} onClick={stopPropaginations}>
        <label>{user.name}</label>
        {user.status && <label>{user.status}</label>}
        {user.followed ? (
          <MyButton
            onClick={() => unFollow(user.id)}
            disabled={disabledFollow.includes(user.id)}
          >
            Unfolloed
          </MyButton>
        ) : (
          <MyButton
            onClick={() => follow(user.id)}
            disabled={disabledFollow.includes(user.id)}
          >
            followed
          </MyButton>
        )}
      </div>
    </div>
  );
};

export default User;
