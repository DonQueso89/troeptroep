import React, { useState } from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import MainLogo from "../assets/TroepTroep.jpg"
import galleryStyles from "../styles/gallery.module.css"
import Img from "gatsby-image"
import { FaBalanceScale } from "react-icons/fa"
import HeaderVideo from "../assets/headervid.mp4"

const usePlayed = () =>{
  const played = window.played
  window.played = played || true
  return played
}

export default function Home({ data }) {
  const onEndHeaderVideo = (e) => {
    e.target.style.opacity = 0;
    document.getElementById("main-logo-img").style.opacity = 1;
  }
  const played = usePlayed()

  return (
    <Container>
      <div className={galleryStyles.mainLogoContainer}>
        { !played &&
        <video autoPlay muted className={galleryStyles.headerVideo} onEnded={onEndHeaderVideo}>
          <source src={HeaderVideo} type="video/mp4" />
        </video>
        }
        <img className={galleryStyles.mainLogo} src={MainLogo} alt="" id="main-logo-img" data-video-ended={played} />
      </div>
    </Container>
  )
}

export const query = graphql`query {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          after_image {
            childImageSharp {
              fixed(width: 250, height: 250) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        	before_image {
            childImageSharp {
              fixed(width: 250, height: 250) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        	image {
            childImageSharp {
              fixed(width: 250, height: 250) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          date
          latlong
          entry_type
        }
      }
    }
  }
}`
