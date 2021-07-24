import React from "react";
import { useSelector } from "react-redux";

function ViewData() {
  const employeesData = useSelector(state => state.employeesData);

  return (
    <div>
      {employeesData.map((employee, index) => {
        return (
          <div key={employee.employeeId}>
            <h4>Employee #{index + 1}</h4>
            <p>Name : {employee.Name}</p>
            <p>Designation : {employee.Designation}</p>
            <>
              <p>Contact : </p>
              {employee.Contact.map((number, index) => {
                return (
                  <li key={index}>
                    {number.type} - {number.number}
                  </li>
                );
              })}
            </>
            <>
              <p className="mt-3">Skills : </p>
              {employee.Skills.map((skill, index) => {
                return <li key={index}>{skill}</li>;
              })}
            </>
            <p className="mt-3">DOB : {employee.DateOfBirth}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ViewData;
