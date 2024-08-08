"use client";
import React from "react";
import { Pacifico } from "next/font/google";
import Card from "@/components/Card";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const page = () => {
  return (
    <>
      <div className={pacifico.className}>
        <h2
          className="text-center display-2 fs-1"
          style={{ padding: "30px", color: "#2F2771"}}
        >
          My Events
        </h2>
      </div>
      <div className="container">
        <div className="row gx-5 gy-5">
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
    </>
  );
};

export default page;
