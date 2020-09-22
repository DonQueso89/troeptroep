import React from "react"
import Container from "../components/container"
import actionStyles from "../styles/action.module.css"
import eventImage from "../assets/event_the_purging.jpeg"

const EventItem = ({ title, date, place }) => <div className={actionStyles.EventItem}>
    <h3>{title}</h3>
    <vr />
    <p>{date} | {place}</p>
    <img src={eventImage} alt="The purging" width={500} height={500}/>
</div>

export default function Action() {
    return (
        <Container>
            <h2 >Upcoming</h2>
            <hr style={{ width: "100%", backgroundColor: "white" }} />
            <h2  >Done</h2>
            <hr style={{ width: "100%", backgroundColor: "white" }} />
            <EventItem title={"the Purging"} date={"18, 19 and 20 Sept. 2020"} place={"Amsterdam"} />
        </Container>
    )
}
