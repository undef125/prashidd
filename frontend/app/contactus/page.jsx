"use client";
import React from "react";
import "./contactUs.css";

const Page = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* <img src="logo.png" alt="Pixpa Logo" className="logo" /> */}
            <h1>More than just a website</h1>
            <p>
              Plan Events · Manage Registrations · Coordinate Teams · Track
              Attendance
            </p>
            <button
              className="btn getStartedButton"
              onClick={() => {
                router.push("/events");
              }}
            >
              GET STARTED
            </button>
            {/* <p>15 Day Free Trial. No Credit Card Required.</p> */}
          </div>
        </div>
      </header>

      <section className="contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <p>
            Please fill out the quick form and we will be in touch with
            lightning speed.
          </p>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Your email address" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit" className="btn getStartedButton2 ">
              SUBMIT
            </button>
          </form>
          <div className="contact-info">
            <h3>Connect with us:</h3>
            <p>
              For support or any questions: Email us at{" "}
              <a href="mailto:randomemail@gmail.com">randomemail@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
