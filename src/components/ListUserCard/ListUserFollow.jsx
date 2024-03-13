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
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/user/user.action";
import { followUser, unFollowUser } from "../../redux/auth/auth.action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "60vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ListUserFollow = ({ open, handleClose, title, data }) => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((store) => store);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const isUserFollowed = (userId) => {
    return auth.user.followings.includes(userId);
  };

  const handleFollowUser = async (userId) => {
    await dispatch(followUser(userId));
  };

  const handleUnfollowUser = async (userId) => {
    await dispatch(unFollowUser(userId));
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
        {data?.map((item) =>
          user.listUser.map((user) => {
            if (user.id === item) {
              return (
                <div key={user.id} className="flex justify-between">
                  <a href={`/profile/${user.id}`}>
                    <CardHeader
                      avatar={
                        <Avatar src={user.avatar} aria-label="recipe"></Avatar>
                      }
                      title={user.firstName + " " + user.lastName}
                    />
                  </a>
                  {user.id !== auth.user.id &&
                    (!isUserFollowed(user.id) ? (
                      <Button onClick={() => handleFollowUser(user.id)}>Follow</Button>
                    ) : (
                      <Button onClick={() => handleUnfollowUser(user.id)}>Unfollow</Button>
                    ))}
                </div>
              );
            }
            return null; // Make sure to return something in case there is no match
          })
        )}
      </Box>
    </Modal>
  );
};

export default ListUserFollow;
