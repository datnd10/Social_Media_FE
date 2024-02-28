import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/user/user.action";
import { followUser, unFollowUser } from "../../redux/auth/auth.action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "30vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ListUserCard = ({ open, handleClose, title, data }) => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((store) => store);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    dispatch(getAllUser());
    console.log(auth);
  }, [reload]);

  const isUserFollowed = (userId) => {
    return auth.user.followings.includes(userId);
  };

  const handleFollowUser = (userId) => {
    setReload(!reload);
    dispatch(followUser(userId));
  };

  const handleUnfollowUser = (userId) => {
    setReload(!reload);
    dispatch(unFollowUser(userId));
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      title="Follow"
    >
      <Box sx={style}>
        <div className="flex justify-between border-b-2 border-slate-500">
          <Typography
            variant="h5"
            id="modal-modal-title"
            align="center"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography>
            <ClearIcon
              className="cursor-pointer"
              onClick={handleClose}
            ></ClearIcon>
          </Typography>
        </div>
        {data?.map((item) => (
          <div key={item.id} className="flex justify-between">
            <a href={`/profile/${item.id}`}>
              <CardHeader
                avatar={<Avatar src={item.avatar} aria-label="recipe"></Avatar>}
                title={item.firstName + " " + item.lastName}
              />
            </a>
            {item.id !== auth.user.id &&
              (!isUserFollowed(item.id) ? (
                <Button onClick={() => handleFollowUser(item.id)}>
                  Follow
                </Button>
              ) : (
                <Button onClick={() => handleUnfollowUser(item.id)}>
                  Unfollow
                </Button>
              ))}
          </div>
        ))}
      </Box>
    </Modal>
  );
};

export default ListUserCard;
