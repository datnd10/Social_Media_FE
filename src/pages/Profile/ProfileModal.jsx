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

const ProfileModal = ({ open, handleClose }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState();

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const [openBackDrop, setOpenBackDrop] = useState(false);

  const handleFileChange = async (event) => {
    setOpenBackDrop(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    console.log(imageUrl);
    setSelectedImage(imageUrl);
    formik.setFieldValue("avatar", imageUrl);
    setOpenBackDrop(false);
  };

  const initialBio = auth.user.bio
    ? auth.user.bio.replace(/<br\s*\/?>/gi, "\n")
    : "";

  const formik = useFormik({
    initialValues: {
      firstName: auth.user.firstName || "",
      lastName: auth.user.lastName || "",
      avatar:  auth.user.avatar,
      bio: initialBio,
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProfile(values));
      closeModal();
    },
  });

  const closeModal = () => {
    setSelectedImage("");
    formik.setFieldValue("firstName",auth.user.firstName);
    formik.setFieldValue("lastName",auth.user.lastName );
    formik.setFieldValue("avatar", auth.user.avatar);
    formik.setFieldValue("bio",initialBio);
    handleClose();
  }

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
                <IconButton onClick={closeModal}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="pl-5">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    handleFileChange(event);
                    formik.setFieldValue("avatar", selectedImage);
                  }}
                  ref={fileInputRef}
                />
                <Avatar
                  className="my-4"
                  sx={{ width: "10rem", height: "10rem", cursor: "pointer" }}
                  src={selectedImage || auth.user.avatar}
                  inputProps={{ accept: "image/*" }}
                  onClick={handleAvatarClick}
                />
              </div>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                defaultValue={auth.user.firstName}
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                defaultValue={auth.user.lastName}
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              <TextField
                placeholder="Write Bio"
                name="bio"
                id="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                multiline
                rows={4}
                variant="outlined"
                className="w-full mt-5"
              />
            </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
