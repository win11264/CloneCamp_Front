import "./styleInstructorEdit.css";
import Button from "@mui/material/Button";
import InstructorCard from "../InstructorCard/InstructorCard";
import { Avatar, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import {
  imageConfig,
  buttonConfig2,
  buttonConfig3,
  textFieldConfig2,
} from "./muiConfig";
import { useContext, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import AreaOfExpertiseTag from "./AreaOfExpertiseTag/AreaOfExpertiseTag";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "../../config/axios";
import Collapse from "@mui/material/Collapse";
import DummyHeaderInst from "./DummyHeader/DummyHeaderInst";
import { CategoryContext } from "../../contexts/categoryContext";
import CourseCard from "../CourseCard/CourseCard";
import { ToggleContext } from "../../contexts/toggleContext";
import CloseIcon from "@mui/icons-material/Close";
function InstructorEdit() {
  const [i, setI] = useState(3);
  const handleClickSeeMore = () => {
    setI(i + 3);
  };
  const location = useLocation();
  // console.log('location', location.state.instructor.id);
  const [instructor, setInstructor] = useState({});
  const [courses, setCourses] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  // const [deleteStatus, setDeleteStatus] = useState(false);
  const [instructorEdit, setInstructorEdit] = useState({
    fullName: "",
    jobTitle: "",
    about: "",
    expertise: [],
    category: [],
    website: "",
    email: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    twitter: "",
    profileImage: "",
    profileImageName: "",
  });
  // console.log('instructorEdit: ', instructorEdit);
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchDataInstructorCardById = async () => {
      const response = await axios.get(`/instructor/${params.id}`);
      const response2 = await axios.get(
        `/topic/ins/${
          location.state.instructor.id
            ? location.state.instructor.id
            : params.id
        }`
      );
      // console.log(
      //   'response.data.instructorResult: ',
      //   response.data.instructorResult
      // );
      setInstructor(response.data.instructorResult);
      // console.log('response2', response2.data.result);
      setCourses(response2.data.result);
    };
    fetchDataInstructorCardById();
  }, [toggle]);
  const handleSubmitUpdateInstructor = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", instructorEdit.fullName);
    data.append("jobTitle", instructorEdit.jobTitle);
    data.append("about", instructorEdit.about);
    data.append("expertise", instructorEdit.expertise);
    // data.append('category', instructorEdit.category);
    data.append("website", instructorEdit.website);
    data.append("email", instructorEdit.email);
    data.append("facebook", instructorEdit.facebook);
    data.append("youtube", instructorEdit.youtube);
    data.append("linkedin", instructorEdit.linkedin);
    data.append("twitter", instructorEdit.twitter);
    data.append("thisisinput", instructorEdit.profileImage);

    try {
      const response = await axios.put(
        `/instructor/${
          location.state.instructor.id
            ? location.state.instructor.id
            : params.id
        }`,
        data
      );
      setToggle(current => !current);
      history.push(`/our-team-admin`);
      // console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('deleteStatus1: ', deleteStatus);
  const handleDeleteInstructor = async e => {
    e.preventDefault();
    // console.log('deleteStatus2: ', deleteStatus);
    try {
      // setDeleteStatus(true);
      // console.log('deleteStatus3: ', deleteStatus);
      setOpen(false);
      const response = await axios.delete(
        `/instructor/${
          location.state.instructor.id
            ? location.state.instructor.id
            : params.id
        }`
      );
      setToggle(current => !current);
      history.push(`/our-team-admin`);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="divMainInstructorEditController">
      <form action="" onSubmit={handleSubmitUpdateInstructor}>
        <div className="divH2InstructorEdit">
          <h2 className="InstructorEditH2">Instructor Edit System</h2>
        </div>
        {/* <DummyHeaderInst item={instructor} setImage={setImage} /> */}
        <DummyHeaderInst
          item={location.state.instructor}
          setInstructorEdit={setInstructorEdit}
          instructorEdit={instructorEdit}
          toggle2={toggle}
          setToggle2={setToggle}
        />

        <div className="InstructorEditContent">
          <div className="InstructorEditContentLeft">
            <div className="aboutThisMeControl">
              <h4 className="aboutThisMeH4">About Me</h4>
              <TextField
                id="outlined-multiline-static"
                sx={buttonConfig3}
                label="About ( Max. 500 Character)"
                onChange={e =>
                  setInstructorEdit({
                    ...instructorEdit,
                    about: e.target.value,
                  })
                }
                multiline
                value={instructorEdit.about}
                shrink={true}
                rows={6}
              />
            </div>
            <div className="grayLine"></div>
            <div className="divMoreFrontEndCourse">
              <div className="divMoreFrontEndCourseHeader">
                <h4 className="aboutThisMeH4">My Course</h4>
              </div>
              <div className="InstructorEditCourseCardControl">
                {courses
                  ?.filter((item, index) => index < i)
                  .filter(item => item.Course !== null)
                  .map(item => (
                    <CourseCard key={item.id} item={item} />
                  ))}
              </div>

              <div className="SeeMoreControl">
                <p
                  className="SeeMoreP"
                  style={{ marginBottom: "10px" }}
                  onClick={handleClickSeeMore}
                >
                  {`<-- See More -->`}
                </p>
              </div>
            </div>
          </div>
          <div className="InstructorEditContentRight">
            <h4 className="aboutThisMeH4">Area of Expertise</h4>
            <div className="AreaOfExpertiseTagController">
              <TextField
                id="outlined-multiline-static"
                sx={(buttonConfig3, { width: "80%" })}
                label="Expertise ( Max. 100 Character)"
                value={instructorEdit.expertise}
                shrink={true}
                onChange={e =>
                  setInstructorEdit({
                    ...instructorEdit,
                    expertise: e.target.value,
                  })
                }
                multiline
                rows={6}
              />
            </div>
            <div className="grayLineRight"></div>
            <TextField
              id="outlined-basic"
              label="Website"
              sx={textFieldConfig2}
              size="small"
              variant="outlined"
              value={instructorEdit.website}
              shrink={true}
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  website: e.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Email"
              sx={textFieldConfig2}
              size="small"
              variant="outlined"
              value={instructorEdit.email}
              shrink={true}
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  email: e.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Facebook"
              sx={textFieldConfig2}
              size="small"
              variant="outlined"
              value={instructorEdit.facebook}
              shrink={true}
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  facebook: e.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Youtube"
              sx={textFieldConfig2}
              value={instructorEdit.youtube}
              shrink={true}
              size="small"
              variant="outlined"
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  youtube: e.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              value={instructorEdit.linkedin}
              shrink={true}
              label="Linkedin"
              sx={textFieldConfig2}
              size="small"
              variant="outlined"
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  linkedin: e.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Twitter"
              sx={textFieldConfig2}
              value={instructorEdit.twitter}
              shrink={true}
              size="small"
              variant="outlined"
              onChange={e =>
                setInstructorEdit({
                  ...instructorEdit,
                  twitter: e.target.value,
                })
              }
            />

            <div className="InstructorEditContentRightButton">
              <Button type="submit" variant="contained" sx={{ width: "50%" }}>
                Save
              </Button>

              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={() => {
                  setOpen(true);
                }}
                sx={{ width: "50%", marginTop: "10px", marginBottom: "10px" }}
              >
                Delete Instructor
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Box sx={{ width: "100%", position: "fixed", top: "0px" }}>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <>
                <Button variant="outlined" onClick={handleDeleteInstructor}>
                  yes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    // setDeleteStatus(false);
                    setOpen(false);
                  }}
                >
                  no
                </Button>
              </>
            }
            sx={{ mb: 2 }}
          >
            Do you want to delete the instructor?
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
}

export default InstructorEdit;
