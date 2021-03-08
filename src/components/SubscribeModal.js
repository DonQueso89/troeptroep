import React, { useState } from "react";
import actionStyles from "../styles/action.module.css";
import Modal from "../components/Modal";

const SubscribeModal = ({ open, closeModal }) => {
  const formUrl = new URL("subscribe", process.env.GATSBY_DETA_ROOT_URL);
  const [email, setEmail] = useState("")

  return (
    <>
      <Modal open={open} closeModal={closeModal}>
        <p className={actionStyles.signUpModalIntroText}>
          Enter your email to receive notifications via email whenever we
          organize a new event. We will not use your email for any other
          purpose. 
        </p>
        <form
          action={formUrl}
          method="post"
          autoComplete="true"
        >
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <div className={actionStyles.signUpFormInput}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SubscribeModal;
