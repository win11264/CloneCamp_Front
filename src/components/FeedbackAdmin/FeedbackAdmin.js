import "./styleOurTeam.css";
import Button from "@mui/material/Button";
// import Pagination from "@mui/material/Pagination";
import { ButtonConfig } from "./muiConfig";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import FeedbackCard from "./FeedbackCard";
import axios from "../../config/axios";

function FeedbackAdmin() {
  // const [page, setPage] = useState(1);
  const [issueInfo, setIssueInfo] = useState([]);
  const [statusBtn, setStatusBtn] = useState("all");

  useEffect(() => {
    axios
      .get("/feedback")
      .then(res => {
        // console.log("@resFeedback:", res.data.result);
        setIssueInfo(res.data.result);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="divMainControllerOurTeam" style={{ minHeight: "780px" }}>
        <AppBar position="static" sx={{ color: "#03045E", bgcolor: "#ADE8F4" }}>
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              align="center"
              sx={{ width: "100%" }}
            >
              Feedback Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="OurTeamSearch">
          <div className="buttonSelectOurTeam">
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => {
                setStatusBtn("all");
              }}
            >
              All
            </Button>
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => {
                setStatusBtn("unsolved");
              }}
            >
              Unresolved
            </Button>
            <Button
              sx={ButtonConfig}
              variant="contained"
              onClick={() => {
                setStatusBtn("solved");
              }}
            >
              Resolved
            </Button>
          </div>
          <div className="outputSearchFieldOurTeam">
            {issueInfo
              .filter(
                item =>
                  // item.status === "all" ||
                  statusBtn === "all" ||
                  (statusBtn === "unsolved" && item.status === "unsolved") ||
                  (statusBtn === "solved" && item.status === "solved")
              )
              .sort((a, b) => b.id - a.id)
              .map((card, idx) => (
                <FeedbackCard
                  key={idx}
                  issueNo={card.id}
                  status={card.status}
                  dateSent={card.createdAt}
                  name={card.name}
                  email={card.email}
                  topic={card.feedbackName}
                  content={card.detail}
                />
              ))}
          </div>
        </div>
        {/* <div className="divPaginationSearchOurTeam">
          <Pagination
            count={10}
            color="primary"
            value={page}
            onChange={(e, value) => setPage(value)}
          />
        </div> */}
      </div>
    </>
  );
}

export default FeedbackAdmin;
