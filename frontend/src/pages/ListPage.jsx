import React, { useEffect, useState } from "react";
import DataTable from "../components/Datatable";
import "../components/Datatable.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { allUsers } from "../axios/services/userServices";

const ListPage = () => {

  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const users = await allUsers();
      setUserDetails(users.users);
    };
    fetchData();
  }, []);

  const headers = [
    { label: "Firstname", key: "firstname" },
    { label: "Lastname", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="datatable">
      <div className="datatable-top">
        <div className="datatable-top-container">
          <Link to="/register">
            <MDBBtn color="red">
              <i class="fa-regular fa-plus"></i>Add User
            </MDBBtn>
          </Link>
          <CSVLink data={userDetails} headers={headers} filename="UserData.csv">
            <MDBBtn color="red">Export to CSV</MDBBtn>
          </CSVLink>
        </div>
      </div>
      <div className="datatable-main">
        <div className="datatable-container">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
