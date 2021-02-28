import React, {useState} from "react";
import containerStyles from "./container.module.css";
import { Link, useStaticQuery, graphql } from "gatsby";
import navStyles from "../styles/nav.module.css";
import { FaInstagram } from "react-icons/fa";
import Logo from "../assets/TroepTroep.jpg";
import Helmet from "react-helmet";
import Footer from "./footer";
import SubscribeModal from "../components/SubscribeModal";

const TinyLogo = () => {
  return (
    <Link className={navStyles.navHomeLink} to="/">
      <img className={navStyles.navLogo} src={Logo} atl="tinylogo" />
    </Link>
  );
};

const NavBar = () => {
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const toggleSubscribeModal = () => {
      setSubscribeModalOpen(v => !v)
  }
  return (
    <div className={navStyles.nav}>
      <Link
        className={navStyles.navItem}
        activeStyle={{ color: "white" }}
        to="/action/"
      >
        Calendar
      </Link>
      <a
        className={navStyles.navItem}
        target="_blank"
        rel="noreferrer"
        href="https://www.instagram.com/troeptroep666/?igshid=1epjn1xua18g6"
      >
        #<FaInstagram />
      </a>
      <div
        className={navStyles.subscribeButton}
        onClick={toggleSubscribeModal}
      >
        Subscribe&nbsp;
      </div>
      <div style={{ fontSize: "14px" }}>to our event notifications</div>
      <TinyLogo />
      <SubscribeModal open={subscribeModalOpen} closeModal={toggleSubscribeModal}/>
    </div>
  );
};

const SEO = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta
        name="description"
        content="TroepTroep Amsterdam trash hunting collective turns frustration into meditation by hunting trash
            in the streets of Amsterdam"
      />
    </Helmet>
  );
};

const Container = ({ children }) => {
  return (
    <div className={containerStyles.container}>
      <SEO />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};
export default Container;
