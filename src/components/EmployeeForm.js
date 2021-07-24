import React from "react";
import DateInput from "./form-inputs/DateInput";
import NumberInput from "./form-inputs/NumberInput";
import SkillsInput from "./form-inputs/SkillsInput";
import TextInput from "./form-inputs/TextInput";

function EmployeeForm({employeeId}) {
  return (
    <div>
      <TextInput employeeId={employeeId} label={"Name"}></TextInput>
      <TextInput employeeId={employeeId} label={"Designation"}></TextInput>
      <NumberInput employeeId={employeeId}></NumberInput>
      <SkillsInput employeeId={employeeId}></SkillsInput>
      <DateInput label='Date Of Birth' employeeId={employeeId}></DateInput>
    </div>
  );
}

export default EmployeeForm;
