import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { employeesDataActions } from "../../store/employeesData-slice";

function SkillsInput({employeeId}) {
  const dispatch = useDispatch();
  const [list, setList] = useState([{ id: uuidv4(), value: "" }]);

  const handleAddSkill = () => {
    const newList = [...list, { id: uuidv4(), value: "" }];
    setList(newList);
    
    let skillsList = [];
    newList.forEach(skill => {
      skillsList.push(skill.value);
    });
    dispatch(
      employeesDataActions.handleSkillsChange({
        employeeId,
        Skills: skillsList,
      })
    );
  };

  const deleteSkill = id => {
    const newList = list.filter(skill => skill.id !== id);
    setList(newList);
    
    let skillsList = [];
    newList.forEach(skill => {
      skillsList.push(skill.value);
    });
    dispatch(
      employeesDataActions.handleSkillsChange({
        employeeId,
        Skills: skillsList,
      })
    );
  };

  // handle change in the skills
  const handleChange = (event, id) => {
    const newList = list.map(skill => {
      if (skill.id === id) {
        skill.value = event.target.value;
      }
      return skill;
    });
    setList(newList);

    let skillsList = [];
    newList.forEach(skill => {
      skillsList.push(skill.value)
    });
    dispatch(
      employeesDataActions.handleSkillsChange({
        employeeId,
        Skills: skillsList,
      })
    );
  };

  return (
    <div>
      <label className="form-label mt-2">Skills</label>
      {list.map(skill => {
        return (
          <div key={skill.id}>
            <input
              className="form-control"
              onChange={event => handleChange(event, skill.id)}
              type="text"
            />{" "}
            <br />
            <button
              className="btn btn-danger"
              onClick={() => deleteSkill(skill.id)}
              disabled={list.length === 1}
            >
              Delete Skill
            </button>
          </div>
        );
      })}
      <button className="btn btn-primary mt-2" onClick={handleAddSkill}>
        Add Skill
      </button>
    </div>
  );
}

export default SkillsInput;
