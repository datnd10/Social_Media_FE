import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/auth/auth.action";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useState } from "react";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
  overflow: "scroll-y",
  borderRadius: 3,
};

const CreateReelModal = ({ open, handleClose }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0]);
    setSelectedVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      video:  ""
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProfile(values));
    },
  });

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Create Reel</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="caption"
                name="caption"
                label="Caption"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </div>

            <div className="flex space-x-5 items-center mt-5">
                <div>
                  <input
                    type="file"
                    accept="video/*"
                    id="video-input"
                    onChange={handleSelectVideo}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary">
                      <VideoCameraBackIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateReelModal;
