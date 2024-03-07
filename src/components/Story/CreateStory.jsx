import { useFormik } from "formik";
import { Avatar, Box, Button, IconButton, Modal } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { createStory } from "../../redux/story/story.action";
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

const CreateStory = ({ open, handleClose, auth }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
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
      image: "",
      video: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(createStory(values));
      formik.setFieldValue("image", "");
      formik.setFieldValue("video", "");
      setSelectedImage("");
      setSelectedVideo("");
      handleClose();
    },
  });

  const clearInput = () => {
    formik.setFieldValue("image", "");
    formik.setFieldValue("video", "");
    setSelectedImage("");
    setSelectedVideo("");
  };

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
              <div className="flex justify-end">
                <ClearIcon
                  className="cursor-pointer"
                  onClick={() => {
                    clearInput();
                    handleClose();
                  }}
                ></ClearIcon>
              </div>
              <div className="flex space-x-5 justify-center items-center mt-5">
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
                  <img
                    src={selectedImage}
                    className="h-[15rem] w-full object-cover my-10"
                    alt=""
                  />
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
                    className="h-[10rem] w-full object-cover my-10"
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

export default CreateStory;
