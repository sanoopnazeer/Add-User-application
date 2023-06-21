import React from 'react'
import {
    MDBInput,
    MDBValidationItem,
  } from "mdb-react-ui-kit";
  import './Textfield.css'

const TextField = ({label, name, value, onChange}) => {
  return (
    <MDBValidationItem
              className="col-md-6"
              invalid
              feedback={`Please enter your ${label}`}
            >
              <div className="textfield col-md-12">
                <label>{label}</label>
                <MDBInput
                  label={`Enter ${label}`}
                  type="text"
                  value={value}
                  name={name}
                  onChange={onChange}
                  required
                  invalid
                />
              </div>
            </MDBValidationItem>
  )
}

export default TextField