import "../styleClassroomILearn.css";
import Button from "@mui/material/Button";
import { ButtonConfig, ButtonConfig2 } from "../muiConfig";
import VideoLink from "./VideoLink/VideoLink";
import QuizTest from "./Quiz/QuizTest";
import { useState } from "react";
import axios from "../../../config/axios";
import { useHistory, useParams } from "react-router";

function ContentRightClass({
  vdoLink,
  questions,
  quizId,
  currentStage,
  recievedData,
}) {
  // Need to Import Product Id

  const [answerCheck, setAnswerCheck] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");
  const [pass, setPass] = useState(false);

  console.log(`recievedData in right`, recievedData);

  // const myId = recievedData.id;

  // console.log(`<------- my course ID ------>`, myId);

  const param = useParams();
  const history = useHistory();

  // console.log(`quizId`, quizId);

  let col = 0;
  for (const value in answerCheck) {
    if (answerCheck[value]) {
      col += 1;
    }
  }

  const handleButtonSubmit = () => {
    setSubmitted(true);

    if (col === questions.length) {
      setResult(
        `${col}/${questions.length} Congratulation! You passed the test. Now the next lesson is available!`
      );

      setPass(true);

      // if (quizId >= currentStage) {
      axios
        .put(`/mycourse/${recievedData.id}`)

        // Need to send myCourse ID

        .then(res => {
          // console.log("@resPutMycourse:", res.data.result);
        })
        .catch(err => console.log(err));
      // }
    } else {
      setResult(`${col}/${questions.length} Sorry! You failed the test.`);
      setPass(false);
    }
  };

  const handleButtonRetake = () => {
    setAnswerCheck({});
    setPass(false);
    setSubmitted(false);
    window.location.reload();
  };

  return (
    <div className="mainDivControllerContentRightClass">
      <div className="navBarContentRightClass">
        <Button
          variant="contained"
          sx={ButtonConfig}
          onClick={() => {
            history.push({
              pathname: `/my-profile`,
              state: {
                alignmentHistory: "dashboard",
                alignmentDashboard: "2",
              },
            });
          }}
        >
          My Course
        </Button>
        <div className="textLabelContentRightClass">
          <i>- Keep going Keep growing -</i>
        </div>
        {/* <Button variant="contained" sx={ButtonConfig}>
          Lesson Document
        </Button> */}
      </div>
      {/* <div className="lineCompleteController">
        <div className="lineCompleteStatusSuccess"></div>
        <div className="lineWhiteCompleteStatusSuccess"></div>
        <div className="lineCompleteStatus"></div>
        <div className="divLabelPercentComplete">
          <p>80</p>
          <p>%</p>
          <p>Complete</p>
        </div>
      </div> */}
      {vdoLink ? (
        <VideoLink vdoLink={vdoLink} />
      ) : (
        <div style={{ paddingLeft: 15 }}>
          {questions.map((item, idx) => (
            <QuizTest
              key={idx}
              quiz={item}
              quizNo={idx + 1}
              setAnswerCheck={setAnswerCheck}
            />
          ))}{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {submitted ? (
              <>
                {pass ? (
                  <>
                    {result}
                    <Button
                      sx={ButtonConfig2}
                      variant="contained"
                      onClick={() => window.location.reload()}
                    >
                      Next
                    </Button>
                  </>
                ) : (
                  <>
                    {result}
                    <Button
                      sx={ButtonConfig2}
                      variant="contained"
                      onClick={handleButtonRetake}
                    >
                      Retake
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button
                sx={ButtonConfig2}
                variant="contained"
                onClick={handleButtonSubmit}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      )}
      {/* <div className="divControlButtonBottom">
        <Button sx={ButtonConfig2} variant="contained">
          Previous
        </Button>
        <Button sx={ButtonConfig2} variant="contained">
          Next
        </Button>
      </div> */}
    </div>
  );
}

export default ContentRightClass;
