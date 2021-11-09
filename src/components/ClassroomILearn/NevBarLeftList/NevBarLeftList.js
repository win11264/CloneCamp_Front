import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  ToggleButtonConfig,
  ListItemTextConfig,
  styleButton,
} from "../muiConfig";
import "../styleClassroomILearn.css";
import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { useHistory, useParams } from "react-router";

function NevBarLeftList({
  topicId,
  topicName,
  setRightIframeOn,
  setVdoLink,
  setQuestions,
  arrIndex,
  setQuizId,
  currentStage,
  setCurrentStage,
  topicLen,
  recievedData,
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [subArr, setSubArr] = useState([]);
  const [quizArr, setQuizArr] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("incompleted");

  // console.log(`arrIndex`, arrIndex);

  const leftMyID = recievedData.id;

  // console.log(`recievedData ID in left -->`, leftMyID);

  const param = useParams();
  const history = useHistory();

  // console.log("@subInArrLeft:", subArr);
  // console.log("@quizInArrLeft:", quizArr);

  useEffect(() => {
    const getLeftLists = async () => {
      try {
        const resSubTopic = await axios.get(`/subtopic/topicId/${topicId}`);
        // console.log("@@@resSubTopic:", resSubTopic.data.result);
        const resQuiz = await axios.get(`/quiz/topicId/${topicId}`);
        // console.log("@@@resQuiz:", resQuiz.data.result);

        setSubArr(resSubTopic.data.result);
        setQuizArr(resQuiz.data.result);
      } catch (error) {
        console.log("useEffectSubTopicErr:", error);
      }
    };
    getLeftLists();
  }, [param]);

  useEffect(() => {
    axios
      .get(`/mycourse/my/${leftMyID}`)
      .then(res => {
        // console.log("@myCourse:", res.data);
        setCurrentStage(res.data.result.currentStage);
        setCurrentStatus(res.data.result.status);
      })
      .catch(err => console.log(err));
  }, [param, setCurrentStage]);

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggleButtonClick = async (link, id) => {
    if (currentStatus === "completed") {
      return history.push({
        pathname: `/my-profile`,
        state: {
          alignmentHistory: "dashboard",
          alignmentDashboard: "3",
        },
      });
    }
    try {
      const resQuestion = await axios.get(`/quiz/${id}`);
      console.log(`object`, resQuestion);
      setQuestions(resQuestion.data.result.Questions);
      setQuizId(id);
    } catch (error) {
      console.log(error);
    }
    setRightIframeOn(true);
    setVdoLink(link);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={styleButton}>
        <ListItemText sx={ListItemTextConfig} primary={topicName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ paddingLeft: "0px" }}
      >
        <List component="div" disablePadding>
          <ListItemButton>
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              sx={ToggleButtonConfig}
              exclusive
              onChange={handleChange}
            >
              {subArr.map((item, idx) => (
                <ToggleButton
                  key={idx}
                  sx={ToggleButtonConfig}
                  value={item.subTopName}
                  onClick={() => handleToggleButtonClick(item.video, item.id)}
                  disabled={currentStage < arrIndex}
                >
                  {item.subTopName}
                </ToggleButton>
              ))}

              {quizArr.map((item, idx) => (
                <ToggleButton
                  key={idx}
                  sx={ToggleButtonConfig}
                  value={item.quizName}
                  onClick={() => handleToggleButtonClick(item.video, item.id)}
                  disabled={currentStage < arrIndex}
                >
                  {item.quizName}
                </ToggleButton>
              ))}
              {/* {subObjArr
                .filter(chosenTopic => chosenTopic.topicId === topicId)
                .map((item, idx) => (
                  <ToggleButton
                    key={idx}
                    sx={ToggleButtonConfig}
                    value={item.subTopName || item.quizName}
                    onClick={() =>
                      handleToggleButtonClick(item.video, item.topicId)
                    }
                    disabled={currentStage < arrIndex + 1}
                  >
                    {item.subTopName || item.quizName}
                  </ToggleButton>
                ))} */}
            </ToggleButtonGroup>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}

export default NevBarLeftList;
