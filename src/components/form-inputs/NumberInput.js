import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { employeesDataActions } from "../../store/employeesData-slice";

function NumberInput({ employeeId }) {
  const dispatch = useDispatch();

  const [list, setList] = useState([
    {
      id: uuidv4(),
      type: "Primary",
      value: "",
    },
  ]);
  const [selection, setSelection] = useState("");

  // handle adding of a contact field
  const handleAddField = () => {
    if (selection === "") {
      swal(
        "No Number Type Selected",
        "Select a type of contact number from dropdown before adding",
        "error"
      );
      return;
    }
    if (list.length < 4) {
      const newList = [
        ...list,
        {
          id: uuidv4(),
          type: selection,
          value: "",
        },
      ];
      setList(newList);

      let listOfNumbers = [];
      newList.forEach(number => {
        const numberType = number.type;
        const value = number.value;
        const obj = {};
        obj["type"] = numberType;
        obj["number"] = value;
        listOfNumbers.push(obj);
      });
      dispatch(
        employeesDataActions.handleNumberChange({
          employeeId,
          Contact: listOfNumbers,
        })
      );
    } else {
      swal("Limit Reached", "More than 4 field can not be added", "error");
    }
    setSelection("");
  };

  // handle delete field
  const handleDelteField = id => {
    const newList = list.filter(field => field.id !== id);
    setList(newList);

    let listOfNumbers = [];
    newList.forEach(number => {
      const numberType = number.type;
      const value = number.value;
      const obj = {};
      obj["type"] = numberType;
      obj["number"] = value;
      listOfNumbers.push(obj);
    });
    dispatch(
      employeesDataActions.handleNumberChange({
        employeeId,
        Contact: listOfNumbers,
      })
    );
  };

  // handle change in the numbers
  const handleChange = (event, id) => {
    const newList = list.map(number => {
      if (number.id === id) {
        number.value = event.target.value;
      }
      return number;
    });
    setList(newList);

    let listOfNumbers = [];
    newList.forEach(number => {
      const numberType = number.type;
      const value = number.value;
      const obj = {};
      obj['type'] = numberType;
      obj['number'] = value;
      listOfNumbers.push(obj);
    });
    dispatch(
      employeesDataActions.handleNumberChange({
        employeeId,
        Contact: listOfNumbers,
      })
    );
  };

  return (
    <div>
      <label className="form-label mt-3">Contact Details</label>
      <select
        className="form-select mt-3"
        value={selection}
        onChange={event => setSelection(event.target.value)}
      >
        <option value="">Type</option>
        <option value="Secondary">Secondary</option>
        <option value="Resdidence">Residence</option>
        <option value="Emergency">Emergency</option>
      </select>
      <button className="btn btn-primary mt-2" onClick={handleAddField}>
        Add Contact Type
      </button>{" "}
      <br />
      {list.map(field => {
        return (
          <div key={field.id}>
            <label className="form-label mt-3">{field.type}</label> <br />
            <input
              className="form-control"
              onChange={event => handleChange(event, field.id)}
              type="number"
            />{" "}
            <br />
            <button
              className="btn btn-danger"
              disabled={field.type === "Primary"}
              onClick={() => handleDelteField(field.id)}
            >
              Delete Field
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default NumberInput;
