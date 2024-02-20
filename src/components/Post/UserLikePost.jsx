import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UserLikePost = ({ open, handleClose, likes }) => {
  const navigate = useNavigate();
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
            Likes
          </Typography>
          <Typography>
            <ClearIcon
              className="cursor-pointer"
              onClick={handleClose}
            ></ClearIcon>
          </Typography>
        </div>
        {likes?.map((item) => (
          <div className="flex justify-between">
            <a href={`/profile/${item.id}`}><CardHeader
            avatar={<Avatar src={item.avatar} aria-label="recipe"></Avatar>}
            title={item.firstName + " " + item.lastName}
          /></a>
          <Button>Follow</Button>
          </div>
        ))}
      </Box>
    </Modal>
  );
};

export default UserLikePost;
