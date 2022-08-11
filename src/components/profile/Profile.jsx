import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styless from "./Profile.module.css";
import photoAvatar from "../../images/users.jpg";
import ProfileInfo from "./ProfileInfo";
import { useEffect } from "react";
import { getProfileThunk } from "../redux/profileReducer";
import { useParams } from "react-router-dom";

const Profile = ({ profile }) => {
  const { photos } = profile;
  const srcAvatar = photos?.large ? photos.large : photoAvatar;
  return (
    <div className={styless.profileContent}>
      <div className={styless.photosAvatar}>
        <img alt="avatar" src={srcAvatar} />
      </div>
      <div className={styless.infoUser}>
        <ProfileInfo profile={profile} />
      </div>
      <div className={styless.content}>posts</div>
    </div>
  );
};

const ProfileContainer = (props) => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  let {id} = useParams()

  if (!id) {
    id = auth.userId

  }
  console.log((id));
  console.log(auth.userId, 'user');
  console.log(auth, 'auth');
  console.log(profile, 'prof');

  useEffect(() => {
    dispatch(getProfileThunk(id))
  }, [id, auth.userId, dispatch])

  return <Profile profile={profile} />;
};

export default ProfileContainer;
