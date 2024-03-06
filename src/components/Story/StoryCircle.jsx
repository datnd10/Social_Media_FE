import React, { useEffect } from "react";
import { Avatar } from "@mui/material";

const StoryCircle = ({item}) => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          src={item?.user?.avatar}
        ></Avatar>
        <p>{item?.user?.firstName + " " + item?.user?.lastName}</p>
      </div>
    </div>
  );
};

export default StoryCircle;
