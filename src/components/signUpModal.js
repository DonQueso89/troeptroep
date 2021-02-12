import React, { useState } from "react";
import actionStyles from "../styles/action.module.css";
import { FaWindowClose } from "react-icons/fa";
import SignUpForm from "./signUpForm";
import LoadingModal from "../components/loadingModal";

const SignUpModal = ({ open, event, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => setLoading(v => !v);

  return (
    <>
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
            <SignUpForm event={event} toggleLoading={toggleLoading} closeModal={closeModal} />
          </div>
        </div>
      </div>
      <div
        className={actionStyles.signUpModalOverlay}
        onClick={closeModal}
      ></div>
    </div>
    <LoadingModal open={loading} />
    </>
  );
};

export default SignUpModal;
