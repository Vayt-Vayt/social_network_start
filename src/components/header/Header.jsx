import React from 'react';
import { useNavigate } from 'react-router-dom';
import styless from './Header.module.css'
import icon from '../../images/logoIcon.png'
import { useDispatch, useSelector } from 'react-redux';
import { offLogin } from '../redux/aythReduser';

const Header = ({ login, offLoginUser }) => {
    const router = useNavigate()
    const loginNavigation = () => {
        router('/login')
    }

    return (
        <header className={styless.content}>
            <div>
                <img alt='logo' src={icon} width={'60px'}/>
            </div>
            <div className={styless.buttons}>
                {login && 
                 <><b>{login}</b>
                 <button onClick={offLoginUser}>Exit</button></>
                }
                { !login && 
                    <button onClick={loginNavigation}>Login</button>
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