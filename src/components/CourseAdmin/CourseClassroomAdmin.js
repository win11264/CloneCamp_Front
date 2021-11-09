import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import CreateQuiz from "./CreateQuiz";
import CreateTopic from "./CreateTopic";
import CreateContent from "./CreateContent";
import { useLocation } from "react-router";
import axios from "axios";
import EditTopic from "./EditTopic";
import EditContent from "./EditContent";
import EditQuiz from "./EditQuiz";

const quizBank = [
  {
    subjectName: "HTML Easy Quiz",
    questions: [
      {
        questionText: "What is the capital of France?",
        answerOptions: [
          { answerText: "New York", isCorrect: false },
          { answerText: "London", isCorrect: false },
          { answerText: "Paris", isCorrect: true },
          { answerText: "Dublin", isCorrect: false },
        ],
      },
      {
        questionText: "Who is CEO of Tesla?",
        answerOptions: [
          { answerText: "Jeff Bezos", isCorrect: false },
          { answerText: "Elon Musk", isCorrect: true },
          { answerText: "Bill Gates", isCorrect: false },
          { answerText: "Tony Stark", isCorrect: false },
        ],
      },
    ],
  },
  {
    subjectName: "CSS Greate Quiz",
    questions: [
      {
        questionText: "Who is CEO of Space-X?",
        answerOptions: [
          { answerText: "Jeff Bezos", isCorrect: false },
          { answerText: "Elon Musk", isCorrect: true },
          { answerText: "Bill Gates", isCorrect: false },
          { answerText: "Tony Stark", isCorrect: false },
        ],
      },
    ],
  },
];

// ##################################################################

