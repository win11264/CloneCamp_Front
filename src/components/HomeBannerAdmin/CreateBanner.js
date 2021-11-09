import { Button, Grid, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "../../config/axios";

function CreateBanner({ setCreateForm, setRerender }) {
  const [bannerInfo, setBannerInfo] = useState({
    name: "",
    image: "",
    link: "",
    thisisinput: ""
  });

  const handleButtonSave = () => {
    const submitBanner = async () => {
      const data = new FormData();
      data.append("name", bannerInfo.name);
      data.append("link", bannerInfo.link);
      data.append("thisisinput", bannerInfo.thisisinput);

      try {
        const resSubmit = await axios.post("/banner", data, {
          headers: { "content-type": "multipart/form-data" }
        });
        console.log("@#@resSubmit:", resSubmit);
        setRerender((curr) => !curr);
      } catch (error) {
        console.dir(error);
      }
    };
    submitBanner();
    setCreateForm(false);
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 900,
          bgcolor: "",
          marginY: 5,
          marginX: "auto"
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" align="center">
            Banner Information Form
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <label>Banner image: </label>
                    <TextField
                      type="file"
                      placeholder="Enter file"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      onChange={(e) => {
                        setBannerInfo((curr) => ({
                          ...curr,
                          thisisinput: e.target.files[0]
                        }));
                      }}
                    />
                  </Grid>

                  <Grid xs={12} item>
                    <TextField
                      label="Banner name"
                      placeholder="Enter Banner name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      onChange={(e) => {
                        setBannerInfo((curr) => ({
                          ...curr,
                          name: e.target.value
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      label="Link to"
                      placeholder="Enter Link"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      onChange={(e) => {
                        setBannerInfo((curr) => ({
                          ...curr,
                          link: e.target.value
                        }));
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <CardActions
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Grid xs={3} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleButtonSave}
                >
                  Save
                </Button>
              </Grid>
              <Grid xs={3} item>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setCreateForm(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateBanner;
