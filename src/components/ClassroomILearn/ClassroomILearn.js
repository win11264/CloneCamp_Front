import "./styleClassroomILearn.css";
// import ListSubheader from '@mui/material/ListSubheader';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
// import { useState } from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { ToggleButtonConfig, ListItemTextConfig } from './muiConfig';
import NevBarLeftList from "./NevBarLeftList/NevBarLeftList";
import ContentRightClass from "./ContentRightClass/ContentRightClass";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useHistory, useParams } from "react-router-dom";

function ClassroomILearn() {
  const param = useParams();
  const history = useHistory();
  const [topicArr, setTopicArr] = useState([]);
  const [rightIframeOn, setRightIframeOn] = useState(false);
  const [vdoLink, setVdoLink] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  console.log(`history`, history);
  console.log(`quiz.id in class`, topicArr);
  // console.log("@param:", param.id);
  // console.log("@topicArr:", topicArr);
  // console.log("@vdoLink:", vdoLink);
  // console.log("@questions:", questions);

  const recievedData = history.location.state.item;

  console.log(`recievedDataa`, recievedData);

  useEffect(() => {
    const getLeftLists = async () => {
      try {
        const resTopic = await axios.get(`/topic`);
        // console.log("@@@resTopic:", resTopic.data.result);
        // console.log(
        //   "@#@filter:",
        //   resTopic.data.result.filter((item) => item.courseId === +param.id)
        // );
        setTopicArr(
          resTopic.data.result.filter(item => item.courseId === +param.id)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getLeftLists();
  }, [param]);

  return (
    <div className="mainDivClassroomILearn">
      <div className="divLessonList">
        <h3 className="ClassroomILearnH3">Lesson List</h3>
        {topicArr?.map((item, idx) => (
          <NevBarLeftList
            key={item.id}
            topicId={item.id}
            topicName={item.topicName}
            setRightIframeOn={setRightIframeOn}
            setVdoLink={setVdoLink}
            setQuestions={setQuestions}
            arrIndex={idx}
            setQuizId={setQuizId}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
            topicLen={topicArr.length}
            recievedData={recievedData}
          />
        ))}
      </div>
      <div className="divRightClassroomILearn">
        {rightIframeOn ? (
          <ContentRightClass
            vdoLink={vdoLink}
            questions={questions}
            quizId={quizId}
            currentStage={currentStage}
            recievedData={recievedData}
          />
        ) : (
          <>
            <h2
              style={{
                textAlign: "center",
                backgroundColor: "deepskyblue",
                padding: 10,
              }}
            >
              Check on the left "Lesson List"
            </h2>
            <p
              style={{
                textAlign: "center",
                backgroundColor: "greenyellow",
                padding: 10,
              }}
            >
              Please watch VDO contents and take exam to unlock the next stage.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ClassroomILearn;
