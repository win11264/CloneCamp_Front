import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Swal from "sweetalert2";

const createQuizTemplate = {
  subjectName: "CREATE",
  questions: [
    {
      questionText: "",
      answerOptions: [
        { idx: "a1", answerText: "", isCorrect: false },
        { idx: "a2", answerText: "", isCorrect: false },
      ],
    },
  ],
};

function EditQuiz({
  setDisableAddNewSubject,
  setDisableBtnGroup,
  displayQuizEdit,
  setDisplayQuizCreate,
  topicList,
  quizItem,
}) {
  const [fromQuiz, setFromQuiz] = useState(createQuizTemplate);
  const [subject, setSubject] = useState("");
  const [edit, setEdit] = useState(0);
  console.log(`fromQuiz`, fromQuiz);
  // const handleChange = event => {
  //   setSubject(event.target.value);
  // };

  const [name, setName] = useState("");
  console.log(`quizItem`, quizItem);
  const [question, setQuestion] = useState([]);
  const quizTitle = quizItem.quizName.split(" ")[0];
  console.log(`quizTitle`, quizTitle);
  const questionMap = fromQuiz.questions.map(item => {
    return item;
  });
  console.log(`item.questions---->`, questionMap);

  const submitQuiz = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(`/quiz`, {
        quizName: `${name} - Quiz`,
        score: fromQuiz.questions.length,
        topicId: subject,
        questionArray: fromQuiz.questions,
      });
      console.log(`res`, res);

      Swal.fire({
        title: `Create question successfully`,

        confirmButtonText: "Ok",
      });
      // window.location.reload();
      // setDisableAddNewSubject(false);
      // setDisableBtnGroup([true, true, true]);
      // setDisplayContCreate(false);
    } catch (error) {
      console.dir("@@@error:", error);
    }
  };

  const mapQuestion = quizItem.Questions.map(item => {
    return item;
  });
  console.log(`mapQuestion------>`, mapQuestion);

  const [editQuestion, setEditQuestion] = useState(mapQuestion);

  console.log(`editQuestion`, editQuestion);
  const handleDelete = async e => {
    try {
      e.preventDefault();
      const res = await axios.delete(`/quiz/${quizItem.id}`);

      alert("delete Successful");
      // setDisableAddNewSubject(false);
      // setDisableBtnGroup(false);
      // setDisplayTopicCreate(false);
      // setDisplayTopicEdit(false);
      // setTopicList(currentLists => {
      //   const newLists = [...currentLists];
      //   console.log(`newLists`, newLists);
      //   const idx = newLists.findIndex(item => item.id === topicItem.id);
      //   newLists.splice(idx, 1);
      //   return newLists;

      // });

      window.location.reload();
    } catch (error) {
      console.dir(error);
    }
  };
  return (
    <>
      {edit === 0 ? (
        <section className="Admin__section">
          {/* <!-- Create Questions --> */}
          {displayQuizEdit && (
            <div
              style={{
                width: "100%",
                backgroundColor: "#CAF0F8",
              }}
            >
              <div className="w3-row w3-margin-left">
                <p className="w3-text-blue w3-center ">
                  <b>{quizItem.quizName}</b>
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControl fullWidth>
                    <p>
                      <b>Topic :</b> {quizTitle}
                    </p>
                  </FormControl>

                  <div className="w3-block w3-right">
                    <button
                      className="w3-green w3-button w3-ripple w3-mobile w3-margin-left"
                      onClick={() => setEdit(1)}
                    >
                      Edit
                    </button>
                    <button
                      className="w3-red w3-button w3-ripple w3-mobile w3-margin-left"
                      // onClick={() => {
                      //   setFromQuiz(createQuizTemplate);
                      //   setDisplayQuizCreate(false);
                      //   setDisableAddNewSubject(false);
                      //   setDisableBtnGroup([true, true, true]);
                      // }}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {mapQuestion.map((item, idx) => (
                <article key={idx} className="w3-display-container">
                  {/* # Question Number */}
                  <p className="w3-margin-left">Question {idx + 1}</p>

                  {/* # Question Text */}
                  <p className="w3-margin-left w3-margin-right">
                    <p type="text" style={{ width: "100%" }} />
                    {item.question}
                  </p>

                  <div style={{ paddingRight: 30 }}>
                    {/* # Answer Options */}
                    <div
                      className="w3-padding-small w3-margin w3-mobile w3-small w3-ripple Quiz__choice"
                      style={{ minHeight: "2rem", width: "100%" }}
                    >
                      {/* # Answer A */}
                      {item.choiceA === item.correct ? (
                        <p
                          type="text"
                          style={{
                            width: "93%",
                            backgroundColor: "green",
                          }}
                        >
                          A . {item.choiceA}
                        </p>
                      ) : (
                        <p
                          type="text"
                          style={{
                            width: "93%",
                          }}
                        >
                          A . {item.choiceA}
                        </p>
                      )}

                      {/* # Answer B */}
                      {item.choiceB === item.correct ? (
                        <p
                          type="text"
                          style={{
                            width: "93%",
                            backgroundColor: "green",
                          }}
                        >
                          B . {item.choiceB}
                        </p>
                      ) : (
                        <p
                          type="text"
                          style={{
                            width: "93%",
                          }}
                        >
                          B . {item.choiceB}
                        </p>
                      )}

                      {item.choiceC ? (
                        item.choiceC === item.correct ? (
                          <p
                            type="text"
                            style={{
                              width: "93%",
                              backgroundColor: "green",
                            }}
                          >
                            C . {item.choiceC}
                          </p>
                        ) : (
                          <p
                            type="text"
                            style={{
                              width: "93%",
                            }}
                          >
                            C . {item.choiceC}
                          </p>
                        )
                      ) : null}

                      {item.choiceD ? (
                        item.choiceD === item.correct ? (
                          <p
                            type="text"
                            style={{
                              width: "93%",
                              backgroundColor: "green",
                            }}
                          >
                            D . {item.choiceD}
                          </p>
                        ) : (
                          <p
                            type="text"
                            style={{
                              width: "93%",
                            }}
                          >
                            D . {item.choiceD}
                          </p>
                        )
                      ) : null}
                      <p
                        type="text"
                        style={{
                          width: "93%",
                          backgroundColor: "green",
                        }}
                      >
                        Correct Answer : {item.correct}
                      </p>
                    </div>
                  </div>
                  <hr />
                </article>
              ))}

              {/* # Question Add New */}
            </div>
          )}
        </section>
      ) : (
        // Edit On ----------=-=-=--=->
        <section className="Admin__section">
          {/* <!-- Create Questions --> */}
          {displayQuizEdit && (
            <div
              style={{
                width: "100%",
                backgroundColor: "#CAF0F8",
              }}
            >
              <div className="w3-row w3-margin-left">
                <p className="w3-text-blue w3-center ">
                  <b>{quizItem.quizName}</b>
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Subject list
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={`${subject}/${name}`}
                      label="Subject list"
                      // onChange={handleChange}
                      onChange={e => {
                        setSubject(e.target.value.split("/")[0]);
                        setName(e.target.value.split("/")[1]);
                      }}
                    >
                      {topicList.map(item => (
                        <MenuItem
                          key={item.id}
                          value={`${item.id}/${item.topicName}`}
                          // style={getStyles(item, instructor.fullName, theme)}
                        >
                          {item.topicName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div className="w3-block w3-right">
                    <button
                      className="w3-green w3-button w3-ripple w3-mobile w3-margin-left"
                      onClick={submitQuiz}
                    >
                      Save create
                    </button>
                    <button
                      className="w3-red w3-button w3-ripple w3-mobile w3-margin-left"
                      onClick={() => {
                        // setFromQuiz(createQuizTemplate);
                        // setDisplayQuizCreate(false);
                        // setDisableAddNewSubject(false);
                        // setDisableBtnGroup([true, true, true]);
                        setEdit(0);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {editQuestion.map((CurrQuestionObj, idx) => (
                <article key={idx} className="w3-display-container">
                  {/* # Button Delete Question */}
                  <span
                    onClick={() => {
                      const cloneObj = { ...editQuestion };
                      const index = cloneObj.findIndex(
                        item => item.id === CurrQuestionObj.id
                      );
                      cloneObj.questions.splice(index, 1);
                      setEditQuestion(cloneObj);
                    }}
                    className="w3-button w3-red w3-border-black w3-leftbar w3-display-topright w3-small w3-ripple w3-margin-right"
                  >
                    &times;
                  </span>

                  {/* # Question Number */}
                  <p className="w3-margin-left">
                    {idx + 1} of {editQuestion.length}
                  </p>

                  {/* # Question Text */}
                  <p className="w3-margin-left w3-margin-right">
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      onChange={e => {
                        const { questions } = { ...editQuestion };
                        const index = questions.findIndex(
                          item => item.idx === CurrQuestionObj.idx
                        );
                        questions[index].questionText = e.target.value;
                        setEditQuestion(quiz => ({
                          ...quiz,
                          questions,
                        }));
                      }}
                      placeholder="Enter Question text..."
                      value={editQuestion[idx].questionText}
                    />
                  </p>

                  <div style={{ paddingRight: 30 }}>
                    {/* # Answer Options */}
                    {editQuestion.questions[idx].answerOptions.map(
                      (currAnswer, ansIdx) => (
                        <div
                          key={ansIdx}
                          className="w3-padding-small w3-margin w3-mobile w3-small w3-ripple Quiz__choice"
                          style={{ minHeight: "2rem", width: "100%" }}
                        >
                          {/* # Answer Checkbox */}
                          <input
                            type="checkbox"
                            className="w3-margin-right"
                            onChange={e => {
                              const { questions } = { ...editQuestion };
                              const index = questions.findIndex(
                                item => item.idx === CurrQuestionObj.idx
                              );
                              questions[index].answerOptions[ansIdx].isCorrect =
                                e.target.checked;
                              setEditQuestion(quiz => ({
                                ...quiz,
                                questions,
                              }));
                            }}
                          />

                          {/* # Answer Text */}
                          <input
                            type="text"
                            style={{
                              width: "93%",
                            }}
                            onChange={e => {
                              const { questions } = { ...editQuestion };
                              const index = questions.findIndex(
                                item => item.idx === CurrQuestionObj.idx
                              );
                              questions[index].answerOptions[
                                ansIdx
                              ].answerText = e.target.value;
                              setEditQuestion(quiz => ({
                                ...quiz,
                                questions,
                              }));
                            }}
                            value={
                              editQuestion.questions[idx].answerOptions[ansIdx]
                                .answerText
                            }
                            placeholder="Enter Answer text..."
                          />

                          {/* # Answer Delete Option */}
                          {CurrQuestionObj.answerOptions.length > 2 && (
                            <span
                              className="w3-button w3-red w3-ripple w3-right"
                              onClick={() => {
                                const { questions } = { ...editQuestion };
                                const choices = questions[idx].answerOptions;
                                const index = choices.findIndex(
                                  item => item.idx === currAnswer.idx
                                );
                                choices.splice(index, 1);
                                setEditQuestion(quiz => ({
                                  ...quiz,
                                  questions,
                                }));
                              }}
                            >
                              &times;
                            </span>
                          )}
                        </div>
                      )
                    )}

                    {/* # Answer Add Option */}
                    {CurrQuestionObj.answerOptions.length < 4 && (
                      <div className="Quiz">
                        <p
                          className="w3-padding-small w3-margin w3-mobile w3-small w3-button w3-ripple Quiz__choice w3-green"
                          onClick={() => {
                            const cloneObj = { ...editQuestion };
                            cloneObj.questions[idx].answerOptions.push({
                              idx: new Date().getTime(),
                              answerText: "",

                              isCorrect: false,
                            });
                            setEditQuestion(cloneObj);
                          }}
                        >
                          +Add Answer Option
                        </p>
                      </div>
                    )}
                  </div>
                  <hr />
                </article>
              ))}

              {/* # Question Add New */}
              <div className="Quiz">
                <p
                  className="w3-padding w3-margin w3-mobile w3-medium w3-button w3-ripple Quiz__choice w3-blue"
                  onClick={() => {
                    const cloneArr = { ...editQuestion };
                    cloneArr.questions.push({
                      idx: new Date().getTime(),
                      questionText: "",
                      answerOptions: [
                        { idx: "@1", answerText: "", isCorrect: false },
                        { idx: "@2", answerText: "", isCorrect: false },
                      ],
                    });
                    setEditQuestion(cloneArr);
                  }}
                >
                  +Add New Question
                </p>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default EditQuiz;