function CourseClassroomAdmin() {
  const [subjectOptions, setSubjectOptions] = useState([...quizBank]);
  const [displayEdit, setDisplayEdit] = useState(true);

  const [disableAddNewSubject, setDisableAddNewSubject] = useState(false);
  const [disableBtnGroup, setDisableBtnGroup] = useState([true, true, true]);
  const [displayTopicCreate, setDisplayTopicCreate] = useState(false);
  const [displayTopicEdit, setDisplayTopicEdit] = useState(false);

  const [displayContCreate, setDisplayContCreate] = useState(false);

  const [displayContentEdit, setDisplayContentEdit] = useState(false);
  const [displayQuizEdit, setDisplayQuizEdit] = useState(false);
  const [displayQuizCreate, setDisplayQuizCreate] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [topicItem, setTopicItem] = useState([]);

  const [subList, setSubList] = useState([]);
  const [subItem, setSubItem] = useState({});

  const [quizItem, setQuizItem] = useState({});
  console.log(`quizItem------>`, quizItem);
  console.log(`displayQuizEdit`, displayQuizEdit);

  const location = useLocation();

  console.log(`topicList`, topicList);
  const courseDetail = location.state.list;
  console.log(`location`, location);
  // console.log(`location.state`, courseDetail);

  useEffect(() => {
    axios
      .get(`/topic/course/${location.state.key}`)
      .then(res => {
        setTopicList(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const resTopic = await axios.get(`/topic/course/${location.state.key}`);
        setTopicList(resTopic.data.result);
        console.log(`resTopic`, resTopic.data.result);

        const mapTopic = resTopic.data.result.map(item => {
          return item.id;
        });

        console.log(`mapTopic`, mapTopic);
        setSubList(mapTopic);

        for (let i = 0; i < mapTopic.length; i++) {
          const mapSub = axios;
        }
      } catch (error) {}
    };

    fetchTopic();
  }, []);

  useEffect(() => {
    axios
      .get(`/subtopic`)
      .then(res => {
        setSubItem(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log(`res ---- subTopic`, subItem);
  console.log(`topicList--->`, topicList);

  return (
    <div style={{ minHeight: "780px" }}>
      <AppBar position="static" sx={{ color: "#03045E", bgcolor: "#ADE8F4" }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            align="center"
            sx={{ width: "100%" }}
          >
            Course : {courseDetail.courseName}
          </Typography>
        </Toolbar>
      </AppBar>

      <main className="w3-animate-opacity">
        {/* <!-- Subject Options Side-bar --> */}
        <div className="">
          <section className="Admin__section">
            <aside
              className="w3-bar-block w3-light-gray"
              style={{ width: "25%" }}
            >
              {topicList.map((topic, idx) => (
                <div key={idx} className="">
                  <button
                    href="#"
                    className="w3-button w3-block w3-ripple w3-light-blue"
                    onClick={() => {
                      setDisplayTopicCreate(false);
                      setDisplayContCreate(false);
                      setDisplayQuizCreate(false);
                      setDisplayQuizEdit(false);
                      setDisplayTopicEdit(true);
                      setDisableBtnGroup([true, true, true]);
                      setTopicItem(topic);
                      setDisableAddNewSubject(false);
                      // console.log(`topicItem`, topicItem);
                    }}
                  >
                    {idx + 1}. {topic.topicName}
                  </button>

                  {topic.SubTopics.map((subTopic, subIdx) => (
                    <div key={idx} className="">
                      <button
                        href="#"
                        className="w3-button w3-block w3-ripple"
                        onClick={() => {
                          setDisplayTopicCreate(false);
                          setDisplayContCreate(false);
                          setDisplayQuizCreate(false);
                          setDisplayTopicEdit(false);
                          setDisplayQuizEdit(false);
                          setDisplayContentEdit(true);
                          setDisableBtnGroup([true, true, true]);
                          setSubItem(subTopic);
                          setTopicItem(topic);
                          console.log(`subTopic`, subTopic);

                          setDisableAddNewSubject(false);
                          // console.log(`topicItem`, topicItem);
                        }}
                      >
                        {subTopic.subTopName}
                      </button>
                    </div>
                  ))}

                  {topic.Quizzes.map((quiz, subIdx) => (
                    <div key={idx} className="">
                      <button
                        href="#"
                        className="w3-button w3-block w3-ripple"
                        onClick={() => {
                          setDisplayTopicCreate(false);
                          setDisplayContCreate(false);

                          setDisplayTopicEdit(false);
                          setDisplayQuizEdit(true);
                          setDisplayContentEdit(false);
                          setDisableBtnGroup([true, true, true]);
                          setQuizItem(quiz);
                          setTopicItem(topic);
                          // console.log(`subTopic`, subTopic);

                          setDisableAddNewSubject(false);
                          // console.log(`topicItem`, topicItem);
                        }}
                      >
                        {quiz.quizName}
                      </button>
                    </div>
                  ))}
                </div>
              ))}

              <div className="w3-display-container">
                <button
                  href="#"
                  className="w3-button w3-block w3-ripple w3-blue"
                  onClick={() => {
                    setDisableAddNewSubject(true);
                    setDisableBtnGroup([false, false]);
                    setDisplayTopicEdit(false);
                    setDisplayTopicEdit(false);
                    setDisplayContCreate(false);
                    setDisplayContentEdit(false);
                    setDisplayQuizCreate(false);
                    setDisplayQuizEdit(false);
                  }}
                  disabled={disableAddNewSubject}
                >
                  +Add New Subject
                </button>
              </div>
            </aside>

            {/* <!-- Edit Form --> */}
            {displayEdit && (
              <div
                style={{
                  width: "75%",
                }}
              >
                <div
                  className=" w3-margin-top"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="w3-right">
                    <button
                      className="w3-green w3-button w3-ripple w3-mobile w3-margin-left"
                      disabled={disableBtnGroup[0]}
                      onClick={() => {
                        setDisplayTopicCreate(true);
                        setDisplayContCreate(false);
                        setDisplayQuizCreate(false);
                      }}
                    >
                      Topic
                    </button>
                    <button
                      className="w3-blue w3-button w3-ripple w3-mobile"
                      disabled={disableBtnGroup[1]}
                      onClick={() => {
                        setDisplayTopicCreate(false);
                        setDisplayContCreate(true);
                        setDisplayQuizCreate(false);
                      }}
                    >
                      Content
                    </button>
                    <button
                      className="w3-purple w3-button w3-ripple w3-mobile"
                      disabled={disableBtnGroup[2]}
                      onClick={() => {
                        setDisplayTopicCreate(false);
                        setDisplayContCreate(false);
                        setDisplayQuizCreate(true);
                      }}
                    >
                      Quiz
                    </button>
                  </div>
                </div>

                {/* # Topic */}
                {displayTopicCreate && (
                  <CreateTopic
                    setDisableAddNewSubject={setDisableAddNewSubject}
                    setDisableBtnGroup={setDisableBtnGroup}
                    setDisplayTopicCreate={setDisplayTopicCreate}
                    courseDetail={courseDetail}
                    setTopicList={setTopicList}
                  />
                )}
                {displayTopicEdit && (
                  <EditTopic
                    // setDisableAddNewSubject={setDisableAddNewSubject}
                    setDisableBtnGroup={setDisableBtnGroup}
                    setDisplayTopicCreate={setDisplayTopicCreate}
                    setDisplayTopicEdit={setDisplayTopicEdit}
                    courseDetail={courseDetail}
                    setTopicList={setTopicList}
                    topicItem={topicItem}
                  />
                )}

                {/* # Content */}
                {displayContCreate && (
                  <CreateContent
                    setDisableAddNewSubject={setDisableAddNewSubject}
                    setDisableBtnGroup={setDisableBtnGroup}
                    setDisplayContCreate={setDisplayContCreate}
                    topicList={topicList}
                  />
                )}

                {displayContentEdit && (
                  <EditContent
                    setDisableAddNewSubject={setDisableAddNewSubject}
                    setDisableBtnGroup={setDisableBtnGroup}
                    setDisplayTopicCreate={setDisplayTopicCreate}
                    setDisplayTopicEdit={setDisplayTopicEdit}
                    // courseDetail={courseDetail}
                    // setTopicList={setTopicList}
                    topicList={topicList}
                    subItem={subItem}
                    topicItem={topicItem}
                  />
                )}

                {/* # Quiz */}
                {displayQuizCreate && (
                  <CreateQuiz
                    setDisableAddNewSubject={setDisableAddNewSubject}
                    setDisableBtnGroup={setDisableBtnGroup}
                    displayQuizCreate={displayQuizCreate}
                    setDisplayQuizCreate={setDisplayQuizCreate}
                    topicList={topicList}
                  />
                )}

                {displayQuizEdit && (
                  <EditQuiz
                    setDisableAddNewSubject={setDisableAddNewSubject}
                    setDisableBtnGroup={setDisableBtnGroup}
                    displayQuizEdit={displayQuizEdit}
                    setDisplayQuizCreate={setDisplayQuizCreate}
                    topicList={topicList}
                    quizItem={quizItem}
                  />
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default CourseClassroomAdmin;
