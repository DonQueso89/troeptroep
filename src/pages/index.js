import React from "react"
import { Link } from "gatsby"
import Container from "../components/container"
import MainLogo from "../../static/TroepTroep.jpg"

export default function Home() {
  return (
    <Container>
      <Link activeStyle={{ color: "white" }} to="/manifest/" >Manifest</Link>
      <img style={{ maxWidth: "100%", maxHeight: "100vh" }} src={MainLogo} alt="" />
    </Container>
  )
}
