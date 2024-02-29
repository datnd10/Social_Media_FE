import { Avatar, Button, CardHeader } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../redux/auth/auth.action";
import { getAllReel } from "../../redux/reel/reel.action";

const UserReelCard = ({ reel }) => {
  console.log(reel);
  const dispatch = useDispatch();
  const {auth} = useSelector(store => store);
  const [reload, setReload] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    dispatch(getAllReel());
  }, [reload]);

  const videoRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleCanPlayThrough = () => {
      // Video has loaded, start playing
      videoElement.play();
    };

    const handleVideoEnd = () => {
      // Video has ended, replay
      videoElement.currentTime = 0; // Set the current time to the beginning
      videoElement.play();
    };

    videoElement.addEventListener("canplaythrough", handleCanPlayThrough);
    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("canplaythrough", handleCanPlayThrough);
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, []); // Only run the effect once, similar to componentDidMount

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
    <div className="relative space-y-5 w-full my-5">
      <video
        ref={videoRef}
        controls={showControls}
        className="w-full h-96"
        src={reel.video}
      />
      <div className="absolute bottom-10 left-0 right-0 bg-transparent p-4">
        <div className="text-white">
          <div key={reel.user.id} className="flex gap-2">
            <a href={`/profile/${reel.user.id}`} className="flex items-center gap-3">  
                <Avatar src={reel.user.avatar} aria-label="recipe" className="w-1 h-1"></Avatar>
                <p className="font-semibold">{reel.user.firstName + " " + reel.user.lastName}</p>
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
    </div>
  );
};

export default UserReelCard;
