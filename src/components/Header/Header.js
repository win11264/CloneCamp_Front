import { Avatar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import "./styleHeader.css";
import {
  buttonLogin,
  buttonRegister,
  buttonOurCourse,
  buttonOurTeam,
  buttonContactUs
} from "./muiConfig";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import iconCode from "../../public/images/code.png";
import John from "../../public/images/john.jpg";
import DropBarMenu from "./DropBarMenu/DropBarMenu";
import { LoginRegisStatusContext } from "../../contexts/loginRegisStatus";

function Header() {
  const { user, setUser, toggle, setToggle } = useContext(AuthContext);
  // const [role, setRole] = useState(user ? user.role : 'guest');
  const role = user ? user.role : "guest";
  const [open, setOpen] = useState(false);
  // console.log('roleHeader:', role);
  const history = useHistory();
  const { loginStatus, setLoginStatus, registerStatus, setRegisterStatus } =
    useContext(LoginRegisStatusContext);

  const handleClickLogin = () => {
    setLoginStatus(true);
  };

  const handleClickRegister = () => {
    setRegisterStatus(true);
  };

  return (
    <div className="MenuItem">
      <div className="leftItem">
        <div className="logo" onClick={() => history.replace("/")}>
          <img src={iconCode} alt="" />
          <p>CloneCamp</p>
        </div>
        <Button
          className="Header--hover"
          variant="text"
          sx={buttonOurCourse}
          onClick={() => history.push("/our-course")}
        >
          Our Course
        </Button>
        <Button
          className="Header--hover"
          variant="text"
          sx={buttonOurTeam}
          onClick={() => history.push("/our-team")}
        >
          Our Team
        </Button>
        <Button
          className="Header--hover"
          variant="text"
          sx={buttonContactUs}
          onClick={() => history.push("/contact-us")}
        >
          Contact Us
        </Button>
        {role === "admin" ? (
          <Button
            className="Header--hover"
            variant="text"
            sx={buttonContactUs}
            onClick={() => history.push("/admin-home")}
          >
            Admin
          </Button>
        ) : null}
      </div>
      <div className="rightItem">
        {!user && (
          <Button
            // className="Avatar--hover"
            variant="contained"
            sx={buttonLogin}
            onClick={handleClickLogin}
          >
            Login
          </Button>
        )}
        {!user && (
          <Button
            variant="contained"
            sx={buttonRegister}
            onClick={handleClickRegister}
          >
            Register
          </Button>
        )}
        {user && <DropBarMenu setOpen={setOpen} />}
      </div>
    </div>
  );
}

export default Header;
