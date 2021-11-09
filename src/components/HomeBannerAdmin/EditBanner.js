import { Button, Grid, TextField } from "@mui/material";
import Banner from "./Banner/Banner";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "../../config/axios";

function EditBanner({ bannerInfoEdit, setRerender }) {
  const [editInput, setEditInput] = useState({
    thisisinput: "",
    name: bannerInfoEdit.name,
    link: bannerInfoEdit.link,
    image: bannerInfoEdit.image
  });
  const [editting, setEditting] = useState(false);
  const [previewImg, setPreviewImg] = useState(editInput.image);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const submitBanner = async () => {
      const data = new FormData();
      data.append("name", editInput.name);
      data.append("link", editInput.link);
      data.append("thisisinput", editInput.thisisinput);
      try {
        const resSubmit = await axios.put(
          `/banner/${bannerInfoEdit.id}`,
          data,
          {
            headers: { "content-type": "multipart/form-data" }
          }
        );
        console.log("@#@resSubmit:", resSubmit);
        setRerender((curr) => !curr);
        setEditting(false);
        window.location.reload();
      } catch (error) {
        console.dir(error);
      }
    };
    submitBanner();
  };

  const handleChangeName = (e) => {
    if (editting) {
      setEditInput((curr) => ({
        ...curr,
        name: e.target.value
      }));
    }
  };

  const handleChangeLink = (e) => {
    if (editting) {
      setEditInput((curr) => ({
        ...curr,
        link: e.target.value
      }));
    }
  };

  const handleBtnDelete = async () => {
    if (
      window.confirm(`Are you sure to delete "${bannerInfoEdit.name}" banner?`)
    ) {
      await axios.delete(`/banner/${bannerInfoEdit.id}`);
      console.log("@edit-deleted");
    }
    setRerender((curr) => !curr);
    window.location.reload();
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
          <Typography
            gutterBottom
            variant="h6"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            Banner Information Form
          </Typography>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <Grid container spacing={1}>
              {/* Left-side displaying image */}
              <Grid xs={12} sm={5} item>
                <Grid
                  container
                  spacing={1}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Banner imgLink={previewImg} />
                </Grid>
              </Grid>

              {/* Right-side input form*/}
              <Grid xs={12} sm={7} item>
                <Grid container spacing={1}>
                  {/* # Image-mode */}
                  {editting ? (
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
                          setPreviewImg(URL.createObjectURL(e.target.files[0]));
                          setEditInput((curr) => ({
                            ...curr,
                            thisisinput: e.target.files[0]
                          }));
                        }}
                      />
                    </Grid>
                  ) : (
                    <Grid xs={12} item>
                      <TextField
                        // label="Image link"
                        placeholder="Enter Image link"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        value={editInput.image}
                      />
                    </Grid>
                  )}

                  <Grid xs={12} item>
                    <TextField
                      label="Banner name"
                      placeholder="Enter Banner name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      value={editInput.name}
                      onChange={(e) => handleChangeName(e)}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      // label="Link to"
                      placeholder="Enter Link"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      value={editInput.link}
                      onChange={handleChangeLink}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <CardActions
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {editting ? (
                <>
                  <Grid xs={3} item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
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
                      onClick={() => {
                        setEditting(false);
                        window.location.reload();
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid xs={3} item>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        setEditting(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid xs={3} item>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={handleBtnDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                </>
              )}
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditBanner;
