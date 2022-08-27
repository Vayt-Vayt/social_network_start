import React from "react";
import styless from "./Login.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "../redux/aythReduser";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLoginInput } from "./shemaLoginInput";
import { FormAction } from "../hellper/helper";

const Login = ({ loginGo, isAuth, userId, errorsAuth, captchaURL }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schemaLoginInput) });

  const onSubmitForm = (data) => {
    loginGo(data);
    reset();
  };
  
  if (isAuth) {
    // return <Navigate to={`/profile/${userId}`} />;
    return <Navigate to={`/`} />;
  }

  return (
    <div className={styless.loginMarkup}>
      <form
        className={styless.contentForm}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className={styless.nameLabel}>
          <label>
            <b>Login</b>
          </label>
          {FormAction("input", "email", errors, true, "", "email", {
            register,
          })}
        </div>
        <div className={styless.nameLabel}>
          <label>
            <b>Password</b>
          </label>
          {FormAction("input", "password", errors, false, "", "password", {
            register,
            placeholder: "Enter password",
          })}
        </div>
        {errorsAuth && <p className={styless.errorsActive}>{errorsAuth}</p>}
        <div className={styless.nameLabel}>
          <label>
            <b>Remember Me</b>
          </label>
          <input type={"checkbox"} {...register("rememberMe")} />
        </div>
        {captchaURL && (
          <div className={styless.nameLabel}>
            <img src={captchaURL} alt="captcha" />
            {FormAction("input", "text", errors, false, null, "captcha", {
              register,
            })}
          </div>
        )}
        <div className={styless.form_button}>
          <button disabled={!isValid}>Login</button>
        </div>
      </form>
    </div>
  );
};

const LoginContainer = () => {
  const { isAuth, userId, errorsAuth, captchaURL } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const loginGo = (data) => dispatch(onLogin(data));
  return (
    <Login
      loginGo={loginGo}
      isAuth={isAuth}
      userId={userId}
      errorsAuth={errorsAuth}
      captchaURL={captchaURL}
    />
  );
};

export default LoginContainer;
