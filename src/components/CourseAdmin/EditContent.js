import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Swal from "sweetalert2";

function EditContent({
  setDisableAddNewSubject,
  setDisableBtnGroup,
  setDisplayContCreate,
  topicList,
  subItem,
  topicItem,
}) {
  const [item, setItem] = useState(subItem);
  useEffect(() => {
    setItem(subItem);
    setLesson(subItem.subTopName);
    setSubject(topicItem);
  }, [subItem, topicItem]);
  console.log(`subItem111`, subItem);
  console.log(`item`, item);
  const [subject, setSubject] = useState(topicItem);
  const [lesson, setLesson] = useState(item.subTopName);
  const [vdo, setVdo] = useState(subItem.video);
  const [doc, setDoc] = useState(subItem.document);
  console.log(`lesson --->`, lesson);
  console.log(`vdo --->`, vdo);
  console.log(`doc --->`, doc);
  console.log(`subject --->`, subject);

  const [edit, setEdit] = useState(0);
  const [subList, setSubList] = useState(topicItem.SubTopics);

  console.log(`subList`, subList);

  const deleteTopic = async e => {
    e.preventDefault();

    try {
      const res = await axios.delete(`/subtopic/${subItem.id}`);

      Swal.fire({
        title: `Delete ${lesson} successfully`,

        confirmButtonText: "Ok",
      }).then(result => {
        window.location.reload();
      });
      // setSubList(currentLists => {
      //   const newLists = [...currentLists];
      //   console.log(`newLists`, newLists);
      //   const idx = newLists.findIndex(item => item.id === subItem.id);
      //   newLists.splice(idx, 1);
      //   return newLists;
      // });
      setDisableAddNewSubject(false);
      setDisableBtnGroup([true, true, true]);
      setDisplayContCreate(false);
    } catch (error) {
      console.dir("@@@error:", error);
    }
  };
  const submitEdit = async e => {
    e.preventDefault();

    try {
      const res = await axios.put(`/subtopic/${subItem.id}`, {
        subTopName: lesson,
        video: vdo,
        document: doc,
        topicId: subject,
      });

      // alert(`Update ${lesson} successfully`);
      // window.location.reload();
      // setDisableAddNewSubject(false);
      // setDisableBtnGroup([true, true, true]);
      // setDisplayContCreate(false);
      Swal.fire({
        title: `Update ${lesson} successfully`,

        confirmButtonText: "Ok",
      }).then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.dir("@@@error:", error);
    }
  };

  const handleChange = event => {
    setSubject(event.target.value);
  };

  return (
    <div>
      {edit === 0 ? (
        <div
          className="w3-container w3-card-4"
          onSubmit={e => e.preventDefault()}
        >
          <p className="w3-text-blue w3-center">
            <b>{subItem.subTopName}</b>
          </p>
          <p>
            <b>Topic</b>
            {topicItem.topicName}
          </p>
          <p>
            <label className="w3-text-blue">
              <b>Lesson name</b>
            </label>
            {subItem.subTopName}
          </p>
          <p>
            <label className="w3-text-blue">
              <b>Content-VDO link</b>
            </label>
            {subItem.video}
          </p>
          <iframe
            width="560"
            height="315"
            src={subItem.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <p>
            <label className="w3-text-blue">
              <b>Lesson slide link</b>
            </label>
            {subItem.document}
          </p>

          <div className="w3-bar-item w3-center w3-margin-bottom">
            <button
              className="w3-green w3-button w3-ripple w3-mobile w3-margin-right"
              onClick={() => setEdit(1)}
            >
              Edit
            </button>
            <button
              className="w3-red w3-button w3-ripple w3-mobile"
              onClick={deleteTopic}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form
          className="w3-container w3-card-4"
          onSubmit={e => e.preventDefault()}
        >
          <p className="w3-text-blue w3-center">
            <b>{subItem.subTopName}</b>
          </p>
          <p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Subject list
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subject}
                label="Subject list"
                onChange={handleChange}
              >
                {topicList.map(item => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    // style={getStyles(item, instructor.fullName, theme)}
                  >
                    {item.topicName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </p>
          <p>
            <label className="w3-text-blue">
              <b>Lesson name</b>
            </label>
            <input
              className="w3-input w3-border"
              type="text"
              value={lesson}
              onChange={e => setLesson(e.target.value)}
            />
          </p>
          <p>
            <label className="w3-text-blue">
              <b>Content-VDO link</b>
            </label>
            <input
              className="w3-input w3-border"
              type="text"
              value={vdo}
              onChange={e => setVdo(e.target.value)}
            />
          </p>
          <p>
            <label className="w3-text-blue">
              <b>Lesson slide link</b>
            </label>
            <input
              className="w3-input w3-border"
              type="text"
              value={doc}
              onChange={e => setDoc(e.target.value)}
            />
          </p>

          <div className="w3-bar-item w3-center w3-margin-bottom">
            <button
              className="w3-green w3-button w3-ripple w3-mobile w3-margin-right"
              onClick={submitEdit}
            >
              Save
            </button>
            <button
              className="w3-red w3-button w3-ripple w3-mobile"
              onClick={() => {
                setDisableAddNewSubject(false);
                setDisableBtnGroup([true, true, true]);
                // setDisplayContCreate(false);
                setEdit(0);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditContent;
