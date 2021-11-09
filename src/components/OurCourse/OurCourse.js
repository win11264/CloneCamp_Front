import "./styleOurCourse.css";
import OurCourseBanner from "../../public/images/OurCourse.png";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/SearchSharp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CourseCard from "../CourseCard/CourseCard";
import Pagination from "@mui/material/Pagination";

import { InputBaseConfig, IconButtonConfig, ButtonConfig } from "./muiConfig";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
function OurCourse() {
  const [orderBy, setOrderBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [submit, setSubmit] = useState("");
  const [buttonSelect, setButtonSelect] = useState("all");
  const perPage = 6;
  // console.log('search:', search);
  // console.log('orderBy:', orderBy);
  // console.log('buttonSelect: ', buttonSelect);
  // console.log('page: ', page);
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
  useEffect(() => {
    const fetchDataAllCourse = async () => {
      try {
        const res = await axios.get("/course/byrating");
        // console.log(res);
        // console.log('ourCourse: ', res.data.courseResult);.
        const newArr = res.data.courseResult.map(item => {
          return {
            ...item,
            lowerCaseCourseName: item.courseName.toLowerCase(),
            levelNumber:
              item.level === "Beginner"
                ? 1
                : item.level === "Intermediate"
                ? 2
                : 3,
            category: item.CourseCats.map(item =>
              item.Category.categoryName.toLowerCase()
            ),
            currentPrice:
              item.discountRate === 0
                ? +item.price
                : +item.price - (+item.price * +item.discountRate) / 100,
            // currentPrice: +item.price,
          };
        });
        // console.log('newArr: ', newArr);
        const newArr2 = [];
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].status === "ready") {
            newArr2.push(newArr[i]);
          }
        }
        // console.log('newArr2: ', newArr2);
        setCourses(
          filterSearchByOrderBy(
            filterSearchBySearchBar(filterByButtonSelectCourse(newArr2))
          )
        );
        // setCourses(filterByButtonSelectCourse(newArr));
        // setCourses(filterByButtonSelectCourse2(newArr));

        // setCourses(filterSearchBySearchBar(newArr));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAllCourse();
  }, [submit, orderBy, buttonSelect]);
  console.log("courses: ", courses);
  const filterSearchBySearchBar = array => {
    return array.filter(item => {
      return item.lowerCaseCourseName.includes(submit.toLowerCase());
    });
  };
  const filterByButtonSelectCourse = array => {
    // console.log('typeof:', typeof array);
    const newArr2 = [];
    // console.log('newArr2: ', newArr2);
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
  const filterSearchByOrderBy = array => {
    if (orderBy === "rating") {
      return array.sort((a, b) => {
        return b.rating - a.rating;
      });
    } else if (orderBy === "priceHeightToLow") {
      return array.sort((a, b) => {
        return b.currentPrice - a.currentPrice;
      });
    } else if (orderBy === "priceLowToHeight") {
      return array.sort((a, b) => {
        return a.currentPrice - b.currentPrice;
      });
    } else if (orderBy === "learner") {
      return array.sort((a, b) => {
        return b.learner - a.learner;
      });
    } else if (orderBy === "durationShort") {
      return array.sort((a, b) => {
        return a.duration - b.duration;
      });
    } else if (orderBy === "durationLong") {
      return array.sort((a, b) => {
        return b.duration - a.duration;
      });
    } else if (orderBy === "levelHard") {
      return array.sort((a, b) => {
        return b.levelNumber - a.levelNumber;
      });
    } else if (orderBy === "levelSoft") {
      return array.sort((a, b) => {
        return a.levelNumber - b.levelNumber;
      });
    }
  };
  const handleSummitSearch = e => {
    e.preventDefault();
    setSubmit(search);
    // console.log('submit: ', submit);
  };
  const handleClickShowAllCourse = () => {
    setButtonSelect("all");
    setSubmit("");
    setOrderBy("rating");
  };
  return (
    <>
      <div className="divMainControllerOurCourse">
        <div className="ourCourseBanner">
          <img className="ImgExpand" src={OurCourseBanner} alt="" />
          <h1 className="h1OurCourse">Our Course</h1>
        </div>
        <div className="OurCourseSearch">
          <div className="buttonSelectCourse">
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
              onClick={() => {
                setButtonSelect("front - end");
              }}
            >
              Front - End
            </Button>
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => {
                setButtonSelect("back - end");
              }}
            >
              Back - End
            </Button>
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => {
                setButtonSelect("ux - ui");
              }}
            >
              UX / UI Design
            </Button>
          </div>
          <div className="searchBar">
            <div className="searchByInputText">
              <form action="" onSubmit={handleSummitSearch}>
                <div className="inputSearchTextCourse">
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
            <div className="searchBySelect">
              <div className="OrderByP">
                <p>Order By</p>
              </div>
              <FormControl size="small" fullWidth sx={{ minWidth: 80 }}>
                <InputLabel size="small" id="demo-simple-select-label">
                  Part
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderBy}
                  label="Part"
                  size="small"
                  autoWidth
                  sx={{ backgroundColor: "#f5f5f5" }}
                  MenuProps={MenuProps}
                  onChange={e => setOrderBy(e.target.value)}
                >
                  <MenuItem size="small" value={"rating"}>
                    Rating
                  </MenuItem>
                  <MenuItem size="small" value={"priceHeightToLow"}>
                    Price height to low
                  </MenuItem>
                  <MenuItem size="small" value={"priceLowToHeight"}>
                    Price low to height
                  </MenuItem>
                  <MenuItem size="small" value={"learner"}>
                    Learner
                  </MenuItem>
                  <MenuItem size="small" value={"durationShort"}>
                    Short duration
                  </MenuItem>
                  <MenuItem size="small" value={"durationLong"}>
                    Long duration
                  </MenuItem>
                  <MenuItem size="small" value={"levelHard"}>
                    Hard level
                  </MenuItem>
                  <MenuItem size="small" value={"levelSoft"}>
                    Soft level
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="outputSearchField">
            {courses
              ?.filter((item, index) => {
                return index >= (page - 1) * perPage && index < page * perPage;
              })
              .map(item => (
                <CourseCard key={item.id} item={item} />
              ))}
          </div>
        </div>
        <div className="divPaginationSearch">
          <Pagination
            count={
              courses.length % perPage === 0
                ? courses.length / perPage
                : Math.floor(courses.length / perPage) + 1
            }
            color="primary"
            value={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
    </>
  );
}

export default OurCourse;
