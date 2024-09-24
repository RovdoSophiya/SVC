import React, { Component } from "react";
import "./reviews-image.css";
const ReviewImage = () => {
  const Text = ["Reviews", "What our customers say about us"];

  return (
    <section className="reviews-image">
      <div className="reviews-page-info">
        <p
          className="reviews-image-section-text1"
          id="reviews"
          data-i18="reviewsInfo"
        >
          {Text[0]}
        </p>
        <p
          className="reviews-image-section-text2"
          id="reviews-2"
          data-i18="custSay"
        >
          {Text[1]}
        </p>
      </div>
    </section>
  );
};

export default ReviewImage;
