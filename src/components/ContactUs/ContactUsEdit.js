import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../config/axios";

function ContactUsEdit() {
  const [contactForm, setContactForm] = useState({});

  useEffect(() => {
    axios
      .get("/contactus")
      .then((res) => {
        setContactForm(res.data.result[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleButtonSave = async () => {
    if (window.confirm("Are you sure to save the change?")) {
      try {
        const resSave = contactForm.id
          ? await axios.put(`/contactus/${contactForm.id}`, contactForm)
          : await axios.post("/contactus", contactForm);

        console.log("@resSave:", resSave);
      } catch (error) {
        console.log("@contactEditError:", error);
      }
    }
  };

  const handleButtonCancel = () => {
    if (window.confirm("Are you sure to empty all inputs?")) setContactForm({});
  };

  return (
    <>
      <div style={{ margin: 0 }}>
        <AppBar position="static" sx={{ color: "#03045E", bgcolor: "#ADE8F4" }}>
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              align="center"
              sx={{ width: "100%" }}
            >
              Contact Us Admin
            </Typography>
          </Toolbar>
        </AppBar>

        <Card
          style={{ maxWidth: 550, margin: "30px auto", padding: "20px 5px" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h6" align="center">
              Contact Edit Form
            </Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    label="Embed Map"
                    placeholder="Enter Google share's embed-a-map link"
                    variant="outlined"
                    fullWidth
                    required
                    // InputLabelProps={{ shrink: true }}
                    // value={contactForm.map}
                    value={contactForm.map || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        map: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Address"
                    placeholder="Enter address"
                    variant="outlined"
                    fullWidth
                    required
                    value={contactForm.address || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        address: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    variant="outlined"
                    fullWidth
                    required
                    value={contactForm.email || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        email: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="text"
                    label="Phone"
                    placeholder="Enter phone number"
                    variant="outlined"
                    fullWidth
                    required
                    value={contactForm.phoneNo || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        phoneNo: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="text"
                    label="Facebook link"
                    placeholder="Enter link"
                    variant="outlined"
                    fullWidth
                    required
                    value={contactForm.facebook || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        facebook: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="text"
                    label="Youtube link"
                    placeholder="Enter link"
                    variant="outlined"
                    fullWidth
                    required
                    value={contactForm.youtube || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        youtube: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="text"
                    label=" Twitter link"
                    placeholder="Enter link"
                    variant="outlined"
                    fullWidth
                    required
                    value={contactForm.twitter || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        twitter: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="text"
                    label="Line link"
                    placeholder="Enter link"
                    variant="outlined"
                    fullWidth
                    required
                    value={contactForm.line || ""}
                    onChange={(e) => {
                      setContactForm((curr) => ({
                        ...curr,
                        line: e.target.value
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleButtonSave}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleButtonCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ContactUsEdit;
