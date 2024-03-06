import { Avatar } from "@mui/material";
import React from "react";

const StoryCard = ({ story }) => {
  return (
    <div className="space-y-5">
      <div className="relative">
        {story.video && (
          <video
            autoPlay
            loop
            muted
            controls
            className="h-[30vh] w-[250px] object-cover"
            src={story.video}
          />
        )}

        {!story.video && (
          <img
            className="h-[30vh] w-[250px] object-cover"
            src={story.image}
            alt="story"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-30 text-white">
          <div>{new Date(story.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
