import React from 'react';
import styless from './Login.module.css'

const Login = () => {
    return (
        <div className={styless.loginMarkup}>
            <form className={styless.contentForm}>
                <div>
                    <label className={styless.nameLabel}>
                    <b>Login</b>
                    <input type={'email'}/>
                    </label>
                </div>
                <div>
                    <label className={styless.nameLabel}>
                    <b>Password</b>
                    <input type={'password'}/>
                    </label>
                </div>
                <button className={styless.nameLabel}>Login</button>
            </form>
        </div>
    );
};

export default Login;