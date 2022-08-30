import React, { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styless from "./Profile.module.css";
import { setStatusProfile } from "../redux/profileReducer";
import { FormActionss } from "../hellper/helper";
import MyButton from "../ui/button/MyButton";

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
            {FormActionss(
              "textarea",
              errors,
              status,
              "status",
              {
                register,
                maxLength: { value: 100, message: "max length 100 symboll" },
              },
              { autoFocus: true }
            )}
          </div>
          <div className={styless.form_button}>
            <MyButton type={"submit"}>Save</MyButton>
            <MyButton onClick={() => setIsEdit(false)}>cancelation</MyButton>
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
