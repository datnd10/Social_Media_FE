import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "../Story/StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePost from "../CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../redux/post/post.action";
import {
  getAllStoryByFollowing,
  getUserStory,
} from "../../redux/story/story.action";
import { useNavigate } from "react-router-dom";
import CreateStory from "../Story/CreateStory";

const MiddlePart = () => {
  const [open, setOpen] = useState();
  const handelCloseCreatePost = () => setOpen(false);
  const handelOpenCreatePost = () => setOpen(true);

  const [openCreateStory, setOpenStory] = useState();
  const handelCloseCreateStory = () => setOpenStory(false);
  const handelOpenCreateStory = () => setOpenStory(true);

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  const { post, story } = useSelector((state) => state);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  useEffect(() => {
    dispatch(getAllStoryByFollowing());
  }, []);


  const navigate = useNavigate();

  const isUserFollowed = (userId) => {
    return auth.user.followings.includes(userId);
  };

  return (
    <div className="px-20 min-w-[100%] max-w-[100%]">
      <div className="overflow-x-auto">
        <Card className="flex items-center p-5 rounded-b-md overflow-x-auto">
          <div className="flex flex-col items-center mr-4 cursor-pointer" onClick={handelOpenCreateStory}>
            <Avatar sx={{ width: "5rem", height: "5rem" }}>
              <AddIcon sx={{ fontSize: "3rem" }} />
            </Avatar>
            <p>New</p>
          </div>
          {story.stories.map((item) => (
            <div  onClick={
              () => navigate(`/story/${item.id}`) // Call handleClose function
            }>
               <StoryCircle item={item} key={item._id} />
            </div>
          ))}
        </Card>
      </div>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar src={auth?.user?.avatar} />
          <input
            onClick={handelOpenCreatePost}
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border"
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handelOpenCreatePost}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handelOpenCreatePost}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handelOpenCreatePost}>
              <ArticleIcon />
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.posts.map(
          (item) =>
            (item.user.id === auth.user.id || isUserFollowed(item.user.id)) && (
              <PostCard post={item} reload={reload} setReload={setReload} />
            )
        )}
      </div>
      <div>
        <CreatePost
          open={open}
          handleClose={handelCloseCreatePost}
          auth={auth}
        />
        <CreateStory open={openCreateStory} handleClose={handelCloseCreateStory}
          auth={auth}/>
      </div>
    </div>
  );
};

export default MiddlePart;
