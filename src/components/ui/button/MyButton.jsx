import React from "react";
import styless from './MyButton.module.css'

const MyButton = ({children, ...props}) => {
    return (
        <button className={styless.myButton} {...props}>
            {children}
        </button>
    );
};

export default MyButton;