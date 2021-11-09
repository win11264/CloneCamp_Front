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

export default function CategorySelect({ setCategoryId, catMap }) {
  const [cat, setCat] = React.useState([]);
  useEffect(() => {
    axios
      .get("/category")
      .then(res => {
        console.log("Context Waste", res.data.category);
        setCat(res.data.category);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  // console.log(`names`, cat);

  function getStyles(name, categoryName, theme) {
    return {
      fontWeight:
        categoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const dropCat = [];
  if (catMap) {
    const catMapId = catMap.map(item => item.categoryId);

    console.log(`catMapinDrop --->`, catMapId);
    const dropCatFilter = cat.filter(item => !catMapId.includes(item.id));
    dropCatFilter.forEach(item => {
      dropCat.push(item);
    });
    console.log(`catMapId`, catMapId);
    console.log(`catinDrop --->`, dropCatFilter);
  }
  // var arr1 = [1, 2, 3, 4],
  //   arr2 = [2, 4],
  //   resExample = arr1.filter(item => !arr2.includes(item));
  // console.log(resExample);

  // if (catMap) {
  //   const dropCatFilter = cat.filter(
  //     item => !catMap.categoryId.includes(item.id)
  //   );
  //   console.log(`dropCatFilter`, dropCatFilter);
  // }

  const theme = useTheme();
  const [categoryName, setCategoryName] = React.useState([]);
  // const [names, setNames] = React.useState([]);

  // # !!!!! Underconstruction !!!!!
  // React.useEffect(() => {
  //   const getCategory = async () => {
  //     const category4map = await axios.get("http://localhost:8090/category");
  //     console.log("@#@category4map:", category4map);
  //     setNames(() => {});
  //   };
  //   getCategory();
  // }, []);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setCategoryId(event.target.value);
    // console.log(`event.target.value`, event.target.value);
    // console.log("@@@CategoryArr:", value);
  };

  // names.map(item => (
  //     <MenuItem
  //       key={item.id}
  //       value={item.id}
  //       style={getStyles(item, categoryName, theme)}
  //     >
  //       {item.categoryName}
  //     </MenuItem>
  //   ));

  return (
    <>
      {catMap ? (
        <div>
          <FormControl sx={{ m: 0, width: "100%" }}>
            <InputLabel id="demo-multiple-name-label">Category *</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={categoryName}
              onChange={handleChange}
              input={<OutlinedInput label="Category *" />}
              MenuProps={MenuProps}
              required
            >
              {dropCat.map(item => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  style={getStyles(item, categoryName, theme)}
                >
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : (
        <div>
          <FormControl sx={{ m: 0, width: "100%" }}>
            <InputLabel id="demo-multiple-name-label">Category *</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={categoryName}
              onChange={handleChange}
              input={<OutlinedInput label="Category *" />}
              MenuProps={MenuProps}
              required
            >
              {cat.map(item => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  style={getStyles(item, categoryName, theme)}
                >
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </>
  );
}
