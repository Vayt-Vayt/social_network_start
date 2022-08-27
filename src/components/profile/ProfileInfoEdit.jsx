import React from "react";
import { useForm } from "react-hook-form";
import { FormAction } from "../hellper/helper";
import styless from "./Profile.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./shema";
import ContactsEdit from "./Contacts";

const ProfileInfoEdit = ({ profile, offEdit, saveEdit }) => {
  const {
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    aboutMe,
    contacts,
  } = profile;
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  return (
    <>
      <div className={styless.informations}>
        <div className={styless.name_input}>
          <b>Full name : </b>
          <div>
            {FormAction("input", "text", errors, true, fullName, "fullName", {
              register,
            })}
          </div>
        </div>
        <div className={styless.name_input}>
          <b>About Me : </b>
          {FormAction("textarea", "text", errors, false, aboutMe, "aboutMe", {
            register,
          })}
        </div>
        <div className={styless.name_input}>
          <b>Looking for a job : </b>
          {FormAction(
            "input",
            "checkbox",
            errors,
            false,
            lookingForAJob,
            "lookingForAJob",
            { register }
          )}
        </div>
        <div className={styless.name_input}>
          <b>Looking for a job description : </b>
          {FormAction(
            "textarea",
            "text",
            errors,
            false,
            lookingForAJobDescription,
            "lookingForAJobDescription",
            { register }
          )}
        </div>
        <ContactsEdit errors={errors} contacts={contacts} register={register} />
        <div className={styless.button_edit}>
          <button disabled={!isValid} onClick={handleSubmit(saveEdit)}>
            Save
          </button>
          <button onClick={offEdit}>Сancellation</button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoEdit;
