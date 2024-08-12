"use client";
import React from "react";
import axios from "axios";

const Events = () => {
  const addEvent = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("eventName", event.target.eventName.value);
    formData.append("location", event.target.location.value);
    formData.append("image", event.target.image.files[0]);
    formData.append("date", event.target.date.value);
    formData.append("time", event.target.time.value);
    formData.append("category", event.target.category.value);
    formData.append("description", event.target.description.value);
    try {
      await axios.post("http://localhost:5000/addevent", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center my-5">
          <form
            action=""
            style={{ width: "600px" }}
            enctype="multipart/form-data"
            method="POST"
            onSubmit={addEvent}
          >
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Event name</label>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                name="eventName"
              />
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Location</label>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                name="location"
              />
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Image</label>
              <input
                type="file"
                aria-label="First name"
                class="form-control"
                name="image"
              />
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Date</label>
              <input
                type="date"
                aria-label="First name"
                class="form-control"
                name="date"
              />
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Time</label>
              <input
                type="time"
                aria-label="First name"
                class="form-control"
                name="time"
              />
            </div>
            <div class="mb-3 d-flex gap-4">
              <label class="input-group-text">Category</label>
              <select name="category" id="">
                <option value="apple">apple</option>
                <option value="ball">ball</option>
                <option value="cat">cat</option>
              </select>
            </div>
            <div class="mb-3 ">
              <label class="input-group-text">Description</label>
              <textarea
                type="text"
                aria-label="First name"
                class="form-control"
                rows="5"
                name="description"
              />
            </div>
            <div className="d-flex justify-content-around mx-5">
              <input type="submit" value="Submit" class="btn btn-primary" />
              <input
                type="reset"
                value="Reset"
                class="btn btn-secondary ml-2"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Events;
