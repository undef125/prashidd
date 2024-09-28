"use client";
import React, { useEffect, useState } from "react";
import { Menu, Calendar, Tag, List } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [toUpdateEventId, setToUpdateEventId] = useState("");
  const [isDelConfirm, setIsDelConfirm] = useState(false);
  const [toDelId, setToDelId] = useState("");
  const [isDelConfirmUser, setIsDelConfirmUser] = useState(false);
  const [toDelIdUser, setToDelIdUser] = useState("");
  const [isDelConfirmQuery, setIsDelConfirmQuery] = useState(false);
  const [toDelIdQuery, setToDelIdQuery] = useState("");
  const [currentEvent, setCurrentEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [categories, setCategories] = useState([
    "Music",
    "Technology",
    "Sports",
    "Art",
  ]);

  // Pagination state for events
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const eventsPerPage = 5;

  // Pagination state for users
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const usersPerPage = 5;

  // Events slicing
  const indexOfLastEvent = currentEventPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Users slicing
  const indexOfLastUser = currentUserPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate the total number of pages
  const totalEventPages = Math.ceil(events.length / eventsPerPage);
  const totalUserPages = Math.ceil(users.length / usersPerPage);

  // Handle page changes
  const handleNextEventPage = () => {
    if (currentEventPage < totalEventPages) {
      setCurrentEventPage(currentEventPage + 1);
    }
  };

  const handlePreviousEventPage = () => {
    if (currentEventPage > 1) {
      setCurrentEventPage(currentEventPage - 1);
    }
  };

  const handleNextUserPage = () => {
    if (currentUserPage < totalUserPages) {
      setCurrentUserPage(currentUserPage + 1);
    }
  };

  const handlePreviousUserPage = () => {
    if (currentUserPage > 1) {
      setCurrentUserPage(currentUserPage - 1);
    }
  };

  const openUpdateModal = (event) => {
    setCurrentEvent(event);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentEvent(null);
  };

  const handleUpdate = async (e) => {
    const toastId = toast.loading("Updating event details...");
    e.preventDefault();
    try {
      const formData = new FormData();
      // Append all currentEvent fields except appliedBy and comments
      for (const key in currentEvent) {
        if (key !== "appliedBy" && key !== "comments") {
          formData.append(key, currentEvent[key]);
        }
      }

      // Handle appliedBy array if it exists and is not empty
      if (currentEvent.appliedBy && currentEvent.appliedBy.length > 0) {
        const validAppliedBy = currentEvent.appliedBy.filter((id) => id); // Filter valid IDs
        formData.append("appliedBy", JSON.stringify(validAppliedBy)); // Stringify and append
      }

      // Handle comments array if it exists and is not empty
      if (currentEvent.comments && currentEvent.comments.length > 0) {
        formData.append("comments", JSON.stringify(currentEvent.comments)); // Stringify and append
      }
      const resp = await axios.put(
        `http://localhost:5000/updateevent/${currentEvent?._id}`,
        formData
      );
      toast.success(resp.data.message);
      toast.dismiss(toastId);
      closeUpdateModal();
      getevents();
    } catch (error) {
      toast.error("Error updating details!");
      toast.dismiss(toastId);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleAddEvent = async (e) => {
    const toastId = toast.loading("Adding Event...");
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await axios.post("http://localhost:5000/addevent", formData);
      e.target.reset();
      toast.success("Event added successfully!");
      toast.dismiss(toastId);
      getevents();
    } catch (error) {
      toast.error("Error adding event!");
      toast.dismiss(toastId);
    }
  };

  const deleteEvent = async (eventId) => {
    const toastId = toast.loading("Deleting Event...");
    try {
      await axios.delete(`http://localhost:5000/deleteevent/${eventId}`);
      getevents();
      toast.success("Event deleted successfully");
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Error deleting event");
      toast.dismiss(toastId);
    }
  };
  const deleteUser = async (userId) => {
    const toastId = toast.loading("Updating profile...");

    try {
      await axios.delete(`http://localhost:5000/deleteuser/${userId}`);
      getAllUsers();
      toast.success("User deleted successfully!");
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Error deleting user^s*$");
      toast.dismiss(toastId);
    }
  };
  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");
      setEvents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getusers");
      console.log(response.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getQueries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getqueries");
      console.log(response.data);
      setQueries(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteQuery = async (queryId) => {
    const toastId = toast.loading("Deleting Query...");
    try {
      await axios.delete(`http://localhost:5000/deletequery/${queryId}`);
      getQueries();
      toast.success("Query deleted successfully");
      toast.dismiss(toastId);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting query");
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    getevents();
    getAllUsers();
    getQueries();
  }, []);

  return (
    <>
      <div className="d-flex vh-100 bg-light">
        {/* Sidebar */}
        <aside
          className={`bg-white sidebar ${
            sidebarOpen ? "d-block" : "d-none"
          }  h-100 p-3`}
        >
          <div className="d-flex justify-content-between border-bottom pb-2">
            <span className="fs-5 fw-semibold">Event Admin</span>
            <button
              onClick={toggleSidebar}
              className="btn btn-outline-secondary d-lg-none"
            >
              <Menu />
            </button>
          </div>
          <nav className="pt-3">
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="d-flex align-items-center text-secondary py-2 px-3"
                >
                  <Calendar className="me-2" />
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#users"
                  className="d-flex align-items-center text-secondary py-2 px-3"
                >
                  <Tag className="me-2" />
                  Users
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="d-flex align-items-center text-secondary py-2 px-3"
                >
                  <List className="me-2" />
                  Contact US
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="d-flex justify-content-between align-items-center p-3">
              <button
                onClick={toggleSidebar}
                className="btn btn-outline-secondary d-lg-none"
              >
                <Menu />
              </button>
              <h1 className="fs-4 fw-semibold">Event Management Dashboard</h1>
            </div>
          </header>

          {/* Main content */}
          <main className="bg-light">
            <div className="container">
              <div className="row gy-3 align-items-start">
                {/* Add Event Form */}
                <div className="col-md-12">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h2 className="fs-5 mb-3">Add New Event</h2>
                    <form onSubmit={handleAddEvent} className="row ">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="eventName" className="form-label">
                            Event Name
                          </label>
                          <input
                            id="eventName"
                            name="eventName"
                            type="text"
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">
                            Location
                          </label>
                          <input
                            id="eventlo"
                            name="location"
                            type="text"
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">
                            Image
                          </label>
                          <input
                            id="eventimg"
                            name="image"
                            type="file"
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">
                            Date
                          </label>
                          <input
                            id="eventDate"
                            name="date"
                            type="date"
                            required
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 d-flex flex-column gap-3">
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">
                            Time
                          </label>
                          <input
                            id="eventTime"
                            name="time"
                            type="time"
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="eventCategory" className="form-label">
                            Category
                          </label>
                          <select
                            id="eventCategory"
                            name="category"
                            required
                            className="form-select"
                          >
                            {categories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="eventDescription"
                            className="form-label"
                          >
                            Description
                          </label>
                          <textarea
                            id="eventDescription"
                            name="description"
                            rows="3"
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Add Event
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Event List */}
              <div className="mt-4 bg-white p-4 rounded shadow-sm">
                <h2 className="fs-5 mb-3">Existing Events</h2>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEvents.map((event) => (
                        <tr key={event._id}>
                          <td>{event.eventName}</td>
                          <td>{event?.date.split("T")[0]}</td>
                          <td>{event.category}</td>
                          <td className="d-flex gap-3">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                openUpdateModal(event);
                                setToUpdateEventId(event?._id);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                // deleteEvent(event._id);
                                setToDelId(event._id);
                                setIsDelConfirm(true);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handlePreviousEventPage}
                    disabled={currentEventPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleNextEventPage}
                    disabled={currentEventPage === totalEventPages}
                  >
                    Next
                  </button>
                </nav>
              </div>
              <div className="mt-4 bg-white p-4 rounded shadow-sm" id="contact">
                <h2 className="fs-5 mb-3">Registered Users</h2>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Batch</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers?.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.gender}</td>
                          <td>{user.batch}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setToDelIdUser(user._id);
                                setIsDelConfirmUser(true);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handlePreviousUserPage}
                    disabled={currentUserPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleNextUserPage}
                    disabled={currentUserPage === totalUserPages}
                  >
                    Next
                  </button>
                </nav>
              </div>
              <div className="mt-4 bg-white p-4 rounded shadow-sm" id="users">
                <h2 className="fs-5 mb-3">Queries</h2>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queries?.map((query) => (
                        <tr key={query._id}>
                          <td>{query.name}</td>
                          <td>{query.email}</td>
                          <td>{query.message}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                deleteQuery(query._id);
                                setToDelIdQuery(query._id);
                                setIsDelConfirmQuery(true);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {isUpdateModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeUpdateModal}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">
                      Event Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventName"
                      value={currentEvent?.eventName || ""}
                      onChange={(e) =>
                        setCurrentEvent({
                          ...currentEvent,
                          eventName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventLocation"
                      value={currentEvent?.location || ""}
                      onChange={(e) =>
                        setCurrentEvent({
                          ...currentEvent,
                          location: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="eventImage"
                      onChange={(e) =>
                        setCurrentEvent({
                          ...currentEvent,
                          image: e.target.files[0],
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">
                      Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="eventTime"
                      value={currentEvent?.time || ""}
                      onChange={(e) =>
                        setCurrentEvent({
                          ...currentEvent,
                          time: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="eventDate"
                      // value={currentEvent?.date || ""}
                      onChange={(e) =>
                        setCurrentEvent({
                          ...currentEvent,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventCategory" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-select"
                      id="eventCategory"
                      value={currentEvent?.category || ""}
                      onChange={(e) =>
                        setCurrentEvent({
                          ...currentEvent,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a category</option>
                      <option value="Music">Music</option>
                      <option value="Technology">Technology</option>
                      <option value="Sports">Sports</option>
                      <option value="Art">Art</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="eventDescription"
                      name="description"
                      rows="3"
                      className="form-control"
                      value={currentEvent?.description || ""}
                      onChange={(e) =>
                        setCurrentEvent({
                          ...currentEvent,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={closeUpdateModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => {
                        setIsUpdateModalOpen(false);
                        handleUpdate(e);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDelConfirm && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Deletion Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeUpdateModal}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <p>You surely want to delete ?</p>
                  <div className="d-flex justify-content-end gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsDelConfirm(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteEvent(toDelId);
                        setIsDelConfirm(false);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDelConfirmUser && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Deletion Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeUpdateModal}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <p>You surely want to delete ?</p>
                  <div className="d-flex justify-content-end gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsDelConfirmUser(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteUser(toDelIdUser);
                        setIsDelConfirmUser(false);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDelConfirmQuery && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Deletion Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeUpdateModal}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <p>You surely want to delete ?</p>
                  <div className="d-flex justify-content-end gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsDelConfirmQuery(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteQuery(toDelIdQuery);
                        setIsDelConfirmQuery(false);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {(isUpdateModalOpen ||
        isDelConfirm ||
        isDelConfirmUser ||
        isDelConfirmQuery) && <div className="modal-backdrop show"></div>}
    </>
  );
}
