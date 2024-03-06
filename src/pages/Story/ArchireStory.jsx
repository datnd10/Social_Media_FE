import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteStory,
  getAllStoryByFollowing,
  getDetailStory,
  getLikeStory,
  getUserStory,
  watchStory,
} from "../../redux/story/story.action";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isReactStoryByReqUser } from "../../utils/isReactStoryByUser";
import ListUserCard from "../../components/ListUserCard/ListUserCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const ArchiveStory = () => {
  const { userId, storyId } = useParams();
  // Bây giờ userId và storyId chứa giá trị từ URL
  const dispatch = useDispatch();
  const { story, auth } = useSelector((state) => state);
  const [storyArray, setStoryArray] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetailStory(storyId));
    dispatch(getUserStory(userId));
    dispatch(watchStory(storyId));
  }, [storyId]);

  useEffect(() => {
    getStoryToView();
  }, [storyId, story.story]);
  const calculateTimeAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - createdDate;

    // Convert time difference to appropriate units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const handleLikeStory = (post) => {
    dispatch(getLikeStory(post.id));
  };

  const handleDeleteStory = (id) => {
    dispatch(deleteStory(id));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openReact, setOpenReact] = React.useState(false);
  const handleOpenReact = () => setOpenReact(true);
  const handleCloseReact = () => setOpenReact(false);

  const getStoryToView = () => {
    const data = story.userStory.map((item) => item.id);
    setStoryArray(data);
  };

  const checkNextStory = () => {
    const index = storyArray.findIndex((item) => item == storyId);
    if (index < storyArray.length - 1) {
      return true;
    }
    return false;
  };

  const checPrevious = () => {
    const index = storyArray.findIndex((item) => item == storyId);
    if (index > 0) {
      return true;
    }
    return false;
  };

  const handleNextStory = () => {
    const index = storyArray.findIndex((item) => item == storyId);
    console.log(index);
    if (index < storyArray.length - 1) {
      navigate(`/archive/user/${userId}/story/${storyArray[index + 1]}`);
    }
  };

  const handlePreviousStory = () => {
    const index = storyArray.findIndex((item) => item == storyId);
    console.log(index);
    if (index > 0) {
      navigate(`/archive/user/${userId}/story/${storyArray[index - 1]}`);
    }
  };

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50 milliseconds
    const steps = duration / interval;
    let count = 0;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        count += 1;
        if (count >= steps) {
          clearInterval(timer);
          handleNextStory();
          setProgress(0); // Làm mới giá trị của progress khi hoàn thành
          return 0;
        }
        const diff = (100 / steps) * count;
        return Math.min(diff, 100);
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [handleNextStory]);

  return (
    <div className="flex items-center gap-10">
      {checPrevious() && (
        <ArrowBackIcon
          className="hover:cursor-pointer flex-shrink-0"
          fontSize="large"
          onClick={handlePreviousStory}
        />
      )}
      <div className="flex-shrink-0">
        <Card>
          <CardHeader
            avatar={
              <a href={`/profile/${story?.user?.id}`}>
                <Avatar
                  src={story.story?.user?.avatar}
                  sx={{ objectFit: "cover" }}
                  aria-label="recipe"
                />
              </a>
            }
            action={
              auth?.user?.id === story.story?.user?.id && (
                <div>
                  <Button
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={() => {
                      handleDeleteStory(story.story.id);
                    }}
                  >
                    <DeleteIcon className="text-white" />
                  </Button>
                </div>
              )
            }
            title={
              <div>
                <a href={`/profile/${story.story?.user?.id}`}>
                  {story.story?.user?.firstName +
                    " " +
                    story.story?.user?.lastName}
                </a>
                <p className="font-xs text-slate-500">
                  {calculateTimeAgo(story.story?.createdAt)}
                </p>
              </div>
            }
          />

          {story.story?.image && (
            <div>
              <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <img
                src={story.story?.image}
                className="h-[90vh] w-[800px] object-cover"
                alt=""
              />
            </div>
          )}
          {story.story?.video && (
            <video
              src={story.story?.video}
              autoPlay
              loop
              muted
              controls
              className="h-[90vh] w-[800px] object-cover"
            ></video>
          )}
          {story?.story?.user?.id == auth?.user?.id && (
            <div className="flex gap-3">
              <div className="p-3 hover:cursor-pointer font-medium" onClick={handleOpen}>
                {story?.story?.watchedBy.length} views
              </div>
              <div className="p-3 hover:cursor-pointer font-medium" onClick={handleOpenReact}>
                {story?.story?.likes.length} react
              </div>
            </div>
          )}
          <ListUserCard
            open={open}
            handleClose={handleClose}
            title="Views"
            data={story?.story?.watchedBy}
          />
          <ListUserCard
            open={openReact}
            handleClose={handleCloseReact}
            title="Reacts"
            data={story?.story?.likes}
          />
        </Card>
      </div>
      {checkNextStory() && (
        <ArrowForwardIcon
          className="hover:cursor-pointer flex-shrink-0"
          fontSize="large"
          onClick={handleNextStory}
        />
      )}
    </div>
  );
};

export default ArchiveStory;
