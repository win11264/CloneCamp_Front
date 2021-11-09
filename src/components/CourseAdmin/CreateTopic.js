import axios from "axios";
import React, { useState, useEffect } from "react";
import InstructorDropdown from "./InstructorDropdown";
import Swal from "sweetalert2";

function CreateTopic({
  // setDisableAddNewSubject,
  setDisableBtnGroup,
  setDisplayTopicCreate,
  courseDetail,
  setTopicList,
}) {
  const [subject, setSubject] = useState("");
  console.log(`subject`, subject);
  const [instructor, setInstructor] = useState("");
  const [instructorList, setInstructorList] = useState([]);
  console.log(`courseDetail`, courseDetail);
  useEffect(() => {
    axios
      .get("/instructor")
      .then(res => {
        setInstructorList(res.data.insResult);
      })

      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log(`instructorList`, instructorList);

  const submitTopic = async e => {
    e.preventDefault();
    const instructorConvert = +instructor;
    try {
      const res = await axios.post(`/topic`, {
        topicName: subject,
        courseId: courseDetail.id,
        instructorId: instructorConvert,
      });
      setSubject("");
      setInstructor("");
      Swal.fire({
        title: `Create New Topic Successfully`,

        confirmButtonText: "Ok",
      }).then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.dir("@@@error:", error);
    }
  };

  return (
    <div>
      <form
        className="w3-container w3-card-4"
        onSubmit={e => e.preventDefault()}
      >
        <p className="w3-text-blue w3-center">
          <b>Topic</b>
        </p>
        <p>
          <label className="w3-text-blue">
            <b>Subject</b>
          </label>
          <input
            className="w3-input w3-border"
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </p>
        <p>
          <InstructorDropdown
            instructorList={instructorList}
            setInstructor={setInstructor}
            instructor={instructor}
          />
        </p>

        <div className="w3-bar-item w3-center w3-margin-bottom">
          <button
            className="w3-green w3-button w3-ripple w3-mobile w3-margin-right"
            onClick={submitTopic}
          >
            Save
          </button>
          <button
            className="w3-red w3-button w3-ripple w3-mobile"
            onClick={() => {
              // setDisableAddNewSubject(false);
              setDisableBtnGroup([true, true, true]);
              setDisplayTopicCreate(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTopic;
