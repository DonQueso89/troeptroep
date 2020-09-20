import React from "react"
import containerStyles from "./container.module.css"
import { Link } from "gatsby"
import navStyles from "../styles/nav.module.css"
import { FaInstagram } from 'react-icons/fa';
import Logo from "../assets/TroepTroep.jpg"

const TinyLogo = () => {
    return <Link className={navStyles.navHomeLink} to="/"><img className={navStyles.navLogo} src={Logo} atl="tinylogo" /></Link>
}

const NavBar = () => {
    return (
        <div className={navStyles.nav}>
            <Link className={navStyles.navItem} activeStyle={{ color: "white" }} to="/manifest/" >Manifest</Link>
            <Link className={navStyles.navItem} activeStyle={{ color: "white" }} to="/action/" >Action</Link>
            <a className={navStyles.navItem} target="_blank" rel="noreferrer" href="https://www.instagram.com/troeptroep666/?igshid=1epjn1xua18g6">#CTFO<FaInstagram /></a>
            <TinyLogo />
        </div>
    )
}

const Container = ({ children }) => {
    return <div className={containerStyles.container}>
        <NavBar />
        {children}
    </div>
}
export default Container