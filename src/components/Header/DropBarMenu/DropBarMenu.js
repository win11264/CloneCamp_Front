import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import John from "../../../public/images/john.jpg";
import { useHistory } from "react-router";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { removeToken } from "../../../services/localStorage";
import { UserContext } from "../../../contexts/userContext";
import { TogglePageContext } from "../../../contexts/togglePageContext";
function DropBarMenu({ setOpen }) {
  const { setAlignmentHistory } = useContext(TogglePageContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser, toggle, setToggle } = useContext(AuthContext);
  const { userById } = useContext(UserContext);
  const history = useHistory();
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickLogout = () => {
    setUser(null);
    removeToken();
    // setRole('guest');
    // history.push('/');
    setToggle(current => !current);
    setOpen(current => !current);

    // console.log('user after logout:', user);
    window.location.reload();
    history.push("/");
    //delete cookie when logout
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log('userById2', userById.profileImage);
  return (
    <>
      <Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="User Menu">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar
                sx={{ width: 43, height: 43 }}
                src={userById.profileImage}
              ></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              history.push({
                pathname: `/my-profile`,
                state: {
                  alignmentHistory: "myProfile",
                },
              });
            }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push({
                pathname: `/my-profile`,
                state: {
                  alignmentHistory: "dashboard",
                  alignmentDashboard: "2",
                },
              });
            }}
          >
            My Course
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClickLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Fragment>
    </>
  );
}

export default DropBarMenu;
