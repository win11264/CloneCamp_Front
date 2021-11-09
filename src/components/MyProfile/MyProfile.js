import "./styleMyProfile.css";
import Avatar from "@mui/material/Avatar";
import John from "../../public/images/john.jpg";
import { imageConfig, ToggleButtonConfig } from "./muiConfig";
import { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dashboard from "./ChangeDetail/DashBoard/DashBoard";
import MyProfileDetail from "./ChangeDetail/MyProfileDetail/MyProfileDetail";
import PurchaseHistory from "./ChangeDetail/PurchaseHistory/PurchaseHistory";
import axios from "../../config/axios";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function MyProfile() {
  const [image, setImage] = useState(
    "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
  );
  const location = useLocation();
  // console.log('location: ', location);
  // console.log(image);
  const [alignment, setAlignment] = useState(
    location.state.alignmentHistory
      ? location.state.alignmentHistory
      : "myProfile"
  );
  const [data, setData] = useState({
    fullName: "",
    birthDate: "",
    profileImage: "",
    email: "",
    mobileNo: "",
    username: "",
  });
  const [toggleProfile, setToggleProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preViewImage, setPreViewImage] = useState("");
  const [upLoadImageStatus, setUpLoadImageStatus] = useState("");
  // console.log('data: ', data);
  console.log("upLoadImageStatus: ", upLoadImageStatus);
  // console.log(alignment);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // const name =if (alignment === '' || alignment === null) {
  //   return 'My Profile';
  // } else if (alignment === 'Dashboard') {
  //   return 'Dashboard';
  // } else if (alignment === 'purchaseHistory') {
  //   return 'Purchase History';
  // }
  // console.log('image: ', image);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("loading", loading);
        const res = await axios.get("/user/userId");
        // console.log(`@data:`, data.data.result);
        setData(res.data.result);
        setPreViewImage(res.data.result.profileImage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [location.state, toggleProfile]);
  useEffect(() => {
    if (!upLoadImageStatus) {
      return;
    } else if (upLoadImageStatus) {
      setTimeout(() => {
        setUpLoadImageStatus("");
      }, 5000);
    }
  }, [upLoadImageStatus]);
  // console.log(`data`, data);
  const handleClickUpdateProfileImg = async e => {
    console.log("Image2: ", e.target.files[0]);
    try {
      setLoading(true);
      const render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      render.onloadend = () => {
        setPreViewImage(render.result);
      };
      const formData = new FormData();
      formData.append("thisisinput", e.target.files[0]);
      const res = await axios.put("/user/updateImage", formData);
      console.log("res: ", res);
      if (res.status === 200) {
        // setLoading(false);
        // console.log('loading2', loading);
        setToggleProfile(current => !current);
        setUpLoadImageStatus(true);
        // setPreViewImage('');
      } else {
        setUpLoadImageStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mainDivController" style={{ minHeight: "770px" }}>
        <div className="MyProfileConTroller">
          {upLoadImageStatus === true && (
            <span className="v" style={{ color: "green" }}>
              Upload Profile Image Success
            </span>
          )}
          {upLoadImageStatus === false && (
            <span className="spanStatusUploadImage" style={{ color: "red" }}>
              Upload Profile Image Fail!
            </span>
          )}
          <div className="MyProfileTop">
            {/* {loading && <CircularProgress />} */}
            {!preViewImage && (
              <>
                <label
                  htmlFor="files"
                  className="inputImageProfileLabel"
                ></label>
                <Avatar
                  className="MyProfileAvatar"
                  alt="Remy Sharp"
                  src={data.profileImage ? data.profileImage : image}
                  sx={imageConfig}
                  onClick={handleClickUpdateProfileImg}
                />
                <input
                  id="files"
                  className="inputImageProfile"
                  type="file"
                  onChange={e => {
                    setImage(e.target.files[0]);
                    handleClickUpdateProfileImg(e);
                  }}
                />
              </>
            )}
            {preViewImage && (
              <>
                <label
                  htmlFor="files"
                  className="inputImageProfileLabel"
                ></label>
                <Avatar
                  className="MyProfileAvatar"
                  alt="Remy Sharp"
                  src={preViewImage}
                  sx={imageConfig}
                />
                <input
                  id="files"
                  className="inputImageProfile"
                  type="file"
                  onChange={e => {
                    setImage(e.target.files[0]);
                    handleClickUpdateProfileImg(e);
                  }}
                />
              </>
            )}
            <h1 className="MyProfileH1">{data.username}</h1>
          </div>
          <div className="grayLine"></div>
        </div>
        <div className="divMyProfileBottom">
          <div className="divButtonList">
            <ToggleButtonGroup
              orientation="vertical"
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="myProfile" sx={ToggleButtonConfig}>
                My Profile
              </ToggleButton>
              <ToggleButton value="dashboard" sx={ToggleButtonConfig}>
                Dashboard
              </ToggleButton>
              <ToggleButton value="purchaseHistory" sx={ToggleButtonConfig}>
                Purchase History
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="divMyProfileDetailController">
            <div className="divMyProfileH2">
              <h2>
                {((alignment === "myProfile" || alignment === null) &&
                  "My Profile") ||
                  (alignment === "dashboard" && "Dashboard") ||
                  (alignment === "purchaseHistory" && "Purchase History")}
              </h2>
            </div>
            {data.id && (
              <div className="divChangeDetail">
                {(alignment === "myProfile" || alignment === null) && (
                  <MyProfileDetail
                    data={data}
                    setToggleProfile={setToggleProfile}
                  />
                )}
                {alignment === "dashboard" && <Dashboard />}
                {alignment === "purchaseHistory" && <PurchaseHistory />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
