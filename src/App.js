/* eslint-disable no-loop-func */
import { useState } from "react";
import fileDownload from "js-file-download";
import EmployeeForm from "./components/EmployeeForm";
import { useSelector, useDispatch } from "react-redux";
import { employeesDataActions } from "../src/store/employeesData-slice";
import ViewData from "./components/ViewData";
import swal from "sweetalert";
import Navbar from "./components/Navbar";

function App() {
  const [isViewing, setIsViewing] = useState(false);

  const dispatch = useDispatch();
  const employeesData = useSelector(state => state.employeesData);

  // add a new employee form
  const addEmployee = () => {
    dispatch(employeesDataActions.addEmployee());
  };

  // delete an employee form
  const deleteEmployee = id => {
    dispatch(employeesDataActions.deleteEmployee({ id }));
  };

  // function to validate form
  const validateForm = () => {
    let error = true;
    for (const employee of employeesData) {
      if (
        employee.Name !== "" &&
        employee.Name.trim().length !== 0 &&
        employee.Designation !== "" &&
        employee.Designation.trim().length !== 0 &&
        employee.DateOfBirth !== ""
      ) {
        error = false;
      } else {
        error = true;
        return error;
      }

      if (employee.Contact.length !== 0) {
        error = false;
      } else {
        error = true;
        return error;
      }

      employee.Contact.forEach(field => {
        if (field.number.trim().length !== 0 && field.number !== "") {
          error = false;
        } else {
          error = true;
          return error;
        }
      });

      employee.Skills.forEach(skill => {
        if (skill.trim().length !== 0 && skill !== "") {
          error = false;
        } else {
          error = true;
          return error;
        }
      });
    }
    return error;
  };

  // handle click on view button
  const handleView = () => {
    const error = validateForm();
    if (error) {
      swal(
        "Empty input fields!",
        "One or more fields are empty or invalid! Please fill in all the inputs to view the employees data",
        "error"
      );
    } else {
      setIsViewing(!isViewing);
    }
  };

  // handle download
  const handleDownload = () => {
    const error = validateForm();

    if (error) {
      swal(
        "Empty input fields!",
        "One or more fields are empty or invalid! Please fill in all the inputs to download the data",
        "error"
      );
    } else {
      fileDownload(JSON.stringify(employeesData), "EmployeesData.txt");
    }
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="row gx-5 mt-3">
        <div className="col-6">
          <div className="p-4">
            <h4>Fill the Details here</h4>
            {employeesData.map(employee => {
              return (
                <div className="card p-3 mt-3" key={employee.employeeId}>
                  <EmployeeForm
                    employeeId={employee.employeeId}
                    key={employee.employeeId}
                  ></EmployeeForm>{" "}
                  <br />
                  <button
                    className="btn btn-danger"
                    disabled={employeesData.length === 1}
                    onClick={() => deleteEmployee(employee.employeeId)}
                  >
                    Delete Employee
                  </button>
                </div>
              );
            })}
            <button
              className="btn btn-primary  mt-3 me-3"
              onClick={addEmployee}
            >
              Add Employee
            </button>

            <button
              className="btn btn-primary mt-3"
              type="button"
              onClick={() => handleView()}
            >
              {isViewing ? "Hide Data" : "View Data"}
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="p-4">
            <h4>View the Data here</h4>

            {isViewing && (
              <>
                <ViewData></ViewData>
                <button className="btn btn-primary" type="button" onClick={handleDownload}>
                  Download
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
