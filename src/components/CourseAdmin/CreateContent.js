import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Swal from "sweetalert2";

function CreateContent({
  setDisableAddNewSubject,
  setDisableBtnGroup,
  setDisplayContCreate,
  topicList,
}) {
  const [subject, setSubject] = useState("");
  const [lesson, setLesson] = useState("");
  const [vdo, setVdo] = useState("");
  const [doc, setDoc] = useState("");

  const submitContent = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(`/subtopic`, {
        subTopName: lesson,
        video: vdo,
        document: doc,
        topicId: subject,
      });

      Swal.fire({
        title: `Create ${lesson} successfully`,

        confirmButtonText: "Ok",
      }).then(result => {
        window.location.reload();

        setDisableAddNewSubject(false);
        setDisableBtnGroup([true, true, true]);
        setDisplayContCreate(false);
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
      <form
        className="w3-container w3-card-4"
        onSubmit={e => e.preventDefault()}
      >
        <p className="w3-text-blue w3-center">
          <b>Content</b>
        </p>
        <p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Subject list</InputLabel>
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
            onChange={e => setDoc(e.target.value)}
          />
        </p>

        <div className="w3-bar-item w3-center w3-margin-bottom">
          <button
            className="w3-green w3-button w3-ripple w3-mobile w3-margin-right"
            onClick={submitContent}
          >
            Save
          </button>
          <button
            className="w3-red w3-button w3-ripple w3-mobile"
            onClick={() => {
              setDisableAddNewSubject(false);
              setDisableBtnGroup([true, true, true]);
              setDisplayContCreate(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateContent;
