import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import MainLogo from "../assets/TroepTroep.jpg";
import galleryStyles from "../styles/gallery.module.css";
import Img from "gatsby-image";
import { FaBalanceScale } from "react-icons/fa";
import HeaderVideo from "../assets/headervid.mp4";

const usePlayed = () => {
  return typeof window !== "undefined" && window.played;
};

export default function Home() {
  const onEndHeaderVideo = (e) => {
    e.target.style.opacity = 0;
    document.getElementById("main-logo-img").style.opacity = 1;
  };
  const played = usePlayed();

  useEffect(() => {
    window.played = true;
  }, []);

  return (
    <Container>
      <div className={galleryStyles.mainLogoContainer}>
        {!played && (
          <video
            autoPlay
            muted
            className={galleryStyles.headerVideo}
            onEnded={onEndHeaderVideo}
          >
            <source src={HeaderVideo} type="video/mp4" />
          </video>
        )}
        <img
          className={galleryStyles.mainLogo}
          src={MainLogo}
          alt=""
          id="main-logo-img"
          data-video-ended={played}
        />
      </div>
    </Container>
  );
}
