"use client";
import React from "react";
import { Pacifico } from "next/font/google";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const page = () => {
  return (
    // <Navbar/>
    <>
      <div  className={pacifico.className}>
        <h2
          className="text-center text-black display-2"
        >
          Events
        </h2>
      </div>
      <div className="container" >
        <div className="d-flex justify-content-between pt-3">
          <div className="btn-group dropend">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "rgb(47, 39, 113)" }}
            >
              Dropup
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div>
          <div>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row gx-5 gy-5 mt-3">
          <div className="col-12 col-lg-4">
            <Card />
          </div>
          <div className="col-12 col-lg-4">
            <Card />
          </div>
          <div className="col-12 col-lg-4">
            <Card />
          </div>
          <div className="col-12 col-lg-4">
            <Card />
          </div>
          <div className="col-12 col-lg-4">
            <Card />
          </div>
          <div className="col-12 col-lg-4">
            <Card />
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default page;
