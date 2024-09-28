"use client";
import React from "react";

import "../profile.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useParams } from "next/navigation";
import { contextAPI } from "@/context/ContextPro";

const page = () => {
  const { verifyUser } = useContext(contextAPI);
  const param = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const [userData, setUserData] = useState();
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

  const getUserData = async (id) => {
    try {
      const resp = await axios.get(`http://localhost:5000/getuser/${id}`);
      if (resp.data.status === "okay") {
        setUserData(resp.data.data);
        console.log(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (userId) => {
    console.log(userId);
    try {
      await axios.post(
        `http://localhost:5000/updateprofile/${userId}`,
        updateData
      );
      getUserData(userId);
      setIsEditing(false);
      setUpdateData({});
    } catch (error) {
      console.log("error updating profile", error);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get(`http://localhost:5000/logoutuser`, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error) {
      console.log("error loggin out!");
    }
  };

  useEffect(() => {
    verifier();
    verifyUser();
    getUserData(param.slug);
  }, []);

  return (
    <>
      {" "}
      <div class="container">
        <div class="profile-header">
          <img
            src={
              userData?.gender == "male"
                ? "/male.png"
                : userData?.gender == "female"
                ? "/female.png"
                : "/others.png"
            }
            alt="Profile Image"
            class="profile-image"
          />
          <h1 class="name">{userData?.name}</h1>
          <p class="username">{userData?.email}</p>
          {!isEditing && (
            <button
              class="edit-profile-button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <span class="detail-title">Name</span>
            {isEditing ? (
              <input
                type="text"
                className="border-0 border-bottom"
                defaultValue={userData?.name}
                onChange={(e) => {
                  setUpdateData({ ...updateData, name: e.target.value });
                }}
              />
            ) : (
              <span class="detail-text">{userData?.name}</span>
            )}
            {/*  */}
          </div>
          <div class="detail-item">
            <span class="detail-title">Email Address</span>
            {isEditing ? (
              <input
                type="text"
                className="border-0 border-bottom"
                value={userData?.email}
              />
            ) : (
              <span class="detail-text">{userData?.email}</span>
            )}
            {/* <span class="detail-text">{userData?.email}</span> */}
          </div>
          <div class="detail-item">
            <span class="detail-title">Batch</span>
            {isEditing ? (
              <input
                type="text"
                className="border-0 border-bottom"
                defaultValue={userData?.batch}
                onChange={(e) => {
                  setUpdateData({ ...updateData, batch: e.target.value });
                }}
              />
            ) : (
              <span class="detail-text">{userData?.batch}</span>
            )}
          </div>
          <div class="detail-item">
            <span class="detail-title">Gender</span>
            {isEditing ? (
              <input
                type="text"
                className="border-0 border-bottom"
                defaultValue={userData?.gender}
                onChange={(e) => {
                  setUpdateData({ ...updateData, gender: e.target.value });
                }}
              />
            ) : (
              <span class="detail-text">{userData?.gender}</span>
            )}
          </div>
          {/* <div class="detail-item">
            <span class="detail-title">Birth Date</span>
            <span class="detail-text">10.23.1989</span>
          </div> */}
          <div class="detail-item">
            <span class="detail-title">Joined</span>
            <span class="detail-text">{userData?.createdAt.split("T")[0]}</span>
          </div>
          {isEditing ? (
            <div className="w-100 d-flex justify-content-center gap-5 px-5 ">
              <button
                class="btn btn-danger"
                style={{
                  width: " 20%",
                }}
                onClick={() => {
                  setIsEditing(false);
                  setUpdateData({});
                }}
              >
                Cancel
              </button>
              <button
                class="btn btn-success"
                style={{
                  width: " 20%",
                }}
                onClick={() => {
                  updateProfile(param?.slug);
                }}
              >
                Update
              </button>
            </div>
          ) : (
            <>
              {" "}
              <button
                class="logout-button"
                onClick={() => {
                  logoutUser();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
