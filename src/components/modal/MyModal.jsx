import React from "react";
import styless from "./MyModal.module.css";
const MyModal = ({ children, state, setState }) => {
  const exit = () => setState(false);
  const stopPropaginations = (e) => e.stopPropagation();
  const rootClasses = [styless.modal, styless.modalActive];
  if (!state) {
    return;
  }

  return (
    <div className={rootClasses.join(" ")} onClick={exit}>
      <div onClick={stopPropaginations}>
        <div className={styless.position} ><span className={styless.close} onClick={exit} /></div>
        <div className={styless.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default MyModal;


export const PhotoModal = ({ photo, state, setState }) => {
  const exit = () => setState(false);
  const stopPropaginations = (e) => e.stopPropagation();
  const rootClasses = [styless.modal, styless.modalActive];
  if (!state) {
    return;
  }
  
  return (
    <div className={rootClasses.join(" ")} onClick={exit}>
      <div onClick={stopPropaginations}>
        <div className={styless.position} ><span className={styless.close} onClick={exit} /></div>
        <div className={styless.modalContent}>
          <div>
            <img alt='photos' src={photo} className={styless.modalImg} />  
          </div>
        </div>
      </div>
    </div>
  );
};