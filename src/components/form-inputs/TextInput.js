import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { employeesDataActions } from "../../store/employeesData-slice";

function TextInput({ label, employeeId }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
    dispatch(employeesDataActions.handleNameAndDesignationChange({ employeeId, value: event.target.value, changeIn: label }));
  };

  return (
    <div>
      <label className="form-label">{label}</label> <br />
      <input
        className="form-control mb-1"
        value={name}
        onChange={event => handleChange(event)}
        type="text"
      />
    </div>
  );
}

export default TextInput;
