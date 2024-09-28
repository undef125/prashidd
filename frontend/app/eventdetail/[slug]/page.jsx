"use client";
import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMap,
  FaRegUserCircle,
} from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { RiEmotionHappyLine } from "react-icons/ri";
import { BiParty } from "react-icons/bi";
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

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");

      console.log(response.data);
      setEventsData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleEvent = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/getevent/${slug}`);
      setEventData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/addcomment/${slug}`,
        {
          comment: commentData,
        },
        {
          withCredentials: true,
        }
      );
      getSingleEvent();
      setCommentData("");
    } catch (error) {
      console.log(error);
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      const resp = await axios.get(`http://localhost:5000/applyforevent/${eventId}`, {
        withCredentials: true,
      });
      alert(resp.data.message)
      if(resp.data.status === "applied"){
        alert(resp.data.message);
      }
    } catch (error) {
      console.log("error", error);
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
          <div className="row" style={{ marginTop: "-15px" }}>
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
                    <FaCalendarAlt /> {formatDate(eventData?.date)}
                  </p>
                  <p className="fs-5 fw-bold">
                    <FaMapMarkerAlt /> {eventData?.location}
                  </p>
                  <p className="fs-6">{eventData?.description}</p>
                  <a
                    className="btn text-white"
                    style={{ backgroundColor: "#2f2771" }}
                    onClick={() => {
                      registerForEvent(slug);
                    }}
                  >
                    Register Here
                  </a>
                  F
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-5">
              <h3>More Events</h3>
              <div
                className="mt-2 mb-2"
                style={{ height: "3px", backgroundColor: "#2F2771" }}
              ></div>
              {eventsData.slice(0, 4).map((event, index) => (
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
                {console.log(eventData.comments)}
                {eventData.comments && eventData.comments.length > 0 ? (
                  eventData.comments.slice(0,5).map((comment, index) => (
                    <div
                      className="card mt-2 d-flex flex-row justify-content-around align-item-center "
                      key={index}
                    >
                      <div className="card-body">
                        <p className="fw-bolder">{comment?.by?.name}</p>
                        <p className="">{comment?.comment}</p>
                      </div>
                      <div>
                        {" "}
                        <p className="fs-3 p-3">
                          {comment.sentiment === "negative" ? (
                            <RiEmotionUnhappyLine className="text-danger" />
                          ) : comment.sentiment == "neutral" ? (
                            <HiOutlineEmojiHappy  />
                          ) : comment.sentiment == "positive" ? (
                            <RiEmotionHappyLine className="text-success" />
                          ) : null}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
