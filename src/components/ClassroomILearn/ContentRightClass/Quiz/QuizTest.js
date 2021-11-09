import "../../styleClassroomILearn.css";
import { ToggleButtonGroupConfig, ToggleButtonConfig2 } from "../../muiConfig";

import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function QuizTest({ quiz, quizNo, setAnswerCheck }) {
  const [view, setView] = useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleButtonClick = (ans) => {
    if (ans === quiz.correct)
      return setAnswerCheck((curr) => ({ ...curr, [quiz.question]: true }));
    setAnswerCheck((curr) => ({ ...curr, [quiz.question]: false }));
  };

  return (
    <div className="mailDivControlQuiz">
      <div className="quizTop">
        <h3>{`${quizNo}.`}</h3>
        <h3>{quiz.question}</h3>
      </div>
      <div className="divChoiceQuiz">
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          size="small"
          sx={ToggleButtonGroupConfig}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            size="small"
            value={quiz.choiceA}
            aria-label="list"
            sx={ToggleButtonConfig2}
            onClick={() => handleButtonClick(quiz.choiceA)}
          >
            <h4 className="quizH4">A. </h4>
            <p className="quizP">{quiz.choiceA}</p>
          </ToggleButton>
          <ToggleButton
            size="small"
            value={quiz.choiceB}
            aria-label="module"
            sx={ToggleButtonConfig2}
            onClick={() => handleButtonClick(quiz.choiceB)}
          >
            <h4 className="quizH4">B. </h4>
            <p className="quizP">{quiz.choiceB}</p>
          </ToggleButton>
          <ToggleButton
            size="small"
            value={quiz.choiceC}
            aria-label="module"
            sx={ToggleButtonConfig2}
            onClick={() => handleButtonClick(quiz.choiceC)}
          >
            <h4 className="quizH4">C. </h4>
            <p className="quizP">{quiz.choiceC}</p>
          </ToggleButton>
          <ToggleButton
            size="small"
            value={quiz.choiceD}
            aria-label="quilt"
            sx={ToggleButtonConfig2}
            onClick={() => handleButtonClick(quiz.choiceD)}
          >
            <h4 className="quizH4">D. </h4>
            <p className="quizP">{quiz.choiceD}</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

export default QuizTest;
