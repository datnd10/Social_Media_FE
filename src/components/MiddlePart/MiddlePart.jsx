import { Avatar,Card, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "../Post/PostCard";
const story = [11, 1, 1, 1, 1, 1];
const Post = [11, 1, 1, 1, 1, 1];
const MiddlePart = () => {
  const handelOpenCreatePost = () => {
    console.log(1);
  }

  return (
    <div className="px-20">
      <Card className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{ width: "5rem", height: "5rem" }}
            //src='https://th.bing.com/th/id/R.6e2ad8dfe63e817efebf8ca4c314a504?rik=IJAHeMU1uNAt%2fQ&pid=ImgRaw&r=0'
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item) => (
          <StoryCircle />
        ))}
      </Card>
      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar/>
          <input className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border" type="text"/>
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={{handelOpenCreatePost}}>
              <ImageIcon/>
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={{handelOpenCreatePost}}>
              <VideocamIcon/>
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={{handelOpenCreatePost}}>
              <ArticleIcon/>
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {Post.map((item) => (
          <PostCard />
        ))}
      </div>
    </div>
  );
};

export default MiddlePart;
