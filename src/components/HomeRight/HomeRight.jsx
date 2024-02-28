import React, { useEffect, useState } from "react";
import SearchUser from "../SearchUser/SearchUser";
import { Avatar, Button, Card, CardHeader } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/user/user.action";
import { followUser, unFollowUser } from "../../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";

const popularUser = [1, 1, 1, 1];
const HomeRight = () => {

  const dispatch = useDispatch();

  const {user, auth} = useSelector(store => store);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getAllUser());
    console.log(user);
  },[reload])

  const isUserFollowed = (userId) => {
    return auth.user.followings.includes(userId);
  };

  const sortedUsers = user.listUser.slice().sort((a, b) => b.followers.length - a.followers.length);

  const handleFollowUser = (userId) => {
    setReload(!reload);
    dispatch(followUser(userId));
  };

  const navigate = useNavigate();

  return (
    <div className="pr-5">
      <SearchUser />
      <Card className="p-5 bg-white">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for</p>
          <p className="text-xs font-semibold opacity-70 hover:cursor-pointer" onClick={() => navigate("/suggestions")}>View All</p>
        </div>

        <div>
        {sortedUsers.map(
            (item, index) =>
              item.id !== auth.user.id && index < 5 &&
              (isUserFollowed(item.id) ? null : (
                <div key={item.id} className="flex justify-between">
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
                  <Button size="small" onClick={() => handleFollowUser(item.id)}>Follow</Button>
                </div>
              ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
