import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBFile,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBRadio,
  //   MDBSpinner,
  MDBValidationItem,
  MDBDropdown,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../components/TextField";
import "../components/RadioButton.css";
import { fetchUser, updateUser } from "../axios/services/userServices";
import { toast } from "react-toastify";

const EditPage = () => {
  const [formValue, setFormValue] = useState("");
  //   const [gender, setGender] = useState("");
  const { firstname, lastname, email, mobile, gender, status, location } =
    formValue;
  const { userId } = useParams();
  const navigate = useNavigate();
  const fetchData = async (userId) => {
    const response = await fetchUser(userId);
    setFormValue(response.user);
  };

  useEffect(() => {
    fetchData(userId);
  }, []);

  //   const onGenderChange = (value) => {
  //     setGender(value);
  //   };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstname &&
      lastname &&
      email &&
      mobile &&
      gender &&
      status &&
      location
    ) {
      const data = await updateUser({ ...formValue, gender: gender }, userId);
      console.log(data);
      if (data.status) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
        navigate("/");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="edit-page"
      style={{
        margin: "auto",
        // padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
        marginTop: "50px",
      }}
    >
      <h4> EDIT DETAILS </h4>
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-5x p-4" />
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <TextField
              label="Firstname"
              name="firstname"
              value={firstname}
              onChange={onInputChange}
            />
            <TextField
              label="Lastname"
              name="lastname"
              value={lastname}
              onChange={onInputChange}
            />
            <TextField
              label="Email address"
              name="email"
              value={email}
              onChange={onInputChange}
            />
            <TextField
              label="Mobile"
              name="mobile"
              value={mobile}
              onChange={onInputChange}
            />
            <MDBValidationItem className="col-md-6" invalid>
              <div className="radiobutton col-md-12">
                <label>Select your Gender</label>
                <MDBRadio
                  name="gender"
                  label="Male"
                  value="male"
                  checked={gender === "male"}
                  //   onChange={() => onGenderChange("male")}
                />
                <MDBRadio
                  name="gender"
                  label="Female"
                  value="female"
                  checked={gender === "female"}
                  //   onChange={() => onGenderChange("female")}
                />
              </div>
            </MDBValidationItem>
            <MDBValidationItem className="col-md-6" invalid>
              <div className="radiobutton col-md-12">
                <label>Select your Status</label>
                <MDBDropdown>
                  <select
                    class="form-select"
                    name="status"
                    value={status}
                    area-label="Default select example"
                    onChange={onInputChange}
                  >
                    <option key="" disabled selected>
                      Select..
                    </option>

                    <option key="Active" value="active">
                      Active
                    </option>
                    <option key="Inactive" value="inactive">
                      Inactive
                    </option>
                  </select>
                </MDBDropdown>
              </div>
            </MDBValidationItem>
            <MDBValidationItem className="col-md-6" invalid>
              <div className="radiobutton col-md-12">
                <label>Select your Profile</label>
                <MDBFile
                  //   label="Select File(s)"
                  //   multiple
                  btnColor="primary"
                  btnTitle="Choose File"
                  // getValue={handleFileSelect}
                />
              </div>
            </MDBValidationItem>
            <TextField
              label="Your Location"
              name="location"
              value={location}
              onChange={onInputChange}
            />
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                SUBMIT
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default EditPage;
