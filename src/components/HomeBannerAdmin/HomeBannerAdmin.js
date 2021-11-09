import React, { useEffect, useState } from "react";
import { Button, CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { AppBar, Toolbar } from "@mui/material";
import axios from "../../config/axios";
import CreateBanner from "./CreateBanner";
import EditBanner from "./EditBanner";

function HomeBannerAdmin() {
  const [getBannerArr, setGetBannerArr] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const getBanner = async () => {
      const resGetAll = await axios.get("/banner");
      setGetBannerArr(resGetAll.data.result);
    };
    getBanner();
  }, [rerender]);

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ color: "#03045E", bgcolor: "#ADE8F4" }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            align="center"
            sx={{ width: "100%" }}
          >
            Home Banner Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xlg">
        {getBannerArr.map((item, idx) => (
          <EditBanner
            key={idx}
            bannerInfoEdit={item}
            setGetBannerArr={setGetBannerArr}
            setRerender={setRerender}
          />
        ))}
        {createForm ? (
          <CreateBanner
            setCreateForm={setCreateForm}
            setRerender={setRerender}
          />
        ) : (
          <Card
            sx={{
              minWidth: 275,
              minHeight: 350,
              bgcolor: "",
              marginY: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button>
              <AddIcon fontSize="large" onClick={() => setCreateForm(true)} />
            </Button>
          </Card>
        )}
      </Container>
    </>
  );
}

export default HomeBannerAdmin;
