import "./styleOurTeam.css";
import OurTeamBanner from "../../public/images/OurTeamBanner.png";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/SearchSharp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InstructorCard from "../InstructorCard/InstructorCard";
import Pagination from "@mui/material/Pagination";

import { InputBaseConfig, IconButtonConfig, ButtonConfig } from "./muiConfig";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
function OurCourse() {
  const [orderBy, setOrderBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [submit, setSubmit] = useState("");
  const [buttonSelect, setButtonSelect] = useState("all");
  const perPage = 6;
  const ITEM_HEIGHT = 38;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleSummitSearch = e => {
    e.preventDefault();
    setSubmit(search);
    // console.log('submit: ', submit);
  };
  const filterSearchBySearchBar = array => {
    return array.filter(item => {
      return item.lowerCaseCourseName.includes(submit.toLowerCase());
    });
  };
  const filterSearchByOrderBy = array => {
    // console.log('array: ', array);
    if (orderBy === "rating") {
      return array.sort((a, b) => b.rating - a.rating);
    } else if (orderBy === "learner") {
      return array.sort((a, b) => b.learner - a.learner);
    }
  };
  const filterByButtonSelectCourse = array => {
    // console.log('typeof:', typeof array);
    const newArr2 = [];
    // console.log('newArr2: ', newArr2);
    // console.log('array: ', array);
    for (let i = 0; i < array.length; i++) {
      // console.log('array[i].category: ', array[i].category);
      if (buttonSelect === "all") {
        newArr2.push(array[i]);
      } else if (buttonSelect === "front - end") {
        if (array[i].category.includes(buttonSelect)) {
          // console.log('in front end:', array[i]);
          newArr2.push(array[i]);
        }
      } else if (buttonSelect === "back - end") {
        if (array[i].category.includes(buttonSelect)) {
          newArr2.push(array[i]);
        }
      } else if (buttonSelect === "ux - ui") {
        if (array[i].category.includes(buttonSelect)) {
          newArr2.push(array[i]);
        }
      }
    }
    return newArr2;
  };
  useEffect(() => {
    const fetchDataOurTeam = async () => {
      try {
        const response = await axios.get(`/instructor/rt`);
        // console.log('responseIns: ', response.data.insResultRating);
        const newArr = response.data.insResultRating.map(item => {
          return {
            ...item,
            lowerCaseCourseName: item.fullName.toLowerCase(),
            category: item.InstructorCats.map(item =>
              item.Category.categoryName.toLowerCase()
            ),
          };
        });
        console.log("newArr: ", newArr);
        setInstructors(
          filterSearchByOrderBy(
            filterSearchBySearchBar(filterByButtonSelectCourse(newArr))
          )
        );
        // setInstructors(filterSearchByOrderBy(filterSearchBySearchBar(newArr)));
        // setInstructors(response.data.insResultRating);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchDataOurTeam();
  }, [submit, orderBy, buttonSelect]);
  const handleClickShowAllCourse = () => {
    setButtonSelect("all");
    setSubmit("");
    setOrderBy("rating");
  };

  return (
    <div style={{ minHeight: "780px" }}>
      <div className="divMainControllerOurTeam">
        <div className="ourTeamBanner">
          <img src={OurTeamBanner} alt="" />
          <h1 className="h1OurTeam">Our Team</h1>
        </div>
        <div className="OurTeamSearch">
          <div className="buttonSelectOurTeam">
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={handleClickShowAllCourse}
            >
              ALL COURSE
            </Button>
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => setButtonSelect("front - end")}
            >
              Front - End
            </Button>
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => setButtonSelect("back - end")}
            >
              Back - End
            </Button>
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => setButtonSelect("ux - ui")}
            >
              UX / UI Design
            </Button>
          </div>
          <div className="searchBarOurTeam">
            <div className="searchByInputTextOurTeam">
              <form action="" onSubmit={handleSummitSearch}>
                <div className="inputSearchTextOurTeam">
                  <p>Search</p>
                  <InputBase
                    sx={InputBaseConfig}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <IconButton
                    type="submit"
                    sx={IconButtonConfig}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </form>
            </div>
            <div className="searchBySelectOurTeam">
              <div className="OrderByOurTeamP">
                <p>Order By</p>
              </div>
              <FormControl size="small" fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                  Part
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderBy}
                  label="Part"
                  size="small"
                  MenuProps={MenuProps}
                  sx={{ backgroundColor: "#f5f5f5" }}
                  onChange={e => setOrderBy(e.target.value)}
                >
                  <MenuItem
                    size="small"
                    sx={{ minWidth: "200px" }}
                    value={"rating"}
                  >
                    Rating
                  </MenuItem>
                  <MenuItem
                    size="small"
                    sx={{ minWidth: "200px" }}
                    value={"learner"}
                  >
                    learner
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="outputSearchFieldOurTeam">
            {instructors
              ?.filter((item, index) => {
                return index >= (page - 1) * perPage && index < page * perPage;
              })
              .map(item => (
                <InstructorCard key={item.id} item={item} />
              ))}
          </div>
        </div>
        <div className="divPaginationSearchOurTeam">
          <Pagination
            count={
              instructors.length % perPage === 0
                ? instructors.length / perPage
                : Math.floor(instructors.length / perPage) + 1
            }
            color="primary"
            value={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default OurCourse;
