import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import axios from "../../config/axios";
import { useEffect, useState } from "react";

function ContactUsUser() {
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    axios
      .get("/contactus")
      .then(res => {
        setContactInfo(res.data.result[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const [userInput, setUserInput] = useState({});

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/feedback", userInput);
      window.location.reload();
    } catch (error) {
      console.log("@contactSubmitError:", error);
    }
  };

  return (
    <div style={{ minHeight: "780px" }}>
      <AppBar position="static" sx={{ color: "#03045E", bgcolor: "#ADE8F4" }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            align="center"
            sx={{ width: "100%" }}
          >
            Contact Us
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Map & Address */}
      <Grid container spacing={0}>
        <Grid
          xs={12}
          sm={5}
          item
          sx={{
            minWidth: 650,
            margin: "30px auto",
            marginLeft: "40px",
          }}
        >
          <iframe
            src={contactInfo.map}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="OurAddress"
          ></iframe>
          <p></p>
          <Typography gutterBottom variant="subtitle1">
            {`Address: ${contactInfo.address}`}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {`E-mail: ${contactInfo.email}`}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {`Phone: ${contactInfo.phoneNo}`}
          </Typography>
        </Grid>

        {/* Contact Form */}
        <Grid
          xs={12}
          sm={6}
          sx={{
            minWidth: 650,
            margin: "30px auto",
            marginRight: "40px",
          }}
          item
        >
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" align="center">
                Contact Form
              </Typography>
              <form onSubmit={e => handleFormSubmit(e)}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      label="Name"
                      placeholder="Enter Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={e => {
                        setUserInput(curr => ({
                          ...curr,
                          name: e.target.value,
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      type="email"
                      label="Email"
                      placeholder="Enter Email"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={e => {
                        setUserInput(curr => ({
                          ...curr,
                          email: e.target.value,
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      label="Topic"
                      placeholder="Enter Topic"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={e => {
                        setUserInput(curr => ({
                          ...curr,
                          feedbackName: e.target.value,
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      label="Message"
                      placeholder="Enter Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                      required
                      onChange={e => {
                        setUserInput(curr => ({
                          ...curr,
                          detail: e.target.value,
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={3} item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactUsUser;
