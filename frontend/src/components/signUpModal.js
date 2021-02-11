import React from "react";
import actionStyles from "../styles/action.module.css";
import { FaWindowClose } from "react-icons/fa";
import SignUpForm from "./signUpForm";

const SignUpModal = ({ open, event, closeModal }) => {
  return (
    <div className={actionStyles.modalContainer} data-open={open}>
      <div className={actionStyles.signUpModal}>
        <div className={actionStyles.modalCloseButton} onClick={closeModal}>
          <FaWindowClose />
        </div>
        <div className={actionStyles.signUpModalInner}>
          <p className={actionStyles.signUpModalIntroText}>
            Great that you want to join us. We will fill you in on the details
            via email.
          </p>
          <div className={actionStyles.signUpModalForm}>
            <SignUpForm event={event} />
          </div>
        </div>
      </div>
      <div className={actionStyles.signUpModalOverlay} onClick={closeModal}></div>
    </div>
  );
};

export default SignUpModal;
