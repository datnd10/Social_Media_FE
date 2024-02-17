import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({message}) => {
  const{auth} = useSelector(store => store);
  const isReqUserMessage = auth.user?.id === message.user?.id
  return (
    <div className={`flex ${!isReqUserMessage ? "justify-start" : "justify-end"} text-white`}>
      <div className={`p-1 ${message.image ? "rounded-md" : "px-5 rounded-full"} bg-[#191c29]`}>
        {message.image && <img className="w-[12rem] h-[17rem] object-cover rounded-md" alt="avatar" src={message.image}/>}
        <p className={`${true ? "py-2" : "py-1"}`}>{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
