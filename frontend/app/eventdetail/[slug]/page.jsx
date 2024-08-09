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
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [eventData, setEventData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  const [eventsData, setEventsData] = useState([]);

  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");

      console.log(response.data);
      setEventsData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getevents();
  // });
  const getSingleEvent = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/getevent/${slug}`);
      setEventData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    console.log("button Cliekced");
    console.log(commentData);
    try {
      await axios.post(
        `http://localhost:5000/addcomment/${slug}`,
        commentData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) {
      getSingleEvent();
    }
    getevents();
  }, []);

  return (
    <>
      {console.log(eventData)}
      <div className="container">
        <div>
          <div className="row">
            <div className="col-lg-8 mt-5">
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
            <div className="col-lg-4 mt-0">
              <h3>More Events</h3>
              <div
                className="mt-2 mb-2"
                style={{ height: "3px", backgroundColor: "#2F2771" }}
              ></div>
              {eventsData.slice(0, 3).map((event, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body">
                    <h3>{event?.eventName}</h3>
                    <p>
                      <FaCalendarAlt /> {event?.date}
                    </p>
                    <p>
                      <FaMapMarkerAlt /> {event?.location}
                    </p>
                    <a
                      className="btn text-white"
                      style={{ backgroundColor: "#2f2771" }}
                      onClick={() => {
                        router.push(`/eventdetail/${event._id}`);
                      }}
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
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
                <form
                  method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addComment();
                  }}
                >
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1" className="mb-2">
                      Leave a Comment
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Write your comment here"
                      name="comment"
                      onChange={(e) => setCommentData(e.target.value)}
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
