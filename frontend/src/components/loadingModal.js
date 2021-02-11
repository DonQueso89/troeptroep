import React from "react";
import actionStyles from "../styles/action.module.css";
import { FaSpinner } from "react-icons/fa";

const LoadingModal = ({ open }) => {
  return (
    <div className={actionStyles.modalContainer} data-open={open}>
      <div className={actionStyles.loadingModal}>
        <FaSpinner size={50} />
      </div>
        <div
          className={actionStyles.signUpModalOverlay}
        ></div>
    </div>
  );
};

export default LoadingModal;
