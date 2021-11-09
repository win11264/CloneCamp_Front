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
  styleButton
} from "../../ClassroomILearn/muiConfig";
import "../../ClassroomILearn/styleClassroomILearn.css";
import { useEffect, useState } from "react";
import ToggleButtonLeftBar from "./ToggleButtonLeftBar/ToggleButtonLeftBar";
import axios from "../../../config/axios";

function NevBarLeftList({ item }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("list");
  const [subtopic, setSubtopic] = useState([]);
  const { topicName } = item;
  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  useEffect(() => {
    const fetchDataTopics = async () => {
      const response = await axios.get(`/subtopic/${item.id}`);
      setSubtopic(response.data.result);
    };
    fetchDataTopics();
  }, []);
  // console.log('item: ', item.id);
  const handleClick = () => {
    setOpen(!open);
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
              {subtopic.map((item) => (
                <ToggleButtonLeftBar key={item.id} item={item} />
              ))}

              {/* <ToggleButton sx={ToggleButtonConfig} value='htmlWww'>
                HTML - WWW
              </ToggleButton>
              <ToggleButton sx={ToggleButtonConfig} value='htmlStructure'>
                HTML - structure
              </ToggleButton>
              <ToggleButton sx={ToggleButtonConfig} value='htmlElementTag'>
                HTML - element/tag
              </ToggleButton>
              <ToggleButton sx={ToggleButtonConfig} value='htmlW3S'>
                HTML - w3s
              </ToggleButton>
              <ToggleButton sx={ToggleButtonConfig} value='htmlLessonQuiz'>
                HTML - lesson quiz
              </ToggleButton> */}
            </ToggleButtonGroup>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}

export default NevBarLeftList;
