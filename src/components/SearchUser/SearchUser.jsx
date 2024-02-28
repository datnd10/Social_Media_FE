import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../redux/auth/auth.action";
import { createChat } from "../../redux/message/message.action";

const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);

  const handleSearchUser = (e) => {
    setUserName(e.target.value);
    dispatch(searchUser(userName));
  };
  const handleClick = (id) => {
    dispatch(createChat({ userId: id }));
  };

  return (
    <div className="py-5 relative">
      <input
        type="text"
        className="bg-transparent border border-[#3b4054] outline-none w-full p-2 px-5 py-3 rounded-full"
        placeholder="Search User..."
        onChange={handleSearchUser}
      />
      {userName &&
        auth.searchUser.map((user) => (
          <Card
            key={user.id}
            className="absolute w-full z-10 top-[4.5rem] cursor-pointer"
          >
            <CardHeader
              onClick={() => {
                handleClick(user.id);
                setUserName("");
              }}
              avatar={
                <Avatar src={user.avatar}></Avatar>
              }
              title= {user.firstName + " " + user.lastName}
              subheader= {user.firstName + " " + user.lastName}
            />
          </Card>
        ))}
    </div>
  );
};

export default SearchUser;
