"use client";
// import React from "react";
import React, { useState, useEffect } from "react";
import "./Hero.css";

export const Hero = () => {
  // for font Animation
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["Learn", "Engage", "Grow", "Achieve"];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayAfterWord = 1000;

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[wordIndex];
      if (isDeleting) {
        setCurrentWord(fullWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setCurrentWord(fullWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === fullWord.length) {
        setTimeout(() => setIsDeleting(true), delayAfterWord);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingTimer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(typingTimer);
  }, [charIndex, isDeleting, wordIndex, words]);
  // for font Animation

  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators"></div>
        <div className="carousel-inner">
          <div className="carousel-item active d-flex d-column align-item-center justify-content-around">
            <div className="blankwhitebackgroundbehindmalika "></div>
            <img src="malika1.png" className=" heroImage" alt="..." />
            <div className="heroSectionText">
              <h1>Welcome to Kathford</h1>
              <h2 className="hereYou">Here you,</h2>
              <h2 className="currentWord" style={{ display: "inline", color: "#4a90e2" }}>
                {currentWord}
              </h2>
              <span className="cursor">|</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
