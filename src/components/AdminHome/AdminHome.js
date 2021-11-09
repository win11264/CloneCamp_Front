import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function AdminHome() {
  const history = useHistory();
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
            Admin Home
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack
        spacing={5}
        direction="column"
        sx={{
          m: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          size="large"
          variant="contained"
          sx={{ width: 800 }}
          onClick={() => history.push("/main-course-admin")}
        >
          Course System
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ width: 800 }}
          onClick={() => history.push("/our-team-admin")}
        >
          Instructor System
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ width: 800 }}
          onClick={() => history.push("/create-instructor-card")}
        >
          Create Instructor Card
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ width: 800 }}
          onClick={() => history.push("/home-banner-admin")}
        >
          Course Banner
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ width: 800 }}
          onClick={() => history.push("/contact-us-edit")}
        >
          Edit Contact
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ width: 800 }}
          onClick={() => history.push("/feedback")}
        >
          Feedback System
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ width: 800 }}
          onClick={() => history.push("/home-banner-admin")}
        >
          Create Banner
        </Button>
      </Stack>
    </div>
  );
}
