import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Avatar, Button, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { getAllPost, updatePostByID } from "../../redux/post/post.action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};
const UpdatePost = ({ open, handleClose, auth, updatePost }) => {
  const [selectedImage, setSelectedImage] = useState(updatePost?.image);
  const [selectedVideo, setSelectedVideo] = useState(updatePost?.video);
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch(); 
  
  const handleSelectImage = async (event) => {
    formik.setFieldValue("video", "");
    setSelectedVideo("");
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  };

  const handleSelectVideo = async (event) => {
    formik.setFieldValue("image", "");
    setSelectedImage("");
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
    setSelectedVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };

  const formik = useFormik({
    initialValues: {
      caption: updatePost?.caption || "",
      image: updatePost?.image,
      video: updatePost?.video,
    },
    onSubmit: async (values) => {
      await dispatch(updatePostByID(values,updatePost?.id))
      await dispatch(getAllPost());
      formik.setFieldValue("caption", "");
      formik.setFieldValue("image", "");
      formik.setFieldValue("video", "");
      setSelectedImage("");
      setSelectedVideo("");
      handleClose();
    },
  });

  const closeModal = () => {
    setSelectedImage(updatePost?.image);
    setSelectedVideo(updatePost?.video);
    formik.setFieldValue("image", updatePost?.image);
    formik.setFieldValue("video", updatePost?.video);
    formik.setFieldValue("caption", updatePost?.caption);
    handleClose();
  }

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex justify-between">
                <div className="flex space-x-4 items-center">
                  <Avatar src={auth?.user?.avatar} />
                  <div>
                    <p className="font-bold">
                      {auth?.user?.firstName + " " + auth?.user?.lastName}
                    </p>
                    <p className="text-sm">
                      @{auth?.user?.firstName + " " + auth?.user?.lastName}
                    </p>
                  </div>
                </div>
                <ClearIcon
                  className="cursor-pointer"
                  onClick={closeModal}
                ></ClearIcon>
              </div>
              <textarea
                placeholder="write caption"
                name="caption"
                id=""
                value={formik.values.caption}
                onChange={formik.handleChange}
                rows="4"
                className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm"
              ></textarea>
              <div className="flex space-x-5 items-center mt-5">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-input"
                    onChange={handleSelectImage}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <span>Image</span>
                </div>
                <div>
                  <input
                    type="file"
                    accept="video/*"
                    id="video-input"
                    onChange={handleSelectVideo}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary" component="span">
                      <VideoCameraBackIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>
              {selectedImage && (
                <div>
                  <img src={selectedImage} className="h-[10rem]" alt="" />
                </div>
              )}
              {selectedVideo && (
                <div>
                  <video
                    src={selectedVideo}
                    autoPlay
                    loop
                    muted
                    controls
                    className="h-[15rem] w-full object-cover my-10"
                    alt=""
                  ></video>
                </div>
              )}
              <div className="flex w-full justify-end">
                <Button type="submit" sx={{ borderRadius: "1.5rem" }}>
                  Post
                </Button>
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
    </>
  );
};

export default UpdatePost;
