import React, { useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import SignUpModal from "../components/signUpModal";
import actionStyles from "../styles/action.module.css";
import { HelmetDatoCms } from "gatsby-source-datocms";
var pluscodes = require("open-location-code-typescript");

const gMapsURI = (loc) => {
  const plusCode = encodeURIComponent(
    pluscodes.default.encode(loc.latitude, loc.longitude)
  );
  return `https://www.google.com/maps/embed/v1/place?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&q=${plusCode}`;
};

const FutureEvent = ({ event, setActiveEvent }) => (
  <div className={actionStyles.eventItem}>
    <div className={actionStyles.eventPracticalInfo}>
      <h3>{event.title}</h3>
      <p>
        {event.date} | {event.city}
      </p>
      <p>
        Rendez-vous: {event.fmtStartTime} @ {event.meetingpointDescription}
      </p>
    </div>
    <a className={actionStyles.registerLink} onClick={() => setActiveEvent(event)}>
      Sign up
    </a>
    {false && (
      <img
        className={actionStyles.eventThumbnail}
        src={event.image}
        alt={event.title}
        width={100}
        height={100}
      />
    )}
    <div className={actionStyles.eventMap}>
      <iframe
        className={actionStyles.eventMapIframe}
        frameBorder={0}
        src={gMapsURI(event.location)}
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

const PastEvent = ({ event }) => (
  <div className={actionStyles.pastEventItem}>
    <div className={actionStyles.pastEventPracticalInfo}>
      <h3>{event.title}</h3>
      <p>
        {event.date} | {event.city}
      </p>
      <p>
        Rendez-vous: {event.fmtStartTime} @ {event.meetingpointDescription}
      </p>
    </div>
  </div>
);

const EventContainer = ({ children }) => {
  return <div className={actionStyles.eventContainer}>{children}</div>;
};

export default function Action({ data }) {
  const [activeEvent, setActiveEvent] = useState(null);
  const closeModal = () => setActiveEvent(null);
  const upcoming = [];
  const pastEvents = [];
  const now = new Date()
  
  data.allDatoCmsEvent.edges.map(({node}) => {
    if (new Date(node.date) >= now) {
      upcoming.push(<FutureEvent event={node} setActiveEvent={setActiveEvent} />)
    } else {
      pastEvents.push(<PastEvent event={node} />)
    }
  })
  return (
    <Container>
      <EventContainer>
        <h2>Upcoming</h2>
        {upcoming.sort((a, b) => a > b ? -1 : a < b ? 1 : 0)}
        <h2>Done</h2>
        {pastEvents}
      </EventContainer>
      <SignUpModal open={activeEvent ? true : false} event={activeEvent} closeModal={closeModal} />
    </Container>
  );
}

export const query = graphql`
  query q {
    allDatoCmsEvent(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          date
          endtime
          starttime
          fmtEndTime: endtime(formatString: "HH:mm:ss")
          fmtStartTime: starttime(formatString: "HH:mm:ss")
          meetingpointDescription
          city
          location {
            latitude
            longitude
          }
        }
      }
    }
  }
`;