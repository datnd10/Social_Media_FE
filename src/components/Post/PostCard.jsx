import {
  Button,
  Card,
  CardHeader,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deletePost,
  getAllPost,
  getLikePost,
  getSavePost,
} from "../../redux/post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByUser";
import ListUserCard from "../ListUserCard/ListUserCard";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UpdatePost from "../UpdatePost/UpdatePost";
import { isSavedByReqUser } from "../../utils/isSavedByUser";
import { useNavigate } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  createNontification,
  getUserNontification,
} from "../../redux/nontifications/nontification.action";
import { toast } from "react-toastify";

const PostCard = ({ post, reload, setReload }) => {
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  const handleCreateComment = async (content) => {
    const reqData = {
      postId: post.id,
      data: {
        content,
      },
    };
    const data = {
      content: `${
        auth.user.firstName + " " + auth.user.lastName
      } comment on your post`,
    };
    await dispatch(createComment(reqData));
    if (auth.user.id !== post.user.id) {
      await dispatch(
        createNontification(
          data,
          post.id,
          post.user.id,
          sendNotificationToServer
        )
      );
    }
    await dispatch(getAllPost());
  };

  const handleLikePost = async (post) => {
    const data = {
      content: `${
        auth.user.firstName + " " + auth.user.lastName
      } reaction your post`,
    };
    await dispatch(getLikePost(post.id));
    if (auth.user.id !== post.user.id) {
      await dispatch(
        createNontification(
          data,
          post.id,
          post.user.id,
          sendNotificationToServer
        )
      );
    }
    await dispatch(getAllPost());
  };

  const handleSavePost = async (post) => {
    await dispatch(getSavePost(post.id));
    await dispatch(getAllPost());
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const [toUserId, setToUserId] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSetting = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async (postId) => {
    await dispatch(deletePost(postId));
    await dispatch(getAllPost());
  };
  const [openUpdatePost, setOpenUpdatePost] = useState();
  const handelCloseUpdatePost = () => setOpenUpdatePost(false);
  const handelOpenUpdatePost = () => {
    setOpenUpdatePost(true);
  };

  const navigate = useNavigate();
  const [hasConnected, setHasConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sock);

    stomp.connect({}, () => {
      if (!hasConnected) {
        setHasConnected(true);
      }
      console.log("Connected to WebSocket");
      stomp.subscribe(`/user/${post?.user?.id}/notification`, (message) => {
        console.log("Received message:", JSON.parse(message.body));
        let receivedMessage = JSON.parse(message.body);
        console.log(receivedMessage);
        if (auth.user.id === receivedMessage.toUser.id) {
          toast.success(receivedMessage?.content);
        }
      });
    });
    setStompClient(stomp);

    return () => {
      stomp.disconnect();
    };
  }, [hasConnected]); // Empty dependency array to ensure it runs only once

  const sendNotificationToServer = (userId, newMessage) => {
    if (stompClient && newMessage) {
      if (stompClient.connected) {
        // Ensure the connection is established before sending
        stompClient.send(
          `/app/notify/${userId}`,
          {},
          JSON.stringify(newMessage)
        );
      } else {
        console.log("WebSocket connection not established yet.");
      }
    }
  };

  return (
    <Card className="">
      <CardHeader
        avatar={
          <a href={`/profile/${post?.user?.id}`}>
            <Avatar
              src={post?.user?.avatar}
              sx={{ objectFit: "cover" }}
              aria-label="recipe"
            />
          </a>
        }
        action={
          auth?.user?.id === post?.user?.id && (
            <div>
              <Button
                id="basic-button"
                aria-controls={openSetting ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openSetting ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openSetting}
                onClose={handleCloseSetting}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseSetting(); // Call handleClose function
                    handleDeletePost(post.id);
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem onClick={handelOpenUpdatePost}>Update</MenuItem>
              </Menu>
            </div>
          )
        }
        title={
          <div>
            <a href={`/profile/${post?.user?.id}`}>
              {post?.user?.firstName + " " + post?.user?.lastName}
            </a>
            <p className="font-xs text-slate-500">
              {calculateTimeAgo(post?.createdAt)}
            </p>
          </div>
        }
      />
      {post?.image && (
        <CardMedia
          component="img"
          height="200"
          image={post?.image}
          alt="Paella dish"
          sx={{ objectFit: "cover" }}
          className="hover: cursor-pointer"
          onClick={() => navigate(`/detail/post/${post?.id}`)}
        />
      )}
      {post?.video && (
        <video
          src={post?.video}
          autoPlay
          loop
          muted
          controls
          className="w-full max-h-96 cursor-pointer"
          onClick={() => navigate(`/detail/post/${post?.id}`)}
        ></video>
      )}
      <CardContent>
        <div className="flex gap-4">
          <a href={`/profile/${post?.user?.id}`}>
            <Typography variant="body2">
              {post?.user?.firstName + " " + post?.user?.lastName}
            </Typography>
          </a>

          <Typography
            variant="body2"
            color="text.secondary"
            className="hover:cursor-pointer"
            onClick={() => navigate(`/detail/post/${post?.id}`)}
          >
            {post?.caption}
          </Typography>
        </div>

        <div
          color="text.secondary"
          className="mt-2 cursor-pointer"
          onClick={handleOpen}
        >
          {post?.liked.length} likes
        </div>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton
            onClick={() => {
              setToUserId(post.user.id);
              console.log("Updated To User ID:", toUserId);
              handleLikePost(post);
            }}
          >
            {isLikedByReqUser(auth.user.id, post) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton onClick={() => setShowComment(!showComment)}>
            {showComment ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />}
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => handleSavePost(post)}>
            {isSavedByReqUser(auth.user.id, post) ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </div>
      </CardActions>

      {showComment && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar
              src={auth.user.avatar}
              sx={{ height: "3rem", width: "3rem" }}
            />
            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handleCreateComment(e.target.value);
                  e.target.value = "";
                }
              }}
              type="text"
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="write a comment..."
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-5 my-5 text-xs max-h-64 overflow-y-auto">
            {post.comments.map((comment) => (
              <div className="flex items-center space-x-5">
                <a
                  className="flex items-center gap-3 "
                  href={`/profile/${comment.user.id}`}
                >
                  <Avatar
                    src={comment.user.avatar}
                    sx={{ height: "3rem", width: "3rem" }}
                  ></Avatar>
                  <p className="italic font-bold text-cyan-200 text-sm">
                    {`${comment.user.firstName} ${comment.user.lastName}`}
                  </p>
                </a>
                <div className="text-sm">
                  <div>{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <ListUserCard
        open={open}
        handleClose={handleClose}
        title="Likes"
        data={post?.liked}
      />

      <UpdatePost
        open={openUpdatePost}
        handleClose={handelCloseUpdatePost}
        auth={auth}
        updatePost={post}
      />
    </Card>
  );
};

export default PostCard;
