import React from "react";
import styless from "./Login.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "../redux/aythReduser";
import { Navigate } from "react-router-dom";

const Login = ({ loginGo, isAuth, userId, errorsAuth, captchaURL }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmitForm = (data) => {
    loginGo(data)
    console.log(data);
    reset();
  };
  console.log(isAuth, 'log');
  if (isAuth) {
    return <Navigate to={`/profile/${userId}`} />
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
          <input
            placeholder="Enter email"
            type={"email"}
            {...register("email", {
              required: "Поле обязательное к заполнению !",
              minLength: { value: 3, message: "min 3 symbol" },
            })}
          />
          <div>
            {errors?.email && (
              <p className={styless.errorsActive}>{errors?.email.message}</p>
            )}
          </div>
        </div>
        <div className={styless.nameLabel}>
          <label>
            <b>Password</b>
          </label>
          <input
            placeholder="Enter password"
            type={"password"}
            {...register("password", {
              required: "Поле обязательное к заполнению !",
              minLength: { value: 3, message: "min 5 symbol" },
            })}
          />
          <div>
            {errors?.password && (
              <p className={styless.errorsActive}>{errors?.password.message}</p>
            )}
          </div>
        </div>
        {errorsAuth && <p className={styless.errorsActive}>{errorsAuth}</p>}
        <div className={styless.nameLabel}>
          <label>
            <b>Remember Me</b>
          </label>
          <input type={"checkbox"} {...register("rememberMe")} />
        </div>
        {captchaURL && 
          <div className={styless.nameLabel}>
            <img src={captchaURL} alt="captcha" />
            <input type={"text"}
              {...register('captcha', {
                required: "Поле обязательное к заполнению !"
              })}
            />
          </div>}
        <div className={styless.form_button}>
          <button disabled={!isValid}>Login</button>
        </div>
      </form>
    </div>
  );
};


const LoginContainer = () => {
  const { isAuth, userId, errorsAuth, captchaURL } = useSelector(state => state.auth )
  const dispatch = useDispatch()
  const loginGo = (data) => dispatch(onLogin(data))
  return (
    <Login 
      loginGo={loginGo} 
      isAuth={isAuth} 
      userId={userId} 
      errorsAuth={errorsAuth} 
      captchaURL={captchaURL}
    />
  )
}

export default LoginContainer;
