import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../redux/auth/auth.action";
import { createChat } from "../../redux/message/message.action";
import { useNavigate } from "react-router-dom";

const SearchUserProfile = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);

  const navigate = useNavigate();

  const handleSearchUser = async (e) => {
    console.log(auth);
    setUserName(e.target.value);
    await dispatch(searchUser(e.target.value));
  };
  const handleClick = (id) => {
    navigate(`profile/${id}`);
  };

  return (
    <div className="py-5 relative">
      <input
        type="text"
        className="bg-transparent border border-[#3b4054] outline-none w-full p-2 px-5 py-3 rounded-full"
        placeholder="Search User..."
        onChange={handleSearchUser}
      />
      {userName && (
        <div className="absolute top-full left-0 z-10 border-[#3b4054] p-2 rounded w-full">
          {auth.searchUser.map((user) => {
            if (user.id !== auth.user.id) {
              return (
                <Card key={user.id} className="w-full">
                  <CardHeader
                    onClick={() => {
                      handleClick(user.id);
                      setUserName("");
                    }}
                    avatar={<Avatar src={user.avatar}></Avatar>}
                    title={user.firstName + " " + user.lastName}
                    subheader={user.firstName + " " + user.lastName}
                  />
                </Card>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default SearchUserProfile;
