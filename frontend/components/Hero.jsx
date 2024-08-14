"use client";
// import React from "react";
import React, { useState, useEffect } from "react";
import "./Hero.css";
import {
  MdOutlineEmojiEvents,
  MdOutlineSportsKabaddi,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { SiRepublicofgamers } from "react-icons/si";
import { IoGameControllerOutline } from "react-icons/io5";
import { TfiMusicAlt } from "react-icons/tfi";

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
              <h2
                className="currentWord"
                style={{ display: "inline", color: "#4a90e2" }}
              >
                {currentWord}
              </h2>
              <span className="cursor">|</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex p-4 justify-content-center align-item-center">
        <div className="whoAreWe">
          <h1>Who are We?</h1>
          <h4>I'm Christy Smith, a Web Designer & Photographer</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            <span>CONNECT WITH US</span> icons
          </p>
        </div>
        <div className="whoAreWeImage">
          {/* <img src="../public/why-study-management.jpg" alt="" /> */}
        </div>
      </div>
      <div className="weGoodAt">
        <div className="weGoodAtText">
          <h1>Here's what we're good at</h1>
          <h4>These are the services we offer</h4>
        </div>
        <div className="weGoodAtCards">
          <div className="weGoodAtCard">
            <div className="icon">
              <MdOutlineEmojiEvents />
            </div>
            <h3>Event Management</h3>
            <p>
              Plan and execute successful college events with our comprehensive
              management tools.
            </p>
          </div>
          <div className="weGoodAtCard">
            <div className="icon">
              <MdOutlineSportsKabaddi />
            </div>
            <h3>Sports Events Coordination</h3>
            <p>
              Organize and manage college sports events, ensuring smooth
              coordination and engagement.
            </p>
          </div>
          <div className="weGoodAtCard">
            <div className="icon">
              <MdOutlineSportsVolleyball />
            </div>
            <h3>Recreational Activities</h3>
            <p>
              Facilitate a variety of recreational activities, from intramurals
              to fun competitions.
            </p>
          </div>
          <div className="weGoodAtCard">
            <div className="icon">
              <SiRepublicofgamers />
            </div>
            <h3>eSports Tournaments</h3>
            <p>
              Host and manage eSports tournaments with ease, catering to the
              growing gaming community.
            </p>
          </div>
          <div className="weGoodAtCard">
            <div className="icon">
              <IoGameControllerOutline />
            </div>
            <h3>Gaming Events</h3>
            <p>
              Bring students together through gaming events, from casual meetups
              to competitive play.
            </p>
          </div>
          <div className="weGoodAtCard">
            <div className="icon">
              <TfiMusicAlt />
            </div>
            <h3>Music and Cultural Events</h3>
            <p>
              Organize music, arts, and cultural events that resonate with the
              college community.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
