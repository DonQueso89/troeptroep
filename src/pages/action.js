import React from "react";
import Container from "../components/container";
import actionStyles from "../styles/action.module.css";
import eventImage from "../assets/event_the_purging.jpeg";

const EVENT = {
  title: "the Purging",
  date: "18, 19 and 20 Sept. 2020",
  time: "12:00AM",
  location: "Amsterdam",
  image: eventImage,
  latitude: 52.341873, 
  longitude: 4.940575,
  registerURL: "https://www.lolcatz.com",
  locationDescription: "stairs in front of hotel Arena",
  googleMapsURL: ""
};

const EVENT2 = {
  title: "Weekly cleanup",
  date: "18 January 2021",
  time: "13:00AM",
  location: "Amsterdam",
  image: eventImage,
  latitude: 52.341873, 
  longitude: 4.940575,
  registerURL: "https://www.jacodeswart.com",
  locationDescription: "large plataan in front of Generator",
  googleMapsURL: ""
};

const EventItem = ({event}) => (
  <div className={actionStyles.eventItem}>
    <div className={actionStyles.eventPracticalInfo}>
    <h3>{event.title}</h3>
    <p>
      {event.date} | {event.location}
    </p>
    <p>
      Rendez-vous: {event.time} @ {event.locationDescription}
    </p>
    </div>
    <a href={event.registerURL} className={actionStyles.registerLink} target={"_blank"} rel="noreferrer">Sign up</a> 
    {false && <img className={actionStyles.eventThumbnail} src={event.image} alt={event.title} width={100} height={100} />}
    <div className={actionStyles.eventMap}>
        <iframe
            className={actionStyles.eventMapIframe}
            frameborder={0}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDFIJIp46n1Ah-zLLryIlWZ0ieUzx5m4js&q=9W2H%2BJP`}
            allowFullScreen>
        </iframe>
    </div>
  </div>
);

const EventContainer = ({ children }) => {
    return <div className={actionStyles.eventContainer}>{children}</div>
}

export default function Action() {
  return (
    <Container>
      <EventContainer>
        <h2>Upcoming</h2>
        <EventItem event={EVENT} />
        <EventItem event={EVENT2} />
      </EventContainer>
    </Container>
  );
}
