import React from "react"
import Container from "../components/container"
import MainLogo from "../assets/TroepTroep.jpg"
import Before from "../assets/before.jpeg"
import After from "../assets/after.jpeg"
import galleryStyles from "../styles/gallery.module.css"

const GalleryItem = ({ beforeImgSrc, afterImgSrc, text }) => {
  return <div className={galleryStyles.galleryItem}>
    <div className={galleryStyles.galleryItemText}>
      <p>23-08-2020 - 52.351375,4.913661</p>
    </div>
    <div className={galleryStyles.galleryImageContainer}>
      <img className={galleryStyles.galleryImage} src={beforeImgSrc} alt="" />
    </div>
    <div className={galleryStyles.galleryImageContainer}>
      <img className={galleryStyles.galleryImage} src={afterImgSrc} alt="" />
    </div>
    <div className={galleryStyles.galleryItemText}>
      <p>
        A clothing donation container becomes a street fitting room for those in need. One of the inhabitants of the street says she's seen them go around at night taking clothing out of the
        container. Some of them even have long poles so they can reach down further. She understands and does not frown upon these people, they surely need it.
      </p>
      <p>
        We find six bags ripped open with mouldy but otherwise perfectly fine clothing spread out over the green strip between the train tracks and the sidewalk, mixed with empty cartons of cheap alcohol.
        Discarded twice. First by their buying owners and then by the ones who did not fit them in the dead of night.
      </p>
    </div>
  </div>
}


export default function Home() {
  return (
    <Container>
      <img style={{ maxWidth: "auto", maxHeight: "100vh" }} src={MainLogo} alt="" />
      <div className={galleryStyles.outerContainer}>
        <hr style={{ width: "100%" }} />
        <GalleryItem beforeImgSrc={Before} afterImgSrc={After} text={"Hello world"} />
        <hr style={{ width: "100%" }} />
      </div>
    </Container>
  )
}
