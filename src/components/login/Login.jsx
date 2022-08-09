import React from "react";
import styless from "./Login.module.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmitForm = (data) => {
    console.log(data);
    reset();
  };

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
        <div className={styless.nameLabel}>
          <label>
            <b>Remember Me</b>
          </label>
          <input type={"checkbox"} {...register("rememberMe")} />
        </div>
        <div className={styless.form_button}>
          <button disabled={!isValid}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
