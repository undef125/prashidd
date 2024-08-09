"use client";
import React from "react";

import "../profile.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const verifier = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/verifyuser", {
        withCredentials: true,
      });
      //
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  useEffect(() => {
    verifier();
  });

  return (
    <>
      {" "}
      <div class="container">
        <div class="profile-header">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile Image"
            class="profile-image"
          />
          <h1 class="name">Shamim Hossain</h1>
          <p class="username">@shamingraphics</p>
          <button class="edit-profile-button">Edit Profile</button>
        </div>

        <div class="section">
          <h2 class="section-title">Settings</h2>
          <ul class="section-content">
            <li class="section-item">Billing Details</li>
            <li class="section-item">User Management</li>
            <li class="section-item">Information</li>
            <li class="section-item">Log out</li>
          </ul>
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <span class="detail-title">Name</span>
            <span class="detail-text">Shamim Hossain</span>
          </div>
          <div class="detail-item">
            <span class="detail-title">Email Address</span>
            <span class="detail-text">youremail@gmail.com</span>
          </div>
          <div class="detail-item">
            <span class="detail-title">Username</span>
            <span class="detail-text">@shamingraphics</span>
          </div>
          <div class="detail-item">
            <span class="detail-title">Password</span>
            <span class="detail-text">••••••••</span>
          </div>
          <div class="detail-item">
            <span class="detail-title">Birth Date</span>
            <span class="detail-text">10.23.1989</span>
          </div>
          <div class="detail-item">
            <span class="detail-title">Joined</span>
            <span class="detail-text">Joined at March 2022</span>
          </div>
          <button class="logout-button">Logout</button>
        </div>
      </div>
    </>
  );
};

export default page;
