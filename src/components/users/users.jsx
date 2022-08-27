import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import userPhoto from "../../images/users.jpg";
import Pagination from "../pagination/Pagination";
import { getProfileThunk } from "../redux/profileReducer";
import { getUserThunk, onFollow, setCurrentPageAC, deleteFollow } from "../redux/userReducer";
import styless from "./Users.module.css";

const Users = ({
  users,
  onPageCurrent,
  totalCount,
  currentPage,
  follow,
  unFollow,
  disabledFollow
}) => {
  
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className={styless.elemUser}>
          <div className={styless.namePhoto}>
            <NavLink to={`/profile/${user.id}`}>
              <img
                alt="avatar"
                src={user.photos.small ? user.photos.small : userPhoto}
              />
            </NavLink>
          </div>
          <div className={styless.elemInfo}>
            <label>{user.name}</label>
            {user.status && <label>{user.status}</label>}
            {user.followed ? (
              <button onClick={() =>unFollow(user.id)}
                disabled={ disabledFollow.includes(user.id) }
              >Unfolloed</button>
            ) : (
              <button onClick={() =>follow(user.id)}
                disabled={ disabledFollow.includes(user.id) }
              >followed</button>
            )}
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        onPageCurrent={onPageCurrent}
      />
    </div>
  );
};

export default Users;

export const UsersContainer = (props) => {
  const { users, totalCount, currentPage, disabledFollow } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const onPageCurrent = (page) => {
    dispatch(setCurrentPageAC(page));
    dispatch(getUserThunk(page));
  };
  const profileInfoUser = (userId) => dispatch(getProfileThunk(userId));
  const follow = (userId) => dispatch(onFollow(userId))
  const unFollow = (userId) => dispatch(deleteFollow(userId))
  

  useEffect(() => {
    if (users.length < 1) {
      dispatch(getUserThunk());
    }
  }, [dispatch, users.length]);

  return (
    <Users
      users={users}
      totalCount={totalCount}
      onPageCurrent={onPageCurrent}
      currentPage={currentPage}
      profileInfoUser={profileInfoUser}
      follow={follow}
      unFollow={unFollow}
      disabledFollow={disabledFollow}
    />
  );
};
