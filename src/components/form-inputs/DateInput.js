import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { employeesDataActions } from "../../store/employeesData-slice";

function DateInput({ label, employeeId }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");

  const handleChange = event => {
    setDate(event.target.value);
    dispatch(
      employeesDataActions.handleDateChange({
        employeeId,
        DateOfBirth: event.target.value,
      })
    );
  };

  return (
    <div>
      <label className="form-label mt-3">{label}</label> <br />
      <input className="form-control"
        value={date}
        onChange={event => handleChange(event)}
        type="date"
      />{" "}
      <br />
    </div>
  );
}

export default DateInput;
