import { Avatar, Button, Card } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";

const tabs = [
  {
    value: "post",
    name: "Post",
  },
  {
    value: "reels",
    name: "Reels",
  },
  {
    value: "saved",
    name: "Saved",
  },
  {
    value: "repost",
    name: "Repost",
  },
];

const posts = [1,1,1,1,1];
const reels = [1,1,1,1,1];
const savePost = [1,1,1,1,1];
const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://th.bing.com/th/id/R.6e2ad8dfe63e817efebf8ca4c314a504?rik=IJAHeMU1uNAt%2fQ&pid=ImgRaw&r=0"
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://th.bing.com/th/id/R.6e2ad8dfe63e817efebf8ca4c314a504?rik=IJAHeMU1uNAt%2fQ&pid=ImgRaw&r=0"
          />
          {true ? (
            <Button sx={{ borderRadius: "20px" }} variant="contained">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="contained">
              Follow Button
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">Siuu</h1>
            <p>@ronaldo</p>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>41 post</span>
            <span>41 followers</span>
            <span>41 following</span>
          </div>
        </div>

        <div className="p-5">
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>

        <section>
          <Box sx={{ width: "100%", borderBottom:1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((tab) => (
                <Tab value={tab.value} label={tab.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (<div className="space-y-5 w-[70%] my-10">
              {posts.map((post) => (
                <div className="border border-slate-00 rounded-md">
                    <PostCard />
                </div>
              ))}
            </div>) : value === "reels" ? 
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((reel) => (
                  <UserReelCard />
                ))}
              </div>
            : value === "saved" ? 
            (<div className="space-y-5 w-[70%] my-10">
            {savePost.map((post) => (
              <div className="border border-slate-00 rounded-md">
                  <PostCard />
              </div>
            ))}
          </div>) : value === "repost" ? 
            (<div className="space-y-5 w-[70%] my-10">
              repost
          </div>) : ""}
          </div>
        </section>
      </div>
    </Card>
  );
};

export default Profile;
