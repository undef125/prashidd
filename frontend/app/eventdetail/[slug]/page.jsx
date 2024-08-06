"use client";
import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMap,
  FaRegUserCircle,
  FaStar,
} from "react-icons/fa";
import { BiParty } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const { slug } = useParams();
  const [eventData, seEventData] = useState();
  const getSingleEvent = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/getevent/${slug}`);
      seEventData(resp.data.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (slug) {
      getSingleEvent();
    }
  }, [slug]);

  return (
    <>
    {console.log(eventData)}
      <div className="container">
        <div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <img
                  src={eventData?.image}
                  alt=""
                  className="img-fuild"
                  style={{
                    height: "500px",
                    width: "100%",
                    position: "center",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <p className="fs-1">{eventData?.eventName}</p>
                  <p>
                    <FaClock /> {eventData?.time}
                  </p>
                  <p>
                    <FaCalendarAlt /> {eventData?.date}
                  </p>
                  <p className="fs-5 fw-bold">
                    <FaMapMarkerAlt /> {eventData?.location}
                  </p>
                  <p className="fs-6">{eventData?.description}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <h3>More Events</h3>
              <div
                className="mt-2 mb-2"
                style={{ height: "3px", backgroundColor: "#2F2771" }}
              ></div>
              <div className="card mb-2">
                <div className="card-body">
                  <h3>Donate Blood</h3>
                  <p>
                    <BiParty />
                    Donate Blood
                  </p>
                  <p>
                    <FaCalendarAlt /> 2/2/2022
                  </p>
                  <p>Location</p>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-body">
                  <h3>Donate Blood</h3>
                  <p>
                    <BiParty />
                    Donate Blood
                  </p>
                  <p>
                    <FaCalendarAlt /> 2/2/2022
                  </p>
                  <p>Location</p>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-body">
                  <h3>Donate Blood</h3>
                  <p>
                    <BiParty />
                    Donate Blood
                  </p>
                  <p>
                    <FaCalendarAlt /> 2/2/2022
                  </p>
                  <p>Location</p>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-body">
                  <h3>Donate Blood</h3>
                  <p>
                    <BiParty />
                    Donate Blood
                  </p>
                  <p>
                    <FaCalendarAlt /> 2/2/2022
                  </p>
                  <p>Location</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div>
                <div
                  className="mt-2 mb-2"
                  style={{ height: "3px", backgroundColor: "#2F2771" }}
                ></div>

                <h2>Comments/ Reviews</h2>
                <form action="">
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1" className="mb-2">
                      Leave a Comment
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    style={{ backgroundColor: "#2F2771" }}
                  >
                    Submit
                  </button>
                </form>
                <div className="card mt-2">
                  <div className="card-body">
                    <p className="fw-bold">
                      <FaRegUserCircle />
                      BharatRand
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Et, deleniti nostrum nesciunt, velit ipsum blanditiis
                      perspiciatis similique enim voluptatum aut voluptates
                      porro tenetur quae!
                    </p>
                    <p>
                      <FaStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </p>
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body">
                    <p className="fw-bold">
                      <FaRegUserCircle />
                      BharatRand
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Iure, possimus. Illum iste maiores delectus explicabo.
                    </p>
                    <p>
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </p>
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body">
                    <p className="fw-bold">
                      <FaRegUserCircle />
                      BharatRand
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Cupiditate deleniti impedit dicta reiciendis asperiores
                      excepturi sint velit quod possimus?
                    </p>
                    <p>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <CiStar />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
