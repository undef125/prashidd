import React from "react";
import "./Hero.css";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Card = ({ event }) => {
  const router = useRouter();
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const registerForEvent = async (eventId) => {
    const toastId = toast.loading("Updating profile...");
    try {
      const resp = await axios.get(
        `http://localhost:5000/applyforevent/${eventId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(
        resp.data.message ? resp.data.message : "Registered on the event!"
      );
      toast.dismiss(toastId);
      if (resp.data.status === "applied") {
        toast.error(
          resp.data.message ? resp.data.message : "Error registering!"
        );
        toast.dismiss(toastId);
      }
    } catch (error) {
      toast.error("Server Error!");
      toast.dismiss(toastId);
    }
  };

  return (
    <a
      className="text-decoration-none"
      style={{
        cursor: "pointer",
      }}
    >
      <div className="card cardhoverchange ">
        <img
          onClick={() => {
            router.push(`/eventdetail/${event?._id}`);
          }}
          src={event?.image}
          alt="Placeholder"
          style={{ height: "200px", width: "100%" }}
        />
        <div className="card-body">
          <div
            onClick={() => {
              router.push(`/eventdetail/${event?._id}`);
            }}
          >
            <div className="d-flex justify-content-between">
              <p className="fw-bold">
                <FaCalendarAlt /> {formatDate(event?.date)}
              </p>
              <p className="fw-bold">
                <FaClock /> {event?.time}
              </p>
            </div>
            <h3 className="card-title fw-bold">{event?.eventName}</h3>
            <p>
              <FaMapMarkerAlt /> {event?.location}
            </p>
          </div>
          <a
            className="btn text-white"
            style={{ backgroundColor: "#2f2771" }}
            onClick={() => {
              registerForEvent(event?._id);
            }}
          >
            Register Here
          </a>
        </div>
      </div>
    </a>
  );
};

export default Card;
