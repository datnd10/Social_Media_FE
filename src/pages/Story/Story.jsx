import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteStory,
  getAllStoryByFollowing,
  getDetailStory,
  getLikeStory,
  replyStory,
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
import {
  createChat,
  createMessage,
  findChat,
} from "../../redux/message/message.action";
const Story = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { story, auth, message } = useSelector((state) => state);
  const [storyArray, setStoryArray] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetailStory(id));
    dispatch(getAllStoryByFollowing());
    dispatch(watchStory(id));
  }, [id]);

  const [contentReply, setContentReply] = useState("");

  useEffect(() => {
    getStoryToView();
  }, [id]);

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

  const handleLikeStory = async (post) => {
    await dispatch(getLikeStory(post.id));
    await dispatch(getAllStoryByFollowing());
  };

  const handleDeleteStory = async (id) => {
    await dispatch(deleteStory(id));
    await dispatch(getAllStoryByFollowing());
    handleNextStory();
    
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getStoryToView = () => {
    const data = story.stories.map((item) => item.id);
    setStoryArray(data);
  };

  const checkNextStory = () => {
    const index = storyArray.findIndex((item) => item == id);
    if (index < storyArray.length - 1) {
      return true;
    }
    return false;
  };

  const checPrevious = () => {
    const index = storyArray.findIndex((item) => item == id);
    if (index > 0) {
      return true;
    }
    return false;
  };

  const handleNextStory = () => {
    const index = storyArray.findIndex((item) => item == id);
    if (index < storyArray.length - 1) {
      navigate(`/story/${storyArray[index + 1]}`);
    }
    else {
      navigate('/');
    }
  };

  const handlePreviousStory = () => {
    const index = storyArray.findIndex((item) => item == id);
    console.log(index);
    if (index > 0) {
      navigate(`/story/${storyArray[index - 1]}`);
    }
  };

  const handleCreateMessage = () => {
    dispatch(createChat({ userId: story?.story?.user?.id }));
    dispatch(findChat({ userId: story?.story?.user?.id }));

    const messageReq = {
      content: contentReply,
    };
    dispatch(replyStory(id, message?.chat?.id, messageReq));
    setContentReply("");
  };

  const [openReact, setOpenReact] = React.useState(false);
  const handleOpenReact = () => setOpenReact(true);
  const handleCloseReact = () => setOpenReact(false);
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
              {story?.story?.user?.id != auth?.user?.id && (
                <CardActions
                  className="flex justify-between absolute bottom-0 left-0 right-0"
                  disableSpacing
                >
                  <div className="min-w-full">
                    <input
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleCreateMessage();
                        }
                      }}
                      type="text"
                      className="bg-transparent border border-[#3b40544] rounded-full w-[93%] py-2 px-5"
                      placeholder="Type a message"
                      value={contentReply}
                      onChange={(e) => setContentReply(e.target.value)}
                    />

                    <IconButton onClick={() => handleLikeStory(story.story)}>
                      {isReactStoryByReqUser(auth.user.id, story.story) ? (
                        <FavoriteIcon fontSize="large" />
                      ) : (
                        <FavoriteBorderIcon fontSize="large" />
                      )}
                    </IconButton>
                  </div>
                </CardActions>
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

export default Story;
