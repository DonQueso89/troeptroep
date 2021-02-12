import React from "react"
import Container from "../components/container"
import { Link } from "gatsby"
import manifestStyles from "../styles/manifest.module.css"

export default function Manifest() {
    return (
        <Container>
            <div className={manifestStyles.textContainer}>
            <p>UltraCapitalism is eating our humanity. Sit down, breathe slow. Meditate on how UltraCapitalism has shapen your fake identity.</p>
            <p>The challenge of our time is to prompt collective metanoia. Embrace your fellow humans. They are you.</p>
            <p>Embrace past humans. They are you.</p>
            <p>Embrace future humans. They are you.</p>
            <p>Embrace all animals. They are you.</p>
            <p>Fuck UltraCapitalism.</p>
            <p>Joy is here and now. In your hands. In your sweat. In our perpetual tragedy. In the ridiculousness and grandness of the fact of our existence.</p>
            <p>We do not need UltraCapitalism to find joy. We need eachother, our playfulness, our shared energy, our inborn curiosity for the world.</p>
            <p>Turn your frustration into meditation. <Link to="/action/" style={{color: "green"}}> Join us</Link></p>
            </div>
        </Container>
    )
}