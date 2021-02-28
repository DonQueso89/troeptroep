import React, { useState } from "react";
import actionStyles from "../styles/action.module.css";
import SignUpForm from "./signUpForm";
import LoadingModal from "../components/loadingModal";
import Modal from "../components/Modal"

const SignUpModal = ({ open, event, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => setLoading(v => !v);

  return (
    <>
      <Modal open={open} closeModal={closeModal}>
          <p className={actionStyles.signUpModalIntroText}>
            Great that you want to join us. We will fill you in on the details
            via email.
          </p>
          <div className={actionStyles.signUpModalForm}>
            <SignUpForm event={event} toggleLoading={toggleLoading} closeModal={closeModal} />
          </div>
       </Modal>
    <LoadingModal open={loading} />
    </>
  );
};

export default SignUpModal;
