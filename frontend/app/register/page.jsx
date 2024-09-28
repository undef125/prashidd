"use client";
import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import './register.css';

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const router = useRouter();
  const hanldeOnSubmit = (event) => {
    console.log("hello!");

    event.preventDefault();

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      batch: event.target.batch.value,
      gender: event.target.gender.value,
      interestedIn: event.target.interestedIn.value,
    };
    console.log(data);
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Registration successful");
          router.push("/login");
        }
      })
      .catch((err) => console.log(err));
    console.log(
      event.target.name.value,
      event.target.email.value,
      event.target.password.value
    );
    event.target.reset();
  };

  return (
    <>
      <div className="d-flex justify-content-center mainn">
        <div 
          style={{ width: "50vw" }}
        >
          <form
            className="container p-5"
            method="POST"
            style={{ width: "600px" }}
            onSubmit={hanldeOnSubmit}
          >
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Full name</label>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                name="name"
              />
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Email</label>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                name="email"
              />
            </div>
            <div class="mb-3 d-flex gap-4 aakhakoiconbox">
              <label class="input-group-text">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                aria-label="First name"
                class="form-control"
                name="password"
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={togglePasswordVisibility}
                  className="fs-3 aakhakoicon"
                />
              ) : (
                <FaEye onClick={togglePasswordVisibility} className="fs-3 aakhakoicon" />
              )}
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Batch</label>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                name="batch"
                placeholder="Enter batch number as year in AD"
              />
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text ">Gender</label>
              <select id="" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Interested in</label>
              <select name="interestedIn" id="">
                <option value="">apple</option>
                <option value="">ball</option>
                <option value="">cat</option>
              </select>
            </div>
            {/* <div class="mb-3 d-flex gap-4">
            <label class="input-group-text">Image</label>
            <input type="file" aria-label="First name" class="form-control" />
          </div> */}
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
            <p>
              Already have an account?{" "}
              <a onClick={()=>{
                router.push("/login")
              }}>Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
