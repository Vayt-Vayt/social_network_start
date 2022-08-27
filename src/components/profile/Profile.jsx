import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styless from "./Profile.module.css";
import photoAvatar from "../../images/users.jpg";
import ProfileInfo from "./ProfileInfo";
import { useEffect } from "react";
import { getProfileThunk, setInfoProfile } from "../redux/profileReducer";
import { Navigate, useParams } from "react-router-dom";

const Profile = ({
  profile,
  isOwner,
  setInfoProfile,
  edit,
  onEdit,
  saveEdit,
  offEdit,
  isAuth,
}) => {
  const { photos } = profile;
  const srcAvatar = photos?.large ? photos.large : photoAvatar;
  if (!isAuth) {
    return <Navigate to={`/login`} />;
  }
  return (
    <div className={styless.profileContent}>
      <div className={styless.photosAvatar}>
        <img alt="avatar" src={srcAvatar} />
      </div>
      <div className={styless.infoUser}>
        <ProfileInfo
          profile={profile}
          isOwner={isOwner}
          setInfoProfile={setInfoProfile}
          edit={edit}
          onEdit={onEdit}
          saveEdit={saveEdit}
          offEdit={offEdit}
        />
      </div>
      <div className={styless.content}>posts</div>
    </div>
  );
};

const ProfileContainer = (props) => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  let { id } = useParams();
  if (!id) {
    id = auth.userId;
  }
  const isOwner = id === auth.userId;

  const onEdit = () => (isOwner ? setEdit(true) : null);
  const offEdit = () => setEdit(false);
  const saveEdit = (data) => {
    dispatch(setInfoProfile(data));
    dispatch(getProfileThunk(id)).then(() => offEdit());
  };

  useEffect(() => {
    if (id) dispatch(getProfileThunk(id));
  }, [id, auth.userId, dispatch]);

  return (
    <Profile
      profile={profile}
      isOwner={isOwner}
      edit={edit}
      onEdit={onEdit}
      saveEdit={saveEdit}
      offEdit={offEdit}
      isAuth={auth.isAuth}
    />
  );
};

export default ProfileContainer;
