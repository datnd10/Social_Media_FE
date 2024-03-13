import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReel } from "../../redux/reel/reel.action";
import UserReelCard from "./UserReelCard";
import { Button, Card, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProfileModal from "../../pages/Profile/ProfileModal";
import CreateReelModal from "./CreateReelModal";
const Reels = () => {
  const { reel } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReel());
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleCloseProfileModal = () => setOpen(false);

  return (
    <Card className=" w-[70%]">
        <div className="font-bold text-2xl mt-5 mx-20" onClick={handleOpenProfileModal}>
          <Button startIcon={<AddCircleIcon />} color="primary">
            <Typography variant="contained">Create</Typography>
          </Button>
        </div>

      <div className="rounded-md">
        <div className="flex justify-center">
          <div className="flex justify-center flex-wrap gap-2 my-5">
            {reel.listReel.map((item) => (
              <div key={item.id}>
                <UserReelCard reel={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreateReelModal open={open} handleClose={handleCloseProfileModal} />
    </Card>
  );
};

export default Reels;
