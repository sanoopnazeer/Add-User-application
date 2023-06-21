import React, { useState } from "react";
import DataTable from "../components/Datatable";
import "../components/Datatable.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import CsvDownloadButton from "../components/CsvDownload";

const ListPage = () => {
  const [sharedData, setSharedData] = useState('');

  // Function to update the shared data
  const updateSharedData = (data) => {
    setSharedData(data);
  };

  return (
    <div className="datatable">
      <div className="datatable-top">
        <div className="datatable-top-container">
          <Link to="/register">
            <MDBBtn color="red">
              <i class="fa-regular fa-plus"></i>Add User
            </MDBBtn>
          </Link>
          {/* <CsvDownloadButton updateSharedData={updateSharedData} sharedData={sharedData} /> */}
        </div>
      </div>
      <div className="datatable-main">
        <div className="datatable-container">
          <DataTable updateSharedData={updateSharedData}/>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
