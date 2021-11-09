import { Avatar, Button, Input, TextField } from "@mui/material";
import "./styleCreateInstructorCard.css";
import { styled } from "@mui/material/styles";
import {
  TextFieldConfig,
  imageConfig,
  buttonConfig3,
  CircularProgressConfig,
} from "./muiConfig";
import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
// import { CategoryContext } from '../../../contexts/categoryContext';
import axios from "../../config/axios";
import { useHistory } from "react-router";
function CreateInstructorCard() {
  const Input = styled("input")({
    display: "none",
  });
  const history = useHistory();
  const [preViewImage, setPreViewImage] = useState("");
  const [category, setCategory] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [createInstructor, setCreateInstructor] = useState({
    fullName: "",
    jobTitle: "",
    about: "",
    expertise: "",
    website: "",
    email: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    twitter: "",
    profileImage: "",
    profileImageName: "",
    categoryId: "",
  });
  // console.log('category2: ', category2);
  console.log("createInstructor: ", createInstructor);
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
  // console.log('createInstructor: ', createInstructor);
  // console.log('category: ', category);
  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await axios.get("/category");
        setCategory(response.data.category.map(item => item.categoryName));
        const map = response.data.category.map(item => ({
          id: item.id,
          value: item.categoryName,
        }));
        // const newArr = [];
        // for (let i = 0; i < map.length; i++) {
        //   newArr.push({
        //     id: i,
        //     value: map[i],
        //   });
        // }
        setCategory2(map);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCategory();
  }, []);
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    const newArr = [];
    category2.map(item => {
      if (value.includes(item.value)) {
        return newArr.push(item.id);
      }
    });
    setCreateInstructor({
      ...createInstructor,
      categoryId: newArr,
    });

    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  console.log(category);
  console.log(category2);
  const handleSubmitCreateInstructerCard = async e => {
    e.preventDefault();
    try {
      setSpinnerStatus(true);
      const data = new FormData();
      data.append("fullName", createInstructor.fullName);
      data.append("jobTitle", createInstructor.jobTitle);
      data.append("about", createInstructor.about);
      data.append("expertise", createInstructor.expertise);
      data.append("website", createInstructor.website);
      data.append("email", createInstructor.email);
      data.append("facebook", createInstructor.facebook);
      data.append("youtube", createInstructor.youtube);
      data.append("linkedin", createInstructor.linkedin);
      data.append("twitter", createInstructor.twitter);
      data.append("thisisinput", createInstructor.profileImage);
      data.append("categoryId", createInstructor.categoryId);
      const response = await axios.post("/instructor", data);
      console.log("response: ", response);
      if (response.status === 200) {
        setCreateInstructor({
          fullName: "",
          jobTitle: "",
          about: "",
          expertise: "",
          website: "",
          email: "",
          facebook: "",
          youtube: "",
          linkedin: "",
          twitter: "",
          profileImage: "",
          categoryId: "",
        });
        setSpinnerStatus(false);
        history.push("/instructor");
      } else if (response.status === 500) {
        setSpinnerStatus(false);
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePreviewImage = e => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreViewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setCreateInstructor({
      ...createInstructor,
      profileImage: e.target.files[0],
      profileImageName: e.target.files[0].name,
    });
  };

  return (
    <>
      {spinnerStatus && <CircularProgress sx={CircularProgressConfig} />}
      <form action="" onSubmit={handleSubmitCreateInstructerCard}>
        <div className="divCreateCardInstructorController">
          <div className="createImageInstructorCard">
            <Avatar
              className="MyProfileAvatar"
              alt="Remy Sharp"
              src={preViewImage}
              sx={imageConfig}
            />
            <label
              htmlFor="contained-button-file"
              className="labelUploadImageInsEdit"
            >
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={e => handleChangePreviewImage(e)}
              />
              <Button
                variant="contained"
                disabled={spinnerStatus}
                component="span"
                // onClick={handleClickPreviewImage}
                sx={{ marginBottom: "10px", marginTop: "10px" }}
              >
                Upload Instructor Image
              </Button>
            </label>
            <TextField
              size="small"
              disabled={spinnerStatus}
              sx={TextFieldConfig}
              id="outlined-multiline-static"
              label="File name"
              multiline
              rows={4}
              shrink="true"
              readOnly
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                width: "100%",
              }}
              value={createInstructor.profileImageName}
            />
          </div>

          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Instructor Name"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                fullName: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Job Title"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                jobTitle: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="About"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                about: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Expertise"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                expertise: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Website"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                website: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                email: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Facebook"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                facebook: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Youtube"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                youtube: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Linkedin"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                linkedin: e.target.value,
              });
            }}
          />
          <TextField
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
            id="outlined-basic"
            label="Twitter"
            variant="outlined"
            onChange={e => {
              setCreateInstructor({
                ...createInstructor,
                twitter: e.target.value,
              });
            }}
          />
          <FormControl
            size="small"
            disabled={spinnerStatus}
            sx={TextFieldConfig}
          >
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              sx={buttonConfig3}
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={selected => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {category.map(item => (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={personName.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={spinnerStatus}
            sx={{ width: "50%", marginBottom: "20px" }}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

export default CreateInstructorCard;
