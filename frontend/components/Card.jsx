import React from "react";
import "./Hero.css";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt  } from "react-icons/fa";
import { useRouter } from "next/navigation";
const Card = ({event}) => {
  const router = useRouter();
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <a className="text-decoration-none" onClick={()=>{router.push(`/eventdetail/${event?._id}`)}}>
    <div className="card cardhoverchange ">
      <img
        src={event?.image}
        alt="Placeholder"
        style={{ height: "200px", width: "100%" }}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="fw-bold"><FaCalendarAlt /> {formatDate(event?.date)}</p>
          <p className="fw-bold"><FaClock /> {event?.time}</p>
        </div>
        <h3 className="card-title fw-bold">{event?.eventName}</h3>
        <p ><FaMapMarkerAlt/>  {event?.location}</p>
        <a className="btn text-white" style={{backgroundColor:"#2f2771"}} onClick={()=>{router.push(`/eventdetail/${event._id}`)}}>Register Here</a>
      </div>
    </div>
    </a>
  );
};

export default Card;
