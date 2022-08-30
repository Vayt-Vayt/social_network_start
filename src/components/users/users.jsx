import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import Loader from "../PreLoader/Loader";
import { getProfileThunk } from "../redux/profileReducer";
import { getUserThunk, onFollow, setCurrentPageAC, deleteFollow } from "../redux/userReducer";
import User from "./User";
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
    <div className={styless.divElement}>
      { users.length === 0 && <Loader /> }
      {users.map((user) => (
        <User key={user.id} 
        disabledFollow={disabledFollow} 
        follow={follow}
        unFollow={unFollow}
        user={user}  
      />
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
