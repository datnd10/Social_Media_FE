import { Avatar, Button, CardHeader, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../redux/auth/auth.action";
import { deleteReel, getAllReel } from "../../redux/reel/reel.action";
import DeleteIcon from "@mui/icons-material/Delete";
const UserReelCard = ({ reel }) => {
  console.log(reel);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [reload, setReload] = useState(false);


  const handleDeleteReel = (postId) => {
    dispatch(deleteReel(postId));
    setReload(!reload);
  };

  const handleFollowUser = (userId) => {
    setReload(!reload);
    dispatch(followUser(userId));
  };

  const handleUnfollowUser = (userId) => {
    setReload(!reload);
    dispatch(unFollowUser(userId));
  };

  const isUserFollowed = (userId) => {
    return auth.user.followings.includes(userId);
  };

  return (
    <div className="relative space-y-5 min-w-full w-full my-5">
      <video
        autoPlay loop muted controls
        className="w-full min-w-full h-96 object-cover"
        src={reel.video}
      />
      <div className="absolute bottom-12 left-0 right-0 bg-transparent p-4 w-full">
        <div className="text-white">
          <div key={reel.user.id} className="flex gap-2">
            <a
              href={`/profile/${reel.user.id}`}
              className="flex items-center gap-3"
            >
              <Avatar
                src={reel.user.avatar}
                aria-label="recipe"
                className="w-1 h-1"
              ></Avatar>
              <p className="font-semibold">
                {reel.user.firstName + " " + reel.user.lastName}
              </p>
            </a>
            {reel.user.id !== auth.user.id &&
              (!isUserFollowed(reel.user.id) ? (
                <Button onClick={() => handleFollowUser(reel.user.id)}>
                  Follow
                </Button>
              ) : (
                <Button onClick={() => handleUnfollowUser(reel.user.id)}>
                  Unfollow
                </Button>
              ))}
          </div>
          <p className="">{reel.title}</p>
        </div>
      </div>
      {reel.user.id === auth.user.id && (
        <div className="absolute top-0 right-0 bg-transparent p-4">
          <div className="text-white">
            <IconButton onClick={() => handleDeleteReel(reel.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReelCard;
