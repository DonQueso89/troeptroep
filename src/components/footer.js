import React from 'react'
import {Link} from "gatsby"
import containerStyles from "./container.module.css"

const Footer = (props) => (
    <footer className={containerStyles.footer}>
        <p className="copyright">
            ||||| |||| <Link activeStyle={{ color: "white" }} to="/" >Manifest </Link>
             |||| |||| &copy; Built by: <a  target="_blank" rel="noreferrer" href="https://github.com/DonQueso89">DonQueso89</a> |||| ||||| </p>
    </footer>
)

export default Footer