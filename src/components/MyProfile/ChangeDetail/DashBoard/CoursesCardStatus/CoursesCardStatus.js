import "./styleCoursesStatus.css";
import courseImg from "../../../../../public/images/course.png";
import { Button } from "@mui/material";
import { buttonConfig } from "./muiConfig";
import { useEffect, useState } from "react";
import axios from "axios";
import IncompletedCourse from "./IncompletedCourse/IncompletedCourse";
import CompletedCoures from "./CompletedCoures/CompletedCoures";
function CoursesCardStatus({ item, alignment }) {
  console.log(`item --- >`, item.Course);
  const [courseName, setCourseName] = useState("");
  // const id = item.Course.id;
  // console.log(`id ------>`, id);
  // console.log(`status ------>`, status);
  // console.log("item: ", item.Course);
  // console.log("status", status);
  useEffect(() => {
    const fetchDataCourseName = async () => {
      try {
        const response = await axios.get(`/course/${item.Course.id}`);
        setCourseName(response.data.courseResult.courseName);
        console.log("courseName", response.data.courseResult);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCourseName();
  }, []);
  // console.log('currentStage', currentStage);
  // console.log('alignment', alignment);
  // console.log('courseName', courseName);
  return (
    <div className="Card--margin">
      {alignment === "1" && (
        <>
          <IncompletedCourse item={item} courseName={courseName} />
          <CompletedCoures item={item} courseName={courseName} />
        </>
      )}
      {alignment === "2" && (
        <>
          <IncompletedCourse item={item} courseName={courseName} />
        </>
      )}
      {alignment === "3" && (
        <>
          <CompletedCoures item={item} courseName={courseName} />
        </>
      )}
    </div>
  );
}

export default CoursesCardStatus;
