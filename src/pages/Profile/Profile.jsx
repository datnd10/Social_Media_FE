import { Avatar, Button, Card } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

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

const posts = [1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1, 1];
const savePost = [1, 1, 1, 1, 1];
const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { auth } = useSelector((store) => store);

  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleCloseProfileModal = () => setOpen(false);

  return (
    <Card className=" w-[70%]">
      <div className="rounded-md">
        <div className="px-5 flex justify-around items-start h-[12rem]">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src={auth.user?.avatar}
          />
          <div className="p-5">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="py-1 font-bold text-2xl">
                  {auth.user?.firstName + " " + auth.user?.lastName}
                </h1>
                {true ? (
                  <Button
                    sx={{ borderRadius: "10px" }}
                    variant="contained"
                    onClick={handleOpenProfileModal}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button sx={{ borderRadius: "20px" }} variant="contained">
                    Follow Button
                  </Button>
                )}
              </div>
              <div className="flex gap-5 items-center py-3">
                <span>41 posts</span>
                <span>41 followers</span>
                <span>41 following</span>
              </div>
              <p>@{auth.user?.firstName + "_" + auth.user?.lastName}</p>
            </div>
            <div>
               <div dangerouslySetInnerHTML={{ __html: auth.user?.bio }} />
            </div>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={tab.name}
                  wrapped
                />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-300 rounded-md"
                  >
                    {/* Assuming PostCard component receives post data as props */}
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((reel) => (
                  <div key={reel.id}>
                    {/* Assuming UserReelCard component receives reel data as props */}
                    <UserReelCard reel={reel} />
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {savePost.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-300 rounded-md"
                  >
                    {/* Assuming PostCard component receives post data as props */}
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : value === "repost" ? (
              <div className="space-y-5 w-[70%] my-10">repost</div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>

      <section>
        <ProfileModal open={open} handleClose={handleCloseProfileModal} />
      </section>
    </Card>
    
  );
};

export default Profile;
