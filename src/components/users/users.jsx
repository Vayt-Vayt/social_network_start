import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import userPhoto from "../../images/users.jpg";
import Pagination from "../pagination/Pagination";
import { getProfileThunk } from "../redux/profileReducer";
import { getUserThunk, setCurrentPageAC } from "../redux/userReducer";
import styless from "./Users.module.css";

const Users = ({ users, onPageCurrent, totalCount, currentPage, profileInfoUser }) => {
  // const route = useNavigate();
  // const onNavigate = (id) => {
  //   profileInfoUser(id)
  //   route(`/profile/${id}`);
  // }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className={styless.elemUser}>
          <div
            className={styless.namePhoto}
            // onClick={() => onNavigate(user.id)}
          >
            <NavLink to={`/profile/${user.id}`}>
            <img
              alt="avatar"
              src={user.photos.small ? user.photos.small : userPhoto}
              // style={{width: '80px', margin:'5px'}}
            />
            </NavLink>
          </div>
          <div className={styless.elemInfo}>
            <label>{user.name}</label>
            {user.status && <label>{user.status}</label>}
            {user.followed ? (
              <button>Unfolloed</button>
            ) : (
              <button>followed</button>
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
  const { users, totalCount, currentPage } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const onPageCurrent = (page) => {
    dispatch(setCurrentPageAC(page));
    dispatch(getUserThunk(page));
  };
  const profileInfoUser = (userId) => dispatch(getProfileThunk(userId))

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
    />
  );
};
