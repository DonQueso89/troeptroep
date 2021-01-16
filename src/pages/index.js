import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import MainLogo from "../assets/TroepTroep.jpg"
import galleryStyles from "../styles/gallery.module.css"
import Img from "gatsby-image"
import { FaBalanceScale } from "react-icons/fa"
import HeaderVideo from "../assets/headervid.mp4"


export default function Home({ data }) {
  return (
    <Container>
      <div className={galleryStyles.mainLogoContainer}>
        <video autoPlay muted className={galleryStyles.headerVideo} onEnded={(e) => { e.target.style.opacity = 0; }}>
          <source src={HeaderVideo} type="video/mp4" />
        </video>
        <img style={{ maxWidth: "100%", maxHeight: "90vh", transform: "scale(1.5, 1)" }} src={MainLogo} alt="" />
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
