import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNontification,
  getUserNontification,
  watchNontification,
} from "../../redux/nontifications/nontification.action";
import DeleteIcon from "@mui/icons-material/Delete";
import { WATCH_NONTIFICATION_SUCCESS } from "../../redux/nontifications/nontification.actionType";
import { useNavigate } from "react-router-dom";
const ListNontification = ({ setShowNontification }) => {
  const dispatch = useDispatch();
  const { nontification } = useSelector((state) => state);

  const navigate = useNavigate();
  const getNontification = () => {
    dispatch(getUserNontification());
  };

  useEffect(() => {
    getNontification();
  }, []);

  function calculateTimeAgo(createdAt) {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);

    const timeDifference = currentDate - createdAtDate;

    // Calculate time units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Determine the appropriate unit of time to display
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  }

  const handleSeenNontification = (id) => {
    dispatch(watchNontification(id));
    setShowNontification(false)
    navigate(`/detail/post/${id}`);
  }

  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div>
        <div className="flex text-2xl font-semibold items-center justify-between my-7 px-2">
          <p>Nontifications</p>
          <CloseIcon
            onClick={() => setShowNontification(false)}
            className="hover:cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          {nontification?.nontifications?.length > 0 && nontification?.nontifications?.map((item, index) => (
            <div key={index}>
              <CardHeader
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: !item.isRead ? "#7986cb" : "#3949ab",
                }}
                onClick={() => handleSeenNontification(item.id)}
                avatar={
                  <Avatar
                    src={item?.fromUser?.avatar}
                    aria-label="recipe"
                  ></Avatar>
                }
                title={
                  <div className="flex gap-5">
                    <div>
                      <span style={{ marginRight: "5px" }}>
                        {item?.fromUser?.firstName +
                          " " +
                          item?.fromUser?.lastName}
                      </span>
                      <span>{item?.content} </span>
                      <span className="text-gray-400 italic">
                        {calculateTimeAgo(item.createdAt)}
                      </span>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ListNontification;
