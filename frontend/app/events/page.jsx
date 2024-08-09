"use client";
import React from "react";
import { Pacifico } from "next/font/google";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import "./event.css";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const page = () => {
  const [eventdata, setEventData] = useState([]);

  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");

      console.log(response.data);
      setEventData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getevents();
  });
  return (
    // <Navbar/>
    <>
      <div className={pacifico.className}>
        <h2
          className="text-center  display-2 fs-1 mt-4"
          style={{ color: "#2F2771" }}
        >
          Events
        </h2>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between pt-3">
          <div className="btn-group dropend" style={{ background: "#2F2771" }}>
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "rgb(47, 39, 113)" }}
            >
              Category
            </button>
            <ul
              className="dropdown-menu categoryListText"
              style={{ background: "#2F2771" }}
            >
              <li>
                <a className="dropdown-item" href="#">
                  Category A
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Category B
                </a>
              </li>
              {/* <hr className="dropdown-divider" /> */}
              <li>
                <a className="dropdown-item" href="#">
                  Category C
                </a>
              </li>
            </ul>
          </div>
          <div>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 searchBar"
                type="search"
                placeholder="Search events"
                aria-label="Search"
              />
              <button className="btn searchBox" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row gx-5 gy-5 mt-3">
          {eventdata.map((event) => (
            <div key={event._id} className="col-12 col-lg-4">
              <Card event={event} />
            </div>
          ))}
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
