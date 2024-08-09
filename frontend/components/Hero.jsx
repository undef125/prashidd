import React from "react";
import "./Hero.css"
import Card from "./Card";

export const Hero = () => {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" >
            <div className="blankwhitebackgroundbehindmalika"></div>
            <img src="malika1.png" className=" heroImage" alt="..." />
            {/* <div className="heroSectionText">
              <h3>Welcome to Kathford</h3>
              <h3>Here you,</h3>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <Card/>
    </>
  );
};

export default Hero;
