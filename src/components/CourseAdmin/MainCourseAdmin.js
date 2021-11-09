import React, { useState, useEffect } from "react";
import { Button, CssBaseline, Grid, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CategorySelect from "./CategoryDropDown";
import { AppBar, Toolbar } from "@mui/material";
import axios from "../../config/axios";
import { API_URL } from "../../config/env";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CourseAdminCard from "./CourseAdminCard";
import Swal from "sweetalert2";

function MainCourseAdmin() {
  useEffect(() => {
    axios
      .get("/course/bydate")
      .then(res => {
        setCourseList(res.data.courseResult);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const [courseList, setCourseList] = useState([]);
  console.log("course", courseList);
  const [courseName, setCourseName] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountUntil, setDiscountUntil] = useState("");
  const [image, setImage] = useState("");
  const [clip, setClip] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [about, setAbout] = useState("");
  const [open, setOpen] = useState(false);
  console.log(`image ------>`, image);

  const [subject, setSubject] = useState("");

  // const handleChange = event => {
  //   setSubject(event.target.value);
  //   setCourseInfo({
  //     ...courseInfo,
  //     level: event.target.value,
  //   });
  // };

  const createMainCourse = async e => {
    e.preventDefault();

    const priceNet = price - (discountRate / 100) * price;
    const data = new FormData();
    data.append("courseName", courseName);
    data.append("categoryId", categoryId);
    data.append("level", level);
    data.append("duration", duration);
    data.append("price", priceNet);
    data.append("discountRate", +discountRate);
    data.append("discountUntil", discountUntil);
    data.append("thisisinput", image);
    data.append("clip", clip);
    data.append("shortDescription", shortDescription);
    data.append("about", about);

    // console.log("@@@courseInfo:", courseInfo);
    // console.log("@@@data:", data);
    try {
      const res = await axios.post(`/course`, data);
      console.log("@@@res:", res);
      Swal.fire({
        title: `Create New Course Successfully`,

        confirmButtonText: "Ok",
      }).then(result => {
        window.location.reload();
      });

      // const courseCatMap = res.map;
    } catch (error) {
      console.dir("@@@error:", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ color: "#03045E", bgcolor: "#ADE8F4" }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            align="center"
            sx={{ width: "100%" }}
          >
            Main Course Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xlg">
        <Card sx={{ minWidth: 275, bgcolor: "", marginY: 5 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              Course Information Form
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField
                        label="Course name"
                        placeholder="Enter Course name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setCourseName(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <CategorySelect setCategoryId={setCategoryId} />
                    </Grid>
                    <Grid xs={12} item>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Level list
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={level}
                          label="Subject list"
                          onChange={e => setLevel(e.target.value)}
                        >
                          <MenuItem value={"Beginner"}>Beginner</MenuItem>
                          <MenuItem value={"Intermediate"}>
                            Intermediate
                          </MenuItem>
                          <MenuItem value={"Expert"}>Expert</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Course duration"
                        placeholder="Enter Course duration"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setDuration(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Price"
                        placeholder="Enter Price"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setPrice(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Discount"
                        placeholder="Enter Discount"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setDiscountRate(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <label>Discount Until</label>
                      <TextField
                        type="date"
                        // label="Discount until"
                        placeholder="Enter Discout until"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setDiscountUntil(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        type="file"
                        // label="Course image link"
                        placeholder="Enter Course image link"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setImage(e.target.files[0])}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      {/* <Button
                        type="submit"
                        variant="contained"
                        color="warning"
                        size="large"
                        fullWidth
                      >
                        Status
                      </Button> */}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField
                        label="Preview Course vdo-link"
                        placeholder="Enter Preview Course vdo-link"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setClip(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Short description"
                        placeholder="Enter Short description"
                        multiline
                        rows={4}
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setShortDescription(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="About this course"
                        placeholder="Enter About this course"
                        multiline
                        rows={8}
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        onChange={e => setAbout(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      {/* <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={() => {
                          window.location = "/course-classroom-admin";
                        }}
                      >
                        {"View & Edit"}
                      </Button> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Grid xs={3} item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={createMainCourse}
              >
                Create
              </Button>
            </Grid>
            <Grid xs={3} item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Edit
              </Button>
            </Grid>
            <Grid xs={3} item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Delete
              </Button>
            </Grid>
          </CardActions>
        </Card>
        {/* <Card
          sx={{
            minWidth: 275,
            minHeight: 350,
            bgcolor: '',
            marginY: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button>
            <AddIcon fontSize='large' />
          </Button>
        </Card> */}

        {courseList.map(item => {
          return (
            <CourseAdminCard
              key={item.id}
              list={item}
              courseList={courseList}
              setCourseList={setCourseList}
              // setOpen={setOpen}
            />
          );
        })}
      </Container>
    </>
  );
}

export default MainCourseAdmin;
