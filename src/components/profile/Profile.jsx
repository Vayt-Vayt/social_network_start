import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styless from "./Profile.module.css";
import photoAvatar from "../../images/users.jpg";
import ProfileInfo from "./ProfileInfo";
import { useEffect } from "react";
import {
  deletePosts,
  getProfileThunk,
  setInfoProfile,
  setPhotoProfile,
  setPosts,
} from "../redux/profileReducer";
import { Navigate, useParams } from "react-router-dom";
import { PhotoModal } from "../modal/MyModal";
import Posts from "./Posts";

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
  addPosts,
  deletePost
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
        <img
          onClick={() => setModal(true)}
          alt="avatar"
          src={srcAvatar}
          className={styless.photoAvatar}
        />
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
        <PhotoModal state={modal} setState={setModal} photo={srcAvatar} />
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

      <div className={styless.content}>
        <Posts
          isOwner={isOwner}
          srcAvatar={srcAvatar}
          buttonStyles={styless}
          profile={profile}
          addPosts={addPosts}
          deletePost={deletePost}
        />
      </div>
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
  const addPosts = (body, image) => dispatch(setPosts(body, image));
  const deletePost = (id) => {
    dispatch(deletePosts(id))
  }

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
      addPosts={addPosts}
      deletePost={deletePost}
    />
  );
};

export default ProfileContainer;
