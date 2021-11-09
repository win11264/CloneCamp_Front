import { Button } from "@mui/material";
import { buttonConfig, buttonConfig2 } from "../muiConfig";
import courseImg from "../../../../../../public/images/course.png";
import { useHistory } from "react-router-dom";
import "../../styleDashBoard.css";
function CompletedCoures({ item, courseName }) {
  const history = useHistory();
  const {
    courseId,
    createdAt,
    currentStage,
    duration,
    id,
    price,
    status,
    totalStage,
    updatedAt,
    userId,
  } = item;
  console.log("itemMyPro:", item);
  const handleClickLocationToCertificate = () => {
    history.push({
      pathname: `/certificate`,
      state: {
        item,
      },
    });
  };
  const handleClickLinkToClassroom = () => {
    history.push({
      pathname: `/classroom-i-learn/${item.id}`,
      state: {
        item,
      },
    });
  };
  return (
    <>
      {status === "completed" && (
        <>
          <div
            className="divCoursesCardStatus"
            // onClick={handleClickLinkToClassroom}
          >
            <div className="coursesCardStatusControl">
              <img src={item.Course.courseImage} alt="" />
            </div>
            <div className="coursesCardStatusDetail">
              <div className="coursesCardStatusDetailTop">
                <div className="coursesCardStatusDetailTopH4">
                  <h4>{courseName}</h4>
                </div>
                <div>
                  {status === "incompleted" && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={buttonConfig}
                    >
                      Active
                    </Button>
                  )}
                  {status === "completed" && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        sx={buttonConfig}
                      >
                        Complete
                      </Button>
                      <Button
                        className="btnCertificate"
                        onClick={handleClickLocationToCertificate}
                        variant="contained"
                        color="secondary"
                        sx={buttonConfig2}
                      >
                        Certificate
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="coursesCardStatusDetailBottom">
                <div className="bottomCardDetail">
                  <p>total Lessons: </p>
                  <span>{totalStage}</span>
                </div>
                <div className="bottomCardDetail">
                  <p>Completed</p>&nbsp;
                  <p>Lessons:</p>
                  <span>
                    {currentStage}/{totalStage}
                  </span>
                </div>
                <div className="bottomCardDetail">
                  <span>
                    {isNaN(((currentStage / totalStage) * 100).toFixed(0))
                      ? "0"
                      : ((currentStage / totalStage) * 100).toFixed(0)}
                    %
                  </span>
                  <p>Complete</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='grayLine'></div> */}
        </>
      )}
    </>
  );
}

export default CompletedCoures;
