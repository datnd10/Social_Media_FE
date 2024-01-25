import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/auth/auth.action";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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

export default function ProfileModal({open, handleClose}) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
  }
  const formik = useFormik({
      initialValues: {
        firstName: auth.user.firstName || "",
        lastName: auth.user.lastName || "",
      },
      onSubmit:(values,) => {
        console.log(values);
        dispatch(updateProfile(values));
      }
      
  })

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
                    <p>Edit Profile</p>
                </div>
                <Button type="submit">Save</Button>
            </div>
            <div>
                <div className="h-[15rem]">
                    <img className="w-full h-full rounded-t-md" src="https://th.bing.com/th/id/R.6e2ad8dfe63e817efebf8ca4c314a504?rik=IJAHeMU1uNAt%2fQ&pid=ImgRaw&r=0" alt="" />
                </div>
                <div className="pl-5">
                    <Avatar className="trasform -translate-y-24" sx={{ width: "10rem", height: "10rem" }} src="https://th.bing.com/th/id/R.6e2ad8dfe63e817efebf8ca4c314a504?rik=IJAHeMU1uNAt%2fQ&pid=ImgRaw&r=0" />
                </div>
            </div>
            <div className="space-y-3">
                <TextField fullWidth id="firstName" name="firstName" defaultValue={auth.user.firstName} label="First Name" value={formik.values.firstName} onChange={formik.handleChange}/> 
                <TextField fullWidth id="lastName" name="lastName" defaultValue={auth.user.lastName} label="Last Name" value={formik.values.lastName} onChange={formik.handleChange}/> 
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
