import React, { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styless from "./Profile.module.css";
import { setStatusProfile } from "../redux/profileReducer";
import { FormAction } from "../hellper/helper";

const Status = ({ status, setStatus, userId, isOwner }) => {
  const valueZero = isOwner ? "Add status" : "Status not set";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => (isOwner ? setIsEdit(true) : null);
  const onStatus = (status) => {
    setStatus(status.status, userId);
    setIsEdit(false);
  };

  return (
    <div>
      {isEdit && (
        <form
          onSubmit={handleSubmit(onStatus)}
          className={styless.form_contant}
        >
          <div>
            {FormAction("textarea", "text", errors, true, status, "status", {
              register,
              maxLength: { value: 100, message: "max length 100 symboll" },
            })}
          </div>
          <div>
            <button type={"submit"} className={styless.form_button}>
              Save
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className={styless.form_button}
            >
              cancelation
            </button>
          </div>
        </form>
      )}
      {!isEdit && <h3 onDoubleClick={onEdit}>{status || valueZero}</h3>}
    </div>
  );
};

const ContainerStatus = ({ isOwner }) => {
  const { status, userId } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const setStatus = useCallback(
    (text, userId) => {
      dispatch(setStatusProfile(text, userId));
    },
    [dispatch]
  );

  return (
    <Status
      status={status}
      userId={userId}
      setStatus={setStatus}
      isOwner={isOwner}
    />
  );
};

export default ContainerStatus;
