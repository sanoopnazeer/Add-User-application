import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import {
  allUsers,
  deleteUser,
  updateStatus,
} from "../axios/services/userServices";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { SlOptionsVertical } from "react-icons/sl";
import { BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function DataTable({updateSharedData}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await allUsers();
      setUsers(res.users);
    };
    fetchData();
  }, [users]);

  const handleDelete = async (userId) => {
    console.log(userId);
    const response = await deleteUser(userId);
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const onInputChange = async (event, index, userId) => {
    const { value } = event.target;
    const response = await updateStatus(value, userId);
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], status: value };
      return updatedUsers;
    });
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        width: 150,
      },
      {
        label: "FullName",
        field: "fullname",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Email",
        field: "email",
        width: 270,
      },
      {
        label: "Gender",
        field: "gender",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Profile",
        field: "profile",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 100,
      },
    ],
    rows: [],
  };

  // updateSharedData(data)


  const [datatable, setDatatable] = React.useState(data);

  React.useEffect(() => {
    setDatatable((prevState) => ({
      ...prevState,
      rows: users.map((user, index) => ({
        id: index + 1,
        fullname: user.firstname + " " + user.lastname,
        email: user.email,
        gender: user.gender,
        status: (
          <MDBValidationItem>
            <MDBDropdown>
              <select
                className="form-select"
                name="status"
                aria-label="Default select example"
                value={user.status}
                onChange={(e) => onInputChange(e, index, user._id)}
              >
                <option key="Active" value="active">
                  Active
                </option>
                <option key="Inactive" value="inactive">
                  Inactive
                </option>
              </select>
            </MDBDropdown>
          </MDBValidationItem>
        ),
        profile: (
          <img width="50px" height="50px" src={`http://localhost:5000/image/${user._id}`} alt="userprofileimage"/>
        ),
        action: (
          <MDBDropdown>
            <MDBDropdownToggle>
              <SlOptionsVertical />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <Link to={`/view/${user._id}`}>
                <MDBDropdownItem link>
                  <BsFillEyeFill />
                  View
                </MDBDropdownItem>
              </Link>
              <Link to={`/edit/${user._id}`}>
                <MDBDropdownItem link>
                  <FaEdit />
                  Edit
                </MDBDropdownItem>
              </Link>
              <MDBDropdownItem link onClick={() => handleDelete(user._id)}>
                <MdDelete />
                Delete
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        ),
      })),
    }));
  }, [users]);

  return (
    <MDBDataTableV5
      className="shadow-box"
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      searchTop
      searchBottom={false}
      responsive
      theadColor="black"
      theadTextWhite
      //   bordered
    />
  );
}
