import React from "react"
import Container from "../components/container"
import actionStyles from "../styles/action.module.css"

const EventItem = ({ title, date, place }) => <div className={actionStyles.EventItem}>
    <h3>{title}</h3>
    <hr />
    <p>{date} | {place}</p>
</div>

export default function Action() {
    return (
        <Container>
            <EventItem title={"the Purging"} date={"18, 19 and 20 Sept. 2020"} place={"Amsterdam"} />
        </Container>
    )
}
