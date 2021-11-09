import { TextField } from "@mui/material";
import axios from "../../config/axios";
import "./styleFeedbackCard.css";

function FeedbackCard({
  issueNo,
  status,
  dateSent,
  name,
  email,
  topic,
  content
}) {
  const handleButtonToggle = () => {
    axios
      .put(`/feedback/${issueNo}`, {
        status: status === "solved" ? "unsolved" : "solved"
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={
        status === "solved"
          ? `FeedbackCardBody-done`
          : `FeedbackCardBody-undone`
      }
    >
      <div className="divDetailCard">
        <p className="topic">{`Issue #${issueNo}`}</p>
        <span className="topic resolveBtn" onClick={handleButtonToggle}>
          {status === "solved" ? `Resolved` : `Unresolved`}
        </span>
      </div>
      <div className="">
        <span className="topic">Date sent: </span>
        <span>{dateSent?.slice(0, 10)}</span>
      </div>
      <div className="">
        <span className="topic">Name: </span>
        <span>{name}</span>
      </div>
      <div className="">
        <span className="topic">Email: </span>
        <span>{email}</span>
      </div>
      <div className="">
        <span className="topic">Topic: </span>
        <span>{topic}</span>
      </div>
      <div className="">
        <TextField
          sx={{ marginY: 2 }}
          multiline
          rows={5}
          variant="outlined"
          size="small"
          fullWidth
          required
          value={content}
        />
      </div>
    </div>
  );
}

export default FeedbackCard;
