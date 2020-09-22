import React from "react"
import containerStyles from "./container.module.css"
import { Link, useStaticQuery, graphql } from "gatsby"
import navStyles from "../styles/nav.module.css"
import { FaInstagram } from 'react-icons/fa';
import Logo from "../assets/TroepTroep.jpg"
import Helmet from 'react-helmet'

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

const SEO = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    return <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" 
            content="TroepTroep Amsterdam trash hunting collective turns frustration into meditation by hunting trash
            in the streets of Amsterdam"
        />
        
    </Helmet>
}

const Container = ({ children }) => {
    return <div className={containerStyles.container}>
        <SEO/>
        <NavBar />
        {children}
    </div>
}
export default Container