import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/user/user.action";
import { followUser } from "../../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CardHeader } from "@mui/material";

const SuggestPeople = () => {
  const dispatch = useDispatch();

  const { user, auth } = useSelector((store) => store);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getAllUser());
    console.log(user);
  }, [reload]);

  const isUserFollowed = (userId) => {
    return auth.user.followings.includes(userId);
  };

  const sortedUsers = user.listUser
    .slice()
    .sort((a, b) => b.followers.length - a.followers.length);

  const handleFollowUser = (userId) => {
    setReload(!reload);
    dispatch(followUser(userId));
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-screen mt-20 mr-48">
      <div className="flex justify-start text-2xl font-semibold mr-72 my-5">Suggested</div>
      {sortedUsers.map(
        (item) =>
          item.id !== auth.user.id &&
          (isUserFollowed(item.id) ? null : (
            <div key={item.id} className="flex justify-center items-center gap-40 space-y-4">
              <a href={`/profile/${item.id}`}>
                <CardHeader
                  key={item.id}
                  avatar={
                    <Avatar src={item.avatar} aria-label="recipe"></Avatar>
                  }
                  title={item.firstName + " " + item.lastName}
                  subheader="Suggested for you"
                />
              </a>
              <Button size="small" variant="contained" onClick={() => handleFollowUser(item.id)}>
                Follow
              </Button>
            </div>
          ))
      )}
    </div>
  );
};

export default SuggestPeople;