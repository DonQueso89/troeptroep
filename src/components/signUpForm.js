import React, { useState } from "react";
import actionStyles from "../styles/action.module.css";
import { FaQuestionCircle } from "react-icons/fa";

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(
      () => reject(new Error(`request timed out after ${ms}ms`)),
      ms
    );

    promise
      .then((v) => {
        clearTimeout(timerId);
        resolve(v);
      })
      .catch((reason) => {
        clearTimeout(timerId);
        reject(reason);
      });
  });
}

const SignUpForm = ({ event, toggleLoading, closeModal }) => {
  const [email, setEmail] = useState("");
  const [needsGear, setNeedsGear] = useState(false);
  const formUrl = new URL("registrations", process.env.GATSBY_DETA_ROOT_URL);
  const eventName = event ? event.title : null;
  const startTime = event ? event.starttime :  null;
  const locationDescription = event ? event.meetingpointDescription :  null;

  const formSubmitter = async (e) => {
    const form = e.target;
    e.preventDefault();
    closeModal();
    toggleLoading();

    const data = Object.fromEntries(new FormData(form));

    if (data.needs_gear === undefined) {
      data.needs_gear = false;
    }

    try {
      const response = await timeout(
        5000,
        fetch(formUrl, {
          method: "POST",
          body: JSON.stringify(data),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.GATSBY_DETA_API_KEY}`,
            "X-Token": `${process.env.GATSBY_DETA_API_KEY}`,
          },
        })
      );
      if (!response.ok) {
        alert("Something went wrong. Please try again.");
      } else {
        alert(
          "Thanks for registering! You will receive an email from us soon."
        );
      }
    } catch {
      alert("Something went wrong. Please try again later.");
    } finally {
      toggleLoading();
    }
  };

  return (
    <form
      action={formUrl}
      method="post"
      autoComplete="true"
      onSubmit={formSubmitter}
    >
      <input type="hidden" name="event_name" value={eventName} />
      <input type="hidden" name="start_time" value={startTime} />
      <input type="hidden" name="location_description" value={locationDescription} />
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
        <label htmlFor="needs_gear">I need some gear</label>
        <input
          type="checkbox"
          name="needs_gear"
          id="needs_gear"
          value={needsGear}
          onChange={(e) => setNeedsGear(e.target.checked)}
        />
        <div className={actionStyles.gearInfo}>
          <FaQuestionCircle />
        </div>
        <div className={actionStyles.gearTooltip}>
          <p>
            If you dont have any gear, we can bring a ring, grabber and gloves
            for you.
          </p>
        </div>
      </div>
      <div className={actionStyles.signUpFormInput}>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default SignUpForm;
