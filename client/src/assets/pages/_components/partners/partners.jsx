import React from "react";
import { ImageList, ImageListItem } from "@mui/material";
import "./partners.css";
import Image1 from "../../../img/customers/visa.png";
import Image2 from "../../../img/customers/amazon.png";
import Image3 from "../../../img/customers/disney.png";
import Image4 from "../../../img/customers/sephora.png";
import Image5 from "../../../img/customers/nsw.png";

const ImageGallery = () => {
  const images = [
    { src: Image1, alt: "Visa" },
    { src: Image2, alt: "Amazon" },
    { src: Image3, alt: "Disney" },
    { src: Image4, alt: "Sephora" },
    { src: Image5, alt: "Nsw" },
  ];

  return (
    <div className="partnersContainer">
      <p>Just some of our happy customers</p>
      <ImageList
        sx={{ width: "100%", height: "auto" }}
        cols={5} // Пять картинок в ряд
      >
        {images.map((image, index) => (
          <ImageListItem key={index} sx={{ padding: "8px" }}>
            <img
              src={`${image.src}`}
              srcSet={`${image.src}`}
              alt={image.alt}
              loading="lazy"
              className="partnersImage"
              style={{
                width: "60%",
                height: "auto",
                margin: "auto",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageGallery;
