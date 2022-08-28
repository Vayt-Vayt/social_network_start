import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styless from "./Profile.module.css";
import photoAvatar from "../../images/users.jpg";
import ProfileInfo from "./ProfileInfo";
import { useEffect } from "react";
import {
  getProfileThunk,
  setInfoProfile,
  setPhotoProfile,
} from "../redux/profileReducer";
import { Navigate, useParams } from "react-router-dom";
import MyModal from "../modal/MyModal";

const Profile = ({
  profile,
  isOwner,
  setInfoProfile,
  edit,
  onEdit,
  saveEdit,
  offEdit,
  isAuth,
  onPhoto,
}) => {
  const [modal, setModal] = useState(false);
  const { photos } = profile;
  const srcAvatar = photos?.large ? photos.large : photoAvatar;
  const setPhoto = (e) => {
    if (e.target.files.length) {
      onPhoto(e.target.files[0]);
    }
  };

  if (!isAuth) {
    return <Navigate to={`/login`} />;
  }
  return (
    <div className={styless.profileContent}>
      <div className={styless.photosAvatar}>
        <img onClick={() => setModal(true)} alt="avatar" src={srcAvatar} />
        {isOwner && (
          <div>
            <label htmlFor="photo" className={styless.names}>
              Loading Avatar
            </label>
            <input
              className={styless.nulls}
              type="file"
              onChange={setPhoto}
              id="photo"
            />
          </div>
        )}
      </div>
      <MyModal state={modal} setState={setModal}>
        <img className={styless.modalImg} alt="avatar" src={srcAvatar} />
      </MyModal>
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
  const onPhoto = (data) => dispatch(setPhotoProfile(data));

  useEffect(() => {
    if (id) dispatch(getProfileThunk(id));
  }, [id, auth.userId, dispatch]);

  return (
    <Profile
      onPhoto={onPhoto}
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
