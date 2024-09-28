import React from "react";
import { DataTable } from "simple-datatables";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";
import "../src/app/admindashboard/admindashboard.css";
import "simple-datatables/dist/style.css";

const Dashboard = () => {
  const [userdata, setUserData] = useState([]);
  const getusers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getusers");
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getusers();
  }, []);

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
          <h1 className="mt-4">User list</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Manage Users</li>
          </ol>

          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              Registered Users Into The System
            </div>
            <div className="card-body">
              <table id="datatablesSimple" ref={tableRef}>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Batch</th>
                    <th>Interested In</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata?.map((user) => (
                    <tr key={user._id}>
                      <td className="text-black">{user?.name}</td>
                      <td className="text-black">{user?.email}</td>
                      <td className="text-black">{user?.batch}</td>
                      <td className="text-black">{user?.interestedIn}</td>
                      <td className="text-black">{user?.gender}</td>
                      <th>
                        <BiSolidEdit className="fs-3 text-success" />
                        <MdOutlineDelete className="fs-3 text-danger" />
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
