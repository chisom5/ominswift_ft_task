import React from "react";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Button } from "antd";

const FormComponent = ({ ...props }) => {
  const {
    values,
    // touched,
    // errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    ageList,
    levelsList,
    genderList,
    stateList,
    isFiltering
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <FormControl variant="outlined" className="form-input">
          <InputLabel id="age-select-helper-label">Age</InputLabel>
          <Select
            labelId="age-select-helper-label"
            id="age"
            name="age"
            value={values.age}
            label="Age"
            onChange={(el) => handleChange(el, setFieldValue)}
          >
            {ageList?.map((item) => (
              <MenuItem value={item.age} key={item.id}>
                {item.age}
              </MenuItem>
            ))}
          </Select>

         
        </FormControl>

        <FormControl variant="outlined" className="form-input">
          <InputLabel id="state-select-helper-label">State</InputLabel>
          <Select
            labelId="state-select-helper-label"
            id="state"
            name="state"
            value={values.state}
            label="State"
            inputProps={{ "data-testid": "secret_question" }}
            onChange={(el) => handleChange(el, setFieldValue)}
          >
            {stateList?.map((item) => (
              <MenuItem value={item.name} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

         
        </FormControl>

        <FormControl variant="outlined" className="form-input">
          <InputLabel id="level-select-helper-label">Level</InputLabel>
          <Select
            labelId="level-select-helper-label"
            id="level"
            name="level"
            value={values.level}
            label="Level"
            onChange={(el) => handleChange(el, setFieldValue)}
          >
            {levelsList?.map((item) => (
              <MenuItem value={item.level} key={item.id}>
                {item.level}
              </MenuItem>
            ))}
          </Select>

          
        </FormControl>
      </div>

      <div className="form-row">
        <FormControl variant="outlined" className="form-input-gender">
          <InputLabel id="gender-select-helper-label">Gender</InputLabel>
          <Select
            labelId="gender-select-helper-label"
            id="gender"
            name="gender"
            value={values.gender}
            label="Gender"
            onChange={(el) => handleChange(el, setFieldValue)}
          >
            {genderList?.map((item) => (
              <MenuItem value={item.gender} key={item.id}>
                {item.gender}
              </MenuItem>
            ))}
          </Select>

         
        </FormControl>

        <Button htmlType="submit" className="btn-color btn-search" loading={isFiltering}>
          Search
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
