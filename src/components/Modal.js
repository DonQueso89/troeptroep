import React from "react";
import actionStyles from "../styles/action.module.css";
import { FaWindowClose } from "react-icons/fa";


const Modal = ({ open, closeModal, children }) => {

  return (
    <>
    <div className={actionStyles.modalContainer} data-open={open}>
      <div className={actionStyles.signUpModal}>
        <div className={actionStyles.modalCloseButton} onClick={closeModal}>
          <FaWindowClose />
        </div>
        <div className={actionStyles.signUpModalInner}>
            {children}
        </div>
      </div>
      <div
        className={actionStyles.signUpModalOverlay}
        onClick={closeModal}
      ></div>
    </div>
    </>
  );
};

export default Modal;
