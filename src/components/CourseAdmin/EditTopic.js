import axios from "axios";
import React, { useState, useEffect } from "react";
import InstructorDropdown from "./InstructorDropdown";
import Swal from "sweetalert2";

function EditTopic({
  setDisableAddNewSubject,
  setDisableBtnGroup,
  setDisplayTopicCreate,
  setDisplayTopicEdit,
  courseDetail,
  setTopicList,
  topicItem,
}) {
  const [subject, setSubject] = useState(topicItem.topicName);
  console.log(`subject`, subject);
  const [instructor, setInstructor] = useState(topicItem.instructorId);
  const [instructorList, setInstructorList] = useState([]);
  const [edit, setEdit] = useState(0);
  // console.log(`courseDetail`, courseDetail);
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

  const handleUpdate = async e => {
    e.preventDefault();
    const instructorConvert = +instructor;
    try {
      const res = await axios.put(`/topic/${topicItem.id}`, {
        topicName: subject,
        courseId: courseDetail.id,
        instructorId: instructorConvert,
      });
      console.log(`res---->`, res);
      setSubject("");
      setInstructor("");
      Swal.fire({
        title: `Update Topic successfully`,

        confirmButtonText: "Ok",
      }).then(result => {
        window.location.reload();
      });

      // window.location.reload();

      // setTopicList(curr => [...curr, res.data.result]);
    } catch (error) {
      console.dir("@@@error:", error);
    }
  };

  const handleDelete = async e => {
    try {
      e.preventDefault();
      const res = await axios.delete(`/topic/${topicItem.id}`);

      Swal.fire({
        title: `Delete Topic Successfully`,

        confirmButtonText: "Ok",
      }).then(result => {
        setDisableBtnGroup(false);
        setDisplayTopicCreate(false);
        setDisplayTopicEdit(false);
        setTopicList(currentLists => {
          const newLists = [...currentLists];
          console.log(`newLists`, newLists);
          const idx = newLists.findIndex(item => item.id === topicItem.id);
          newLists.splice(idx, 1);
          return newLists;
        });
      });
      // setDisableAddNewSubject(false);
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <>
      {edit === 0 ? (
        <div>
          <div className="w3-container w3-card-4">
            <p className="w3-text-blue w3-center">
              <b>Topic : {topicItem.topicName}</b>
            </p>
            <p>
              <label className="w3-text-blue">
                <b>Subject</b>
              </label>
              {topicItem.topicName}
            </p>
            <p>{topicItem.instructorId}</p>

            <div className="w3-bar-item w3-center w3-margin-bottom">
              <button
                className="w3-green w3-button w3-ripple w3-mobile w3-margin-right"
                onClick={() => {
                  setEdit(1);
                }}
              >
                Edit
              </button>
              <button
                className="w3-red w3-button w3-ripple w3-mobile"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
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
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="w3-red w3-button w3-ripple w3-mobile"
                onClick={() => {
                  setEdit(0);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditTopic;
