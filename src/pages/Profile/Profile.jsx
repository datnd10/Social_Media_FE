import { Avatar, Button, Card } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import {
  getSavePost,
  getUserSavePost,
  getUsersPost,
} from "../../redux/post/post.action";
import {
  followUser,
  getUserbyId,
  unFollowUser,
} from "../../redux/auth/auth.action";
import ListUserCard from "../../components/ListUserCard/ListUserCard";
import ListUserFollow from "../../components/ListUserCard/ListUserFollow";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import { getUsersReel } from "../../redux/reel/reel.action";
import { getUserStory } from "../../redux/story/story.action";
import StoryCard from "../../components/Story/StoryCard";
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
    value: "archive",
    name: "Archive",
  },
];

const reels = [1, 1, 1, 1, 1];
const savePost = [1, 1, 1, 1, 1];
const Profile = () => {
  const { post, auth, reel, story } = useSelector((store) => store);
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("post");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserbyId(id));
  }, [id]);

  useEffect(() => {
    dispatch(getUsersPost(id));
  }, [id, post.newComment]);

  useEffect(() => {
    dispatch(getUsersReel(id));
    dispatch(getUserStory(id));
    dispatch(getUserSavePost(id));
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFollowUser = async (userId) => {
    await dispatch(followUser(userId));
    await dispatch(getUserbyId(id));
  };

  const handleUnfollowUser = async (userId) => {
    await dispatch(unFollowUser(userId));
    await dispatch(getUserbyId(id));
  };

  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleCloseProfileModal = () => setOpen(false);

  const [openFollowers, setOpenFollowers] = useState(false);
  const handleOpenFollowers = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);

  const [openFollowings, setOpenFollowings] = useState(false);
  const handleOpenFollowings = () => setOpenFollowings(true);
  const handleCloseFollowings = () => setOpenFollowings(false);


  return (
    <Card className=" w-[70%]">
      <div className="rounded-md">
        <div className="px-5 flex justify-around items-start h-[12rem]">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src={
              id !== auth.user?.id ? auth.profile?.avatar : auth.user?.avatar
            }
          />
          <div className="p-5">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="py-1 font-bold text-2xl pr-5">
                  {id !== auth.user?.id
                    ? auth.profile?.firstName + " " + auth.profile?.lastName
                    : auth.user?.firstName + " " + auth.user?.lastName}
                </h1>
                {auth.user?.id ===
                (id !== auth.user?.id ? auth.profile?.id : auth.user?.id) ? (
                  <Button
                    sx={{ borderRadius: "10px" }}
                    variant="contained"
                    onClick={handleOpenProfileModal}
                    className="mx-5"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    {auth.profile?.followers.includes(auth?.user?.id) ? (
                      <Button
                        sx={{ borderRadius: "10px" }}
                        variant="contained"
                        onClick={() => handleUnfollowUser(id)}
                        className="mx-5"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      // Nếu chưa follow, hiển thị nút Follow
                      <Button
                        sx={{ borderRadius: "10px" }}
                        variant="contained"
                        onClick={() => handleFollowUser(id)}
                      >
                        Follow
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-5 items-center py-3">
                <span>{post.posts.length} posts</span>
                <span
                  onClick={handleOpenFollowers}
                  className="hover:cursor-pointer"
                >
                  {id !== auth.user?.id
                    ? auth.profile?.followers?.length || 0
                    : auth.user?.followers?.length || 0}{" "}
                  followers
                </span>
                <span
                  onClick={handleOpenFollowings}
                  className="hover:cursor-pointer"
                >
                  {id !== auth.user?.id
                    ? auth.profile?.followings?.length || 0
                    : auth.user?.followings?.length || 0}{" "}
                  following
                </span>
              </div>
              <p>
                @
                {id !== auth.user?.id
                  ? auth.profile?.firstName + "_" + auth.profile?.lastName
                  : auth.user?.firstName + "_" + auth.user?.lastName}
              </p>
            </div>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    id !== auth.user?.id ? auth.profile?.bio : auth.user?.bio,
                }}
              />
            </div>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <div className="flex justify-center">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                className="flex justify-center"
              >
                {auth?.user?.id === auth?.profile?.id
                  ? tabs.map((tab, index) => (
                      <Tab
                        key={tab.value}
                        value={tab.value}
                        label={tab.name}
                        wrapped
                      />
                    ))
                  : tabs.map((tab, index) => {
                      if (tab.value !== "archive") {
                        return (
                          <Tab
                            key={tab.value}
                            value={tab.value}
                            label={tab.name}
                            wrapped
                          />
                        );
                      }
                      return null; // or handle the case when the condition is not met
                    })}
              </Tabs>
            </div>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.length > 0 && post.posts.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-300 rounded-md"
                  >
                    <PostCard post={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reel?.userReel?.length > 0 && reel.userReel.map((item) => (
                  <div key={item.id}>
                    <UserReelCard reel={item} />
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post?.savePost.length > 0 && post?.savePost.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-300 rounded-md"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : value === "archive" ? (
              <div className="w-[80%] my-10 flex gap-2">
                {story.userStory.length > 0 && story.userStory.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-300 rounded-md hover:cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/archive/user/${auth.profile?.id}/story/${item.id}`
                      )
                    }
                  >
                    <StoryCard story={item} />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleCloseProfileModal} />
        <ListUserFollow
          open={openFollowers}
          handleClose={handleCloseFollowers}
          title="Followers"
          data={
            id !== auth.user?.id
              ? auth.profile?.followers
              : auth.user?.followers
          }
        />

        <ListUserFollow
          open={openFollowings}
          handleClose={handleCloseFollowings}
          title="Followings"
          data={
            id !== auth.user?.id
              ? auth.profile?.followings
              : auth.user?.followings
          }
        />
      </section>
    </Card>
  );
};

export default Profile;
