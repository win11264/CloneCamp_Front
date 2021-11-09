import "./styleDashBoard.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import CoursesCardStatus from "./CoursesCardStatus/CoursesCardStatus";
import axios from "../../../../config/axios";
import { useLocation } from "react-router-dom";
function DashBoard() {
  const location = useLocation();
  const [alignment, setAlignment] = useState(
    location.state.alignmentDashboard ? location.state.alignmentDashboard : "1"
  );
  const [courseData, setCourseData] = useState([]);
  const [courseStatus, setCourseStatus] = useState([]);

  // console.log('locationDash: ', location);
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  useEffect(() => {
    const fetchDataAllMyCourses = async () => {
      try {
        const response = await axios.get("/mycourse/my");
        // console.log("mycourse: ", response.data.result);
        setCourseData(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAllMyCourses();
  }, []);

  console.log(`courseData`, courseData);
  return (
    <>
      <div>
        <div>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="1" aria-label="left aligned">
              All Courses
            </ToggleButton>
            <ToggleButton value="2" aria-label="centered">
              Active Courses
            </ToggleButton>
            <ToggleButton value="3" aria-label="right aligned">
              Completed Courses
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="grayLine"></div>
        <div className="Dashboard--card-container">
          {courseData.map(item => (
            <CoursesCardStatus
              key={item.id}
              item={item}
              alignment={alignment}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
