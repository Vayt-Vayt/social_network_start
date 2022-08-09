import React from 'react';
import { useNavigate } from 'react-router-dom';
import styless from './Header.module.css'

const Header = () => {
    const router = useNavigate()

    const loginNavigation = () => {
        router('/login')
    }

    return (
        <header className={styless.content}>
            <div>
                <img alt='logo' src='' />
            </div>
            <div className={styless.buttons}>
                <b>names</b>
                {/* <button>Exit</button> */}
                <button onClick={loginNavigation}>Login</button>
            </div>
        </header>
    );
};

export default Header;