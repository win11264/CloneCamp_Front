import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  Button,
  CssBaseline,
  Grid,
  listItemClasses,
  TextField,
} from "@mui/material";
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
import { Link, useHistory } from "react-router-dom";

function CourseAdminCard({ list, setCourseList }) {
  console.log(`list`, list);
  const [courseName, setCourseName] = useState(list.courseName);
  const [categoryId, setCategoryId] = useState([]);
  const [level, setLevel] = useState(list.level);
  const [duration, setDuration] = useState(list.duration);
  const [price, setPrice] = useState(list.price);
  const [discountRate, setDiscountRate] = useState(list.discountRate);
  const [discountUntil, setDiscountUntil] = useState(list.discountUntil);
  const [image, setImage] = useState(list.courseImage);
  const [clip, setClip] = useState(list.clip);
  const [shortDescription, setShortDescription] = useState(
    list.shortDescription
  );

  useEffect(() => {
    axios
      .get(`/courseCat/bycourse/${list.id}`)
      .then(res => {
        console.log(`res.data`, res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const [about, setAbout] = useState(list.about);
  const [status, setStatus] = useState(list.status);
  console.log(`new cat id --->`, categoryId);
  console.log(`status---->`, status);

  const [edit, setEdit] = useState(0);

  const [subject, setSubject] = useState("");

  const [cat, setCat] = useState([]);

  const catList = list.CourseCats.map(item => {
    return item;
  });

  const catMap = list.CourseCats.map(item => {
    return item;
  });

  const mapCatId = catMap.map(item => {
    // setCat({ id: item.Category.id, name: item.Category.categoryName });
    return { id: item.Category.id, name: item.Category.categoryName };
  });
  // console.log(`cat`, catMap);

  // console.log(`mapCatId`, mapCatId);

  const mapCatName = catMap.map(item => {
    return item.Category.categoryName;
  });

  // console.log(`cat___Map ------->`, mapCatName.id);
  // console.log(`cat___Map____Name ------->`, list);

  // const handleChange = event => {
  //   setSubject(event.target.value);
  //   setCourseInfo({
  //     ...courseInfo,
  //     level: event.target.value,
  //   });
  // };

  const updateCourse = async e => {
    e.preventDefault();

    let isDiscount = +discountRate === 0 ? "null" : discountUntil;
    console.log(`isDiscount`, isDiscount);

    const priceNet = price - (discountRate / 100) * price;
    const data = new FormData();
    data.append("courseName", courseName);
    data.append("categoryId", categoryId);
    data.append("level", level);
    data.append("duration", duration);
    data.append("price", priceNet);
    data.append("discountRate", +discountRate);
    data.append("discountUntil", isDiscount);
    data.append("thisisinput", image);
    data.append("clip", clip);
    data.append("shortDescription", shortDescription);
    data.append("about", about);

    console.log(`categoryId`, categoryId);
    console.log("@@@res:", data);

    //   console.log("@@@courseInfo:", courseInfo);
    //   console.log("@@@data:", data);
    try {
      const res = await axios.put(`/course/${list.id}`, data);

      // Swal.fire("update course successfully");

      Swal.fire({
        title: "update course successfully",
        // showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Ok",
        // denyButtonText: `Don't save`,
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        // if (result.isConfirmed) {
        //   Swal.fire('Saved!', '', 'success')
        // } else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        // }
        window.location.reload();
      });
    } catch (error) {
      console.dir("@@@error:", error);
    }
  };

  const deleteCat = async (e, itemId) => {
    try {
      e.preventDefault();
      console.log(`itemId`, itemId);
      const res = await axios.delete(`/courseCat/${list.id}/${itemId}`);
      // console.log(`deleteRes--->`, res);

      Swal.fire({
        title: "Delete Category successfully",

        confirmButtonText: "Ok",
      }).then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.dir(error);
    }
  };

  const handleStatus = async e => {
    e.preventDefault();

    if (status === "notReady") {
      setStatus("ready");
      const res = await axios.put(`/course/status/${list.id}`, {
        status: "ready",
      });
    } else {
      setStatus("notReady");
      const res = await axios.put(`/course/status/${list.id}`, {
        status: "notReady",
      });
    }

    // console.log(`res ---->`, res);

    // window.location.reload();
  };

  const handleDelete = async e => {
    try {
      e.preventDefault();
      const res = await axios.delete(`/course/${list.id}`);

      Swal.fire({
        title: "Do you want to delete this course?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then(result => {
          if (result.isConfirmed) {
            axios.delete(`/course/${list.id}`);

            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        })
        .then(result => {
          setCourseList(currentLists => {
            const newLists = [...currentLists];
            const idx = newLists.findIndex(item => item.id === list.id);
            newLists.splice(idx, 1);
            return newLists;
          });
        });
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <>
      {edit === 0 ? (
        <Container maxWidth="xlg">
          <Card sx={{ minWidth: 275, bgcolor: "", marginY: 5 }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid xs={12} sm={2} item>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <img
                        src={image}
                        alt={image}
                        style={{
                          width: "200px",
                          height: "200px",
                          border: "solid 1px black",
                        }}
                      />
                    </Grid>
                    <Grid xs={12} item></Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} sm={2} item>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <span>
                        <b>Course Name : </b>
                      </span>
                      <span>{courseName}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>Category : </b>
                      </span>
                      <span>{mapCatName.toString()}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>Level : </b>
                      </span>
                      <span>{level}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>Duration : </b>
                      </span>
                      <span>{duration} days</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>net Price : </b>
                      </span>
                      <span>{price}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>Discount % : </b>
                      </span>
                      <span>{discountRate}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>Discount Until: </b>
                      </span>
                      <span>{discountUntil}</span>
                    </Grid>

                    <Grid xs={12} item></Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} sm={5} item>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <span>
                        <b>Trailer : </b>
                      </span>
                      <span>{clip}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>Short Description : </b>
                      </span>
                      <span>{shortDescription}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <span>
                        <b>About : </b>
                      </span>
                      <span>{about}</span>
                    </Grid>
                    <Grid xs={12} item>
                      <Link
                        to={{
                          pathname: `/course-classroom-admin/${list.id}`,
                          state: {
                            key: list.id,
                            list: list,
                            // store: storeList,
                          },
                        }}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{
                            width: "270px",
                            height: "35px",
                          }}
                          // size="large"
                          // fullWidth
                          // onClick={() => {
                          //   window.location = `/course-classroom-admin/${list.id}`;
                          // }}
                        >
                          {"View & Edit"}
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      {status === "notReady" ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="warning"
                          size="large"
                          fullWidth
                          style={{
                            height: "35px",
                            // marginLeft: "-27px",
                          }}
                          onClick={handleStatus}
                        >
                          Status : Not Publish
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          size="large"
                          fullWidth
                          onClick={handleStatus}
                        >
                          Status : Publish !
                        </Button>
                      )}
                    </Grid>
                    <Grid xs={12} item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={e => setEdit(1)}
                      >
                        Edit
                      </Button>
                    </Grid>

                    <Grid xs={12} item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Grid xs={3} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={e => setEdit(1)}
                >
                  Edit
                </Button>
              </Grid>
              <Grid xs={3} item>
                {status === "notReady" ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    size="large"
                    fullWidth
                    style={{
                      height: "35px",
                      // marginLeft: "-27px",
                    }}
                  >
                    Status : Not Publish
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="large"
                    fullWidth
                  >
                    Status : Publish !
                  </Button>
                )}
              </Grid>

              <Grid xs={3} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid>
            </CardActions> */}
          </Card>
        </Container>
      ) : (
        <Container maxWidth="xlg">
          <Card sx={{ minWidth: 275, bgcolor: "", marginY: 5 }}>
            <CardContent>
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
                          value={courseName}
                          fullWidth
                          required
                          onChange={e => setCourseName(e.target.value)}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <CategorySelect
                          catMap={catMap}
                          setCategoryId={setCategoryId}
                        />
                      </Grid>

                      <Grid xs={12} item>
                        {mapCatId.map(item => (
                          <button
                            style={{ margin: "10px" }}
                            onClick={e => deleteCat(e, item.id)}
                            value={item.id}
                          >
                            {item.name} x
                          </button>
                        ))}
                      </Grid>

                      {/* {cat.map(item => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles(item, categoryName, theme)}
            >
              {item.categoryName}
            </MenuItem>
          ))} */}

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
                          value={duration}
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
                          value={price}
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
                          value={discountRate}
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
                          value={discountUntil}
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
                      <Grid xs={12} item></Grid>
                    </Grid>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <Grid container spacing={1}>
                      <Grid xs={12} item>
                        <TextField
                          label="Preview Course vdo-link"
                          placeholder="Enter Preview Course vdo-link"
                          variant="outlined"
                          value={clip}
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
                          value={shortDescription}
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
                          value={about}
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                          onChange={e => setAbout(e.target.value)}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <Link
                          to={{
                            pathname: `/course-classroom-admin/${list.id}`,
                            state: {
                              key: list.id,
                              list: list,
                              // store: storeList,
                            },
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            // onClick={() => {
                            //   window.location = `/course-classroom-admin/${list.id}`;
                            // }}
                          >
                            {"View & Edit"}
                          </Button>
                        </Link>
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
                  onClick={updateCourse}
                >
                  Submit
                </Button>
              </Grid>
              <Grid xs={3} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={e => setEdit(0)}
                >
                  Cancel
                </Button>
              </Grid>
            </CardActions>
          </Card>
          <Card
            sx={{
              minWidth: 275,
              minHeight: 350,
              bgcolor: "",
              marginY: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button>
              <AddIcon fontSize="large" />
            </Button>
          </Card>
        </Container>
      )}
    </>
  );
}

export default CourseAdminCard;
