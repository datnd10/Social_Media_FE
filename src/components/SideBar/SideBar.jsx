import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import { Avatar, Card, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const Sidebar = ({setShowNontification}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const { auth } = useSelector((store) => store);

  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`profile/${auth.user?.id}`);
    } 
    else if (item.title === "Nontifications") {
      console.log(1);
      setShowNontification(true);
    }
    else {
      navigate(item.path);
    }
  };

  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-10 pl-5">
          <div className="items-center">
            <a href="/">
              <span className="logo font-bold text-xl p-3">Dat Social</span>
            </a>
          </div>
          <div className="space-y-10">
            {navigationMenu.map((item) => (
              <div
                onClick={() => handleNavigate(item)}
                className="cursor-pointer flex space-x-3 items-center hover:bg-gray-700 transition-colors p-3"
                key={item.title}
              >
                {item.icon}
                <p className="text-xl">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-10 mt-auto">
          <Divider />
          <div className="pl-5 flex items-center justify-between pt-5">
            <div className="flex items-center space-x-3">
              <Avatar src={auth.user?.avatar} />
              <div>
                <p className="font-bold">
                  {auth.user?.firstName + " " + auth.user?.lastName}
                </p>
                <p className="opacity-70">
                  @{auth.user?.firstName + "_" + auth.user?.lastName}
                </p>
              </div>
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/profile/${auth.user?.id}`);
                  handleClose(); // Call handleClose function
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
