import React from 'react';
import styless from './NavBar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const clas = navData => navData.isActive ? styless.active : styless.item;
    return (
        <aside className={styless.navBar}>
            <div className={styless.link}>
            <NavLink to={'/'} className={clas}>Profile</NavLink>
            </div>
            <div className={styless.link}>
            <NavLink to={'/users'} className={clas} >Users</NavLink>
            </div>
        </aside>
    );
};

export default NavBar;