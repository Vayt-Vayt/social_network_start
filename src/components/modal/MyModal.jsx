import React from 'react';
import styless from './MyModal.module.css'
const MyModal = ({children, state, setState}) => {
    const exit = () =>  setState(false)
    const stopPropaginations = (e) => e.stopPropagation()
    const rootClasses = [styless.modal, styless.modalActive]
    if (!state){
        return;
    }

    return (
        <div className={rootClasses.join(' ')} onClick={ exit } >
            <div onClick={ stopPropaginations }>
                <button onClick={ exit } 
                    className={styless.buttons}
                >Close</button>
                <div className={styless.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;
