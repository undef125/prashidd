import React from "react";
import { DataTable } from "simple-datatables";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";
import "../src/app/admindashboard/admindashboard.css";
import "simple-datatables/dist/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const Dashboard = () => {
  const [eventdata, setEventData] = useState([]);
  console.log(eventdata);

  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");
      setEventData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getevents();
  }, []);

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteevent/${id}`);
      setEventData((prevData) => prevData.filter((ent) => ent._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      const dataTable = new DataTable(tableRef.current);
      // You can perform additional configurations or actions on dataTable here
    }
  }, []);
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">Primary Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">Warning Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">Success Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body">Danger Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-chart-area me-1"></i>
                  Area Chart Example
                </div>
                <div className="card-body">
                  <canvas id="myAreaChart" width="100%" height="40"></canvas>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-chart-bar me-1"></i>
                  Bar Chart Example
                </div>
                <div className="card-body">
                  <canvas id="myBarChart" width="100%" height="40"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              DataTable Example
            </div>
            <div className="card-body">
              <table id="datatablesSimple" ref={tableRef}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {eventdata?.map((event) => (
                    <tr key={eventdata._id}>
                      <td className="text-black">{event?.eventName}</td>
                      <td className="text-black">{event?.location}</td>
                      <td className="text-black">{event?.date}</td>
                      <td className="text-black">{event?.time}</td>
                      <td className="text-black">{event?.category}</td>
                      <th>
                        {/* <button>
                          <BiSolidEdit className="fs-3 text-success" />
                        </button> */}
                        {/* <!-- Button trigger modal --> */}
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          <BiSolidEdit className="fs-3 text-success" />
                        </button>

                        {/* <!-- Modal --> */}
                        <div
                          class="modal fade"
                          id="exampleModalCenter"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  class="modal-title"
                                  id="exampleModalLongTitle"
                                >
                                  Modal title
                                </h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">...</div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="button" class="btn btn-primary">
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button>
                          <MdOutlineDelete
                            className="fs-3 text-danger"
                            onClick={() => deleteEvent(event._id)}
                          />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Your Website 2023</div>
            <div>
              <a href="#">Privacy Policy</a>
              &middot;
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
