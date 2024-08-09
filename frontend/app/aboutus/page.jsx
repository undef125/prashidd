"use client";
import React from "react";
import "./aboutus.css";

const Page = () => {
  return (
    <>
      {/* <header>
        <nav>
          <div className="logo"></div>
          <ul>
            <li><a href="#">Product</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Company</a></li>
          </ul>
          <a href="#" className="login-btn">Log in</a>
        </nav>
      </header> */}
      <div className="dabba">
        <section className="hero">
          <div className="content">
            <h1>We’re changing the way people connect.</h1>
            <p>
              Cuptidatat minim id magna ipsum sint dolor qui. Sunt sit in quis
              cupidatat mollit aute velit...
            </p>
          </div>
          <div className="images">
            <img src="image1.jpg" alt="Image 1" />
            <img src="image2.jpg" alt="Image 2" />
            <img src="image3.jpg" alt="Image 3" />
          </div>
        </section>

        <section className="mission">
          <div className="text">
            <h2>Our mission</h2>
            <p>
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
              sem...
            </p>
          </div>
          <div className="stats">
            <p>
              <strong>44 million</strong>
              <br />
              Transactions every 24 hours
            </p>
            <p>
              <strong>$119 trillion</strong>
              <br />
              Assets under holding
            </p>
            <p>
              <strong>46,000</strong>
              <br />
              New users annually
            </p>
          </div>
        </section>

        <section className="values">
          <h2>Our values</h2>
          <div className="value-cards">
            <div className="card">...</div>
            <div className="card">...</div>
            <div className="card">...</div>
          </div>
        </section>

        <section className="team">
          <h2>Our team</h2>
          <div className="team-members">
            <div className="member">...</div>
            <div className="member">...</div>
          </div>
        </section>

        <section className="blog">
          <h2>From the blog</h2>
          <div className="blog-posts">
            <div className="post">...</div>
            <div className="post">...</div>
            <div className="post">...</div>
          </div>
        </section>

        {/* <footer>
        <p>Trusted by the world's most innovative teams</p>
        <div className="logos">...</div>
      </footer> */}
      </div>
    </>
  );
};

export default Page;
