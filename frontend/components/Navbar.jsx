"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import "./Hero.css";
const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <div className="Navbar" style={{backgroundColor: "rgb(47, 39, 113)"}}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand text-white" onClick={()=> {router.push("/")}}>
              <img src="Kathford-logo.png" alt="" className="img-fluid"/>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <img src="Kathford-logo.png" alt="" />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body text-white">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 align-items-center gap-4">
                  <li className="nav-item">
                    <a className="nav-link active text-white" aria-current="page" onClick={()=> {router.push("/")}}>
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" onClick={()=> {router.push("/events")}}>
                      Events
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" onClick={()=> {router.push("/myevents")}}>
                      My events
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">
                      Log out
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" onClick={()=> {router.push("/contactus")}}>
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" onClick={()=> {router.push("/profile")}}>
                    <CgProfile />
                    </a>
                  </li>
                </ul>
                {/* <form className="d-flex mt-0" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
