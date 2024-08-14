"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "";
// const getData = () => {
//   const id = toast.loading("Please wait...")
//   axios.get(`some-url`)
//     .then(res => { 
//        toast.update(id, {render: "All is good", type: "success", isLoading: false});
//   }).catch(err => {
//          toast.update(id, {render: "Something went wrong", type: "error", isLoading: false });
//     });
//  }

const page = () => {
  const router = useRouter();

  const notifyLogin = () => {
    toast.success("Admin logged in successfully!");
  };
  const loginFail = () => {
    toast.warn("Admin not found!");
  };

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
          notifyLogin();

          //   router.push(`/profile/${data.userId}`);
          router.push(`./admindashboard`);
        } else {
          loginFail();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <ToastContainer />
      <div className=" my-5  adminLogin" style={{ padding: "80px 0" }}>
        <form
          className="container"
          action=""
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
