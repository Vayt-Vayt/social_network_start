import React from 'react';
import { useNavigate } from 'react-router-dom';
import styless from './Header.module.css'
import icon from '../../images/logoIcon.png'
import { useSelector } from 'react-redux';

const Header = ({login}) => {
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
                 <button>Exit</button></>
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
    return (
        <Header login={login}/>
    )
}

export default HeaderContainer;