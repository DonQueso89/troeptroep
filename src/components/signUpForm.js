import React, { useState } from "react";
import actionStyles from "../styles/action.module.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  return (
    <form action="" method="post" autoComplete="true">
      <div className={actionStyles.signUpFormInput}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={actionStyles.signUpFormInput}>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default SignUpForm;
