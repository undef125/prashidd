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
        <section className="hero " >
          <img src="lines.png" className="backgroundImage" alt="" />
          <div className="content" >
            <h1 className="">We’re changing the</h1>
            <h1>way people connect.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tenetur atque quis quae fuga nobis odio sapiente, veniam quibusdam ex inventore quod totam. Quibusdam nam possimus, nesciunt aliquid veniam debitis rem officia esse ratione recusandae.
            </p>
          </div>
          <div className="images">
            <img src="1.jpg" alt="Image 1" />
            <img src="1.jpg" alt="Image 2" />
            <img src="1.jpg" alt="Image 3" />
          </div>
        </section>

        <section className="mission">
          <div className="text">
            <h2>Our mission</h2>
            <p>Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.
            </p>
            <p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.</p>
            <p>Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.</p>
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
