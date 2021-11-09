import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "../../config/axios";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function InstructorDropdown({
  instructorList,
  setInstructor,
  instructor,
}) {
  console.log(`instructor`, instructor);
  // function getStyles(name, fullName, theme) {
  //   return {
  //     fontWeight:
  //       fullName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }

  const theme = useTheme();

  const handleChange = event => {
    setInstructor(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">Instructor</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={instructor}
          onChange={handleChange}
          input={<OutlinedInput label="Category *" />}
          MenuProps={MenuProps}
          required
        >
          {instructorList.map(item => (
            <MenuItem
              key={item.id}
              value={item.id}
              // style={getStyles(item, instructor.fullName, theme)}
            >
              {item.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
