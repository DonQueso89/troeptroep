import React from "react"
import { Link } from "gatsby"
import Container from "../components/container"
import MainLogo from "../../static/TroepTroep.jpg"
import Before from "../../static/before.jpeg"
import After from "../../static/after.jpeg"
import Logo from "../../static/logo.jpg"
import navStyles from "../styles/nav.module.css"
import galleryStyles from "../styles/gallery.module.css"
import { FaInstagram } from 'react-icons/fa';


export default function Home() {
  return (
    <Container>
      <div className={navStyles.nav}>
        <Link className={navStyles.navItem} activeStyle={{ color: "white" }} to="/manifest/" >Manifest</Link>
        <a  className={navStyles.navItem} target="_blank" href="https://www.instagram.com/troeptroep666/?igshid=1epjn1xua18g6"><FaInstagram/></a>
      </div>
      <img style={{ maxWidth: "100%", maxHeight: "100vh" }} src={MainLogo} alt="" />
      <div className={galleryStyles.outerContainer}>
        <div className={galleryStyles.galleryColumn}>
          <hr style={{width: "100%"}}/>
          <p>23-08-2020</p>
          <img className={galleryStyles.galleryItem} src={Before} alt="" />
          <hr style={{width: "100%"}}/>
        </div>
        <div className={galleryStyles.galleryColumn}>
          <hr style={{width: "100%"}}/>
          <p>52.351375,4.913661</p>
          <img className={galleryStyles.galleryItem} src={After} alt="" />
          <hr style={{width: "100%"}}/>
        </div>
      </div>
    </Container>
  )
}
