import React from "react";
import actionStyles from "../styles/action.module.css";
import { FaWindowClose } from "react-icons/fa";
import SignUpForm from "./signUpForm";

const SignUpModal = ({ open, toggle }) => {
  return (
    <div className={actionStyles.modalContainer} data-open={open}>
      <div className={actionStyles.signUpModal}>
        <div className={actionStyles.modalCloseButton} onClick={toggle}>
          <FaWindowClose />
        </div>
        <div className={actionStyles.signUpModalInner}>
          <p className={actionStyles.signUpModalIntroText}>
            Great that you want to join us. We will fill you in on the details
            via email.
          </p>
          <div className={actionStyles.signUpModalForm}>
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className={actionStyles.signUpModalOverlay} onClick={toggle}></div>
    </div>
  );
};

export default SignUpModal;
