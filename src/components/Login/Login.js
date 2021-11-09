import "./styleLogin1.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import axios from "../../config/axios";
import { setToken, getToken } from "../../services/localStorage";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router";
import jwtDecode from "jwt-decode";
import { LoginRegisStatusContext } from "../../contexts/loginRegisStatus";
import Link from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import { UserContext } from "../../contexts/userContext";
import { Box } from "@mui/system";
import { GoogleLogin, GoogleLogout } from "react-google-login";
const { clientId } = require("../../config/env");

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  const { loginStatus, setLoginStatus, registerStatus, setRegisterStatus } =
    useContext(LoginRegisStatusContext);
  const handleClickCloseLogin = () => {
    setLoginStatus(false);
  };
  const { setToggleUser } = useContext(UserContext);
  // console.log(values);
  const { user, setUser } = useContext(AuthContext);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const history = useHistory();
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleSubmitLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      // console.log('LogRes: ', res);
      setToken(res.data.token);
      setUser(jwtDecode(res.data.token));
      history.push("/");
      setLoginStatus(false);
      setToggleUser(current => !current);
      window.location.reload();
    } catch (error) {
      console.dir(error);
    }
  };
  const onLoginSuccess = async res => {
    console.log("Login Success:", res.profileObj);
    try {
      const response = await axios.post("/auth/googlelogin", {
        googleId: res.profileObj.googleId,
        googleEmail: res.profileObj.email,
        googleName: res.profileObj.name,
      });
      console.log("LogRes: ", response);
      setToken(response.data.token);
      setUser(jwtDecode(response.data.token));
      history.push("/");
      setLoginStatus(false);
      setToggleUser(current => !current);
      window.location.reload();
    } catch (error) {
      console.dir(error);
    }
  };
  const handleClickToRegister = () => {
    setLoginStatus(false);
    setRegisterStatus(true);
    // window.location.reload();
  };
  const handleClickToForgotPassword = e => {
    e.preventDefault();
    history.push("/forget-password");
    setLoginStatus(false);
  };
  // const onLoginSuccess = res => {
  //   console.log('Login Success:', res.profileObj);
  // };

  const onLoginFailure = res => {
    console.log("Login Failed:", res);
  };

  return (
    <>
      <form className="formLoginMain" action="" onSubmit={handleSubmitLogin}>
        <div className="LoginForm">
          <span className="spanLogin">Login</span>
          <div className="Input--layout">
            <TextField
              // className="divConfig MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
              // error
              // sx={{ marginBottom: "10px" }}
              className="Input--layout"
              id="outlined-basic"
              type="text"
              label="Username"
              variant="outlined"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <FormControl
            variant="outlined"
            className="Input--layout"
            // className="divConfig css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="divLogin buttonLogin">
            <Button variant="contained" type="submit" sx={{ width: "115px" }}>
              Login
            </Button>
          </div>
          <div className="divLogin buttonLogin">
            <GoogleLogin
              className="googleLogin"
              clientId={clientId}
              buttonText="Sign In"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
              render={renderProps => (
                <Button
                  variant="contained"
                  onClick={renderProps.onClick}
                  type="button"
                  endIcon={<GoogleIcon />}
                  sx={{ width: "115px" }}
                >
                  Google
                </Button>
              )}
              isSignedIn={false}
            />
          </div>
          <div className="divLogin buttonLogin">
            <Button
              variant="contained"
              onClick={handleClickToRegister}
              sx={{ width: "115px" }}
            >
              Register
            </Button>
          </div>
          <div className="textForget">
            <Link onClick={handleClickToForgotPassword}>
              Did you forget your password?
            </Link>
          </div>
        </div>
      </form>

      <div className="divCloseAll" onClick={handleClickCloseLogin}></div>
    </>
  );
}

export default Login;
