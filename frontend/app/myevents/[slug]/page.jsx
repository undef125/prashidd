"use client";
import React, { useEffect, useState } from "react";
import { Pacifico } from "next/font/google";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const page = () => {
  const router = useRouter();
  const param = useParams();
  const [appliedEvents, setAppliedEvent] = useState();
  const [recommendedEvents, setRecommendedEvent] = useState([]);

  console.log("Recommended", recommendedEvents);
  const verifier = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/verifyuser", {
        withCredentials: true,
      });
      console.log(resp.data.message);
      if (resp.data.message !== "verified") {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  const getAppliedEvents = async (id) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/geteventsapplied/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log("------------------------------------");
      console.log(resp.data);
      setAppliedEvent(resp.data);
    } catch (error) {
      console.log("error", error);
      console.log("------------------------------------");
    }
  };

  const getRecommendedEvents = async (id) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/getrecommendedevents/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log("------------------------------------");
      console.log("Recommended Events", resp.data.data.length);
      setRecommendedEvent(resp.data.data);
    } catch (error) {
      console.log("error", error);
      console.log("------------------------------------");
    }
  };

  useEffect(() => {
    verifier();
    getAppliedEvents(param.slug);
    getRecommendedEvents(param.slug);
  }, []);

  return (
    <>
      <div className={pacifico.className}>
        <h2
          className="text-center display-2 fs-1"
          style={{ padding: "30px", color: "#2F2771" }}
        >
          My Eventss
        </h2>
      </div>
      <div className="container">
        <h3>Resgistered Events</h3>
        <div className="row gx-5 gy-5">
          {appliedEvents?.length > 0 ? (
            appliedEvents?.map((event, index) => (
              <div className="col-12 col-lg-4" key={index}>
                <Card event={event} />
              </div>
            ))
          ) : (
            <p className="fs-3 text-center text-danger">No Registered Events</p>
          )}

          {/* <div className="col-12 col-lg-4">
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
          </div> */}
        </div>
        <h3>Recommended Events</h3>
        <div className="row gx-5 gy-5">
          <div className="row gx-5 gy-5">
            {recommendedEvents?.length > 0 ? (
              recommendedEvents?.map((event, index) => (
                <div className="col-12 col-lg-4" key={index}>
                  <Card event={event} />
                </div>
              ))
            ) : (
              <p className="fs-3 text-center text-danger">
                No Registered Events
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
