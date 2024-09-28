"use client";
import React from "react";
import "./contactUs.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const handleOnClick = async (e) => {
    const toastId = toast.loading("Submitting your Query...");
    e.preventDefault();
    const data = {
      name: e.target.userName.value,
      email: e.target.userEmail.value,
      message: e.target.userMessage.value,
    };
    try {
      console.log(data);
      await axios.post("http://localhost:5000/postquery", data);
      toast.success("Query submitted!");
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Server Error!");
      toast.dismiss(toastId);
    }
  };
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
          <form method="POST" onSubmit={handleOnClick}>
            <input type="text" placeholder="Name" name="userName" required />
            <input
              type="email"
              placeholder="Your email address"
              name="userEmail"
              required
            />
            <textarea
              placeholder="Message"
              name="userMessage"
              required
            ></textarea>
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
