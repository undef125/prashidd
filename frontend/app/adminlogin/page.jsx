"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../register/register.css";

const page = () => {
  const router = useRouter();

  const hanldeOnSubmit = (event) => {
    console.log("hello!");
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(data);
    fetch("http://localhost:5000/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert(data.message);

        //   router.push(`/profile/${data.userId}`);
          router.push(`/admindashboard`);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div
        className="d-flex justify-content-center my-5"
        style={{ padding: "80px 0" }}
      >
        <form
          className="container"
          action=""
          style={{ width: "600px" }}
          onSubmit={hanldeOnSubmit}
          method="POST"
        >
          <div class="mb-3 d-flex gap-4">
            <label class="input-group-text">Email</label>
            <input
              type="text"
              aria-label="First name"
              class="form-control"
              name="email"
            />
          </div>
          <div class="mb-3 d-flex gap-4">
            <label class="input-group-text">Password</label>
            <input
              type="password"
              aria-label="First name"
              class="form-control"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
