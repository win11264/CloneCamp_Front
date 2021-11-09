import "./styleForgetPassword.css";
import TextField from "@mui/material/TextField";
import { TextFieldConfig, HeaderConfig } from "./muiConfig";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  // console.log(usernameOrEmail);
  const history = useHistory();

  const submitForgot = async e => {
    e.preventDefault();
    try {
      const res = await axios.get("/user");
      // console.log(`res`, res.data.result);
      const mapUser = res.data.result.map(item => {
        return item.email;
      });
      // console.log(`mapUser`, mapUser);
      // console.log(`email`, email);
      if (mapUser.includes(email)) {
        const res = await axios.post("/auth/resetpassword", { email });
        console.log(`res`, res);

        // alert('We have sent link to your email');
        // history.push('/');

        Swal.fire({
          title: `We have sent link to your email`,

          confirmButtonText: "Ok",
        }).then(result => {
          history.push("/");
        });
      } else {
        // alert("We dont have this email in our database");
        Swal.fire({
          title: `We dont have this email in our database`,

          confirmButtonText: "Ok",
        });
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="divMyAccount" style={{ minHeight: "780px" }}>
        <div className="divMyAccountH1">
          <h1 style={{ marginBottom: "-30px" }}>My Account</h1>
        </div>
        <div className="divMyAccountP">
          <p>
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </p>
        </div>
        <div className="divMyAccountTextField">
          <TextField
            id="outlined-basic"
            label="Enter Your Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            size="small"
            sx={TextFieldConfig}
            style={{ marginLeft: "200px" }}
          />
        </div>
        <div className="divMyAccountButton">
          <Button
            style={{ marginLeft: "420px", marginBottom: "30px" }}
            variant="contained"
            onClick={submitForgot}
          >
            Reset password
          </Button>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
