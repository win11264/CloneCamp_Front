import axios from "../../config/axios";
import { useContext, useEffect, useState } from "react";
import InstructorImage from "../../public/images/Instructor.png";
import "./styleInstructorCard.css";
import { useHistory, useParams } from "react-router-dom";
import { ToggleContext } from "../../contexts/toggleContext";
function InstructorCardEdit({ item, setToggle }) {
  const [instructor, setInstructor] = useState({});
  const params = useParams();

  const [instructorFront, setInstructorFront] = useState([]);
  const [instructorBack, setInstructorBack] = useState([]);
  const [instructorUxUi, setInstructorUxUi] = useState([]);
  // console.log('instructor: ', instructor);

  const history = useHistory();
  const { toggle } = useContext(ToggleContext);
  useEffect(() => {
    const fetchDataInstructorById = async () => {
      try {
        // console.log('params', params);
        const response = await axios.get(
          `/instructor/${item.instructorId ? item.instructorId : item.id}`
        );
        const newArr = response.data.instructorResult.InstructorCats.map(
          item => item.categoryId
        );
        // setInstructor(response.data.instructorResult);
        // setInstructorTopics(response2.data.result);
        // setInstructorByInsId(newArr);
        // console.log('res: ', response.data.instructorResult);
        if (newArr.includes(1)) {
          const response4 = await axios.get(`/insCat/bycat/${1}`);
          setInstructorFront(response4.data.result);
          // console.log('response4', response4.data.result);
        }
        if (newArr.includes(2)) {
          const response5 = await axios.get(`/insCat/bycat/${2}`);
          setInstructorBack(response5.data.result);
          // console.log('response5', response5.data.result);
        }
        if (newArr.includes(3)) {
          const response6 = await axios.get(`/insCat/bycat/${3}`);
          setInstructorUxUi(response6.data.result);
          // console.log('response6', response6.data.result);
        }
        setInstructor(response.data.instructorResult);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataInstructorById();
  }, [toggle]);

  const handleClickToInstructorCard = () => {
    // history.push(
    //   `/instructor-card/${item.instructorId ? item.instructorId : item.id}`,
    // );
    history.push({
      pathname: `/instructor-edit/${
        item.instructorId ? item.instructorId : item.id
      }`,
      state: {
        instructor: instructor,
        instructorFront: instructorFront,
        instructorBack: instructorBack,
        instructorUxUi: instructorUxUi,
      },
    });
  };

  return (
    <div className="cardInstructorBody" onClick={handleClickToInstructorCard}>
      <div className="divInstructorImage">
        <img src={instructor.profileImage} alt="" />
      </div>
      <div className="divInstructorDetail">
        <h1 className="divInstructorName">{instructor.fullName}</h1>
        <div className="divDetailInstructorCard">
          <h2 className="h2InstructorCard">{instructor.rating}/5</h2>
          <p className="pInstructorCard">({instructor.ratingAmount} Reviews)</p>
        </div>
        <div className="divDetailInstructorCard">
          <h2 className="h2InstructorCard">Learners : </h2>
          <p className="pInstructorCard">{instructor.learner}</p>
        </div>
      </div>
    </div>
  );
}

export default InstructorCardEdit;
