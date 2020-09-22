import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import MainLogo from "../assets/TroepTroep.jpg"
import galleryStyles from "../styles/gallery.module.css"
import Img from "gatsby-image"


const SingleImageThumbnail = ({ node }) => {
  return <div className={galleryStyles.galleryImage}>
    <Img fixed={node.frontmatter.image.childImageSharp.fixed} alt="" />
    <div className={galleryStyles.thumbnailOverlay}>{node.frontmatter.date} | {node.frontmatter.latlong}</div>
  </div>
}

const BeforeAfterThumbnail = ({ node }) => {
  return <div className={galleryStyles.galleryImage}>
    <Img fixed={node.frontmatter.before_image.childImageSharp.fixed} alt="" />
    <div className={galleryStyles.thumbnailOverlay}>{node.frontmatter.date} | {node.frontmatter.latlong}</div>
  </div>
}

export default function Home({ data }) {
  const thumbnails = data.allMarkdownRemark.edges.map(({ node }) => { 
    if (node.frontmatter.entry_type === "before_after") { 
      return <BeforeAfterThumbnail node={node} /> 
    } else { 
      return <SingleImageThumbnail node={node} />
    }
  })
  return (
    <Container>
      <img style={{ maxWidth: "auto", maxHeight: "100vh" }} src={MainLogo} alt="" />
      <div className={galleryStyles.outerContainer}>
        <hr style={{ width: "100%", backgroundColor: "white" }} />
        {thumbnails}
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
