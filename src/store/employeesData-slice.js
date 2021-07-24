// import slice function from toolkit
import { createSlice } from "@reduxjs/toolkit";
// other packages import
import { v4 as uuidv4 } from "uuid";

// initial state
const initialEmployeesDataState = {
  employeesData: [
    {
      employeeId: uuidv4(),
      Name: "",
      Designation: "",
      Contact: [],
      Skills: [],
      DateOfBirth: "",
    },
  ],
  transformedData: [],
  formHasError: false,
};

// state slice for forms
const employeesDataSlice = createSlice({
  name: "employeesData",
  initialState: initialEmployeesDataState,
  reducers: {
    // add a new employee form
    addEmployee(state, action) {
      state.employeesData.push({
        employeeId: uuidv4(),
        Name: "",
        Designation: "",
        Contact: [],
        Skills: [],
        DateOfBirth: "",
      });
    },
    // delete an employee
    deleteEmployee(state, action) {
      state.employeesData = state.employeesData.filter(
        employee => employee.employeeId !== action.payload.id
      );
    },
    // handle change in name and designation
    handleNameAndDesignationChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          if (action.payload.changeIn === "Name") {
            employee.Name = action.payload.value;
          } else {
            employee.Designation = action.payload.value;
          }
        }
        return employee;
      });
    },
    // handle change in name and designation
    handleDateChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          employee.DateOfBirth = action.payload.DateOfBirth;
        }
        return employee;
      });
    },
    // handle change in number
    handleNumberChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          employee.Contact = [...action.payload.Contact];
        }
        return employee;
      });
    },
    // handle change in skills
    handleSkillsChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          employee.Skills = [...action.payload.Skills];
        }
        return employee;
      });
    },
  },
});

// exporting form actions to use the reducer functions
export const employeesDataActions = employeesDataSlice.actions;

// exporting form slice to the store
export default employeesDataSlice;
