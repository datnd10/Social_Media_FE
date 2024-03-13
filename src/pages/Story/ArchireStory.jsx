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
  }, [storyId]);
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

  const handleDeleteStory = async (id) => {
    await dispatch(deleteStory(id));
    await dispatch(getStoryToView());
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
          {story.story?.image && (
            <div className="relative">
              <img
                src={story.story?.image}
                className="h-[100vh] w-[800px] object-cover"
                alt=""
              />
              <div className="absolute top-0 left-0 right-0 p-3 flex flex-col items-start">
                <div className="flex justify-between items-center w-full mb-2">
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
                    title={
                      <div>
                        <a
                          href={`/profile/${story.story?.user?.id}`}
                          className="font-bold"
                        >
                          {story.story?.user?.firstName +
                            " " +
                            story.story?.user?.lastName}
                        </a>
                        <p className="font-xs text-gray-100 font-bold">
                          {calculateTimeAgo(story.story?.createdAt)}
                        </p>
                      </div>
                    }
                  />
                  {auth?.user?.id === story.story?.user?.id && (
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
                  )}
                </div>
              </div>
              {story?.story?.user?.id == auth?.user?.id && (
                <div className="flex gap-3 absolute bottom-0 left-0 right-0 font-bold">
                  <div
                    className="p-3 hover:cursor-pointer font-bold"
                    onClick={handleOpen}
                  >
                    {story?.story?.watchedBy.length} views
                  </div>
                  <div
                    className="p-3 hover:cursor-pointer font-bold"
                    onClick={handleOpenReact}
                  >
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
            </div>
          )}
          {/* ... (Rest of your content) */}
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
