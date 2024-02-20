import { Card, CardHeader, Divider } from "@mui/material";
import React, { useState } from "react";
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
import { createComment, getLikePost } from "../../redux/post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByUser";
import UserLikePost from "./UserLikePost";
const PostCard = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  const handleCreateComment = (content) => {
    const reqData = {
      postId: post.id,
      data: {
        content,
      },
    };
    dispatch(createComment(reqData));
  };

  const handleLikePost = (post) => {
    dispatch(getLikePost(post.id));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className="">
      <a href={`/profile/${post?.user?.id}`}>
        <CardHeader
          avatar={
            <Avatar
              src={post?.user?.avatar}
              sx={{ objectFit: "cover" }}
              aria-label="recipe"
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post?.user?.firstName + " " + post?.user?.lastName}
        />
      </a>
      <CardMedia
        component="img"
        height="200"
        image={post?.image}
        alt="Paella dish"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <div className="flex gap-4">
          <a href={`/profile/${post?.user?.id}`}>
            <Typography variant="body2">
              {post?.user?.firstName + " " + post?.user?.lastName}
            </Typography>
          </a>

          <Typography variant="body2" color="text.secondary">
            {post?.caption}
          </Typography>
        </div>

        <div color="text.secondary" className="mt-2 cursor-pointer" onClick={handleOpen}>
          {post?.liked.length} likes
        </div>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={() => handleLikePost(post)}>
            {isLikedByReqUser(auth.user.id, post) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={() => setShowComment(!showComment)}>
            {showComment ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />}
          </IconButton>
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
          <div className="mx-3 space-y-5 my-5 text-xs">
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
      <UserLikePost open={open} handleClose={handleClose} likes={post?.liked}/>
    </Card>
  );
};

export default PostCard;
