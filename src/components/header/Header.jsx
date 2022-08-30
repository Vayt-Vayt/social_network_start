import React from 'react';
import { useNavigate } from 'react-router-dom';
import styless from './Header.module.css'
import icon from '../../images/logoIcon.png'
import { useDispatch, useSelector } from 'react-redux';
import { offLogin } from '../redux/aythReduser';
import MyButton from '../ui/button/MyButton';

const Header = ({ login, offLoginUser }) => {
    const router = useNavigate()
    const loginNavigation = () => router(`/login`)
    const profileNavigation = login ? () => router(`/`) : null

    return (
        <header className={styless.content}>
            <div className={styless.icons}>
                <img alt='logo' src={icon} onClick={profileNavigation}/>
            </div>
            <div className={styless.buttons}>
                {login && 
                 <>
                    <b>{login}</b>
                    <MyButton onClick={offLoginUser}>Exit</MyButton>
                 </>
                }
                { !login && 
                    <MyButton onClick={loginNavigation}>Login</MyButton>
                }
            </div>
        </header>
    );
};


const HeaderContainer = () => {
    const {login} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const offLoginUser = () => dispatch(offLogin())
    return (
        <Header login={login} offLoginUser={offLoginUser} />
    )
}

export default HeaderContainer;