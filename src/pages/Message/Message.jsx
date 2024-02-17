import { Avatar, Backdrop, Grid, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/SearchUser/SearchUser";
import "./Message.css";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../redux/message/message.action";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import CircularProgress from '@mui/material/CircularProgress';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const Message = () => {
  const { message, auth } = useSelector((store) => store);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [currentChat, setCurrentChat] = useState();
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({message, sendMessageToServer}));
  };

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };
  
  useEffect(() => {
      setMessages([...messages, message.messages]);
      console.log(message);
  },[message.messages])

  const [stomClient, setStomClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sock);
    setStomClient(stomp);

    stomp.connect({}, onConnect, onErr);
  },[])

  const onConnect = () => {
    console.log("WebSocket connected...");
  }

  const onErr = (err) => {
    console.log("WebSocket error: ", err);
  }

  useEffect(() => {
    if(stomClient && auth.user && currentChat) {
      const subscription = stomClient.subscribe(`/user/${currentChat.id}/private`, onMessageReceived);
      return () => {
        subscription.unsubscribe();
      }
    }
  })

  const sendMessageToServer = (newMessage) => {
    if(stomClient && newMessage) {
      stomClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(newMessage));
    }
  }

  const onMessageReceived = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log("Message received...", receivedMessage);
    setMessages([...messages, receivedMessage]);
  }

  useEffect(() => {
    if(chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[messages])

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>

              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message.chats.map((item) => (
                    <div
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? 
            <div>
            <div className="flex justify-between items-center border-l p-5">
              <div className="flex items-center space-x-3">
                <Avatar src="https://images.pexels.com/photos/18269258/pexels-photo-18269258/free-photo-of-woman-with-black-hair-in-shirt.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
                <p>{auth.user?.id===currentChat.users[0].id?currentChat.users[1].firstName + " " + currentChat.users[1].lastName:currentChat.users[0].firstName + " " + currentChat.users[0].lastName}</p>
              </div>
              <div className="flex space-x-3">
                <IconButton>
                  <AddIcCallIcon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </div>
            </div>
            <div ref={chatContainerRef} className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
              {messages.map((item) => (
                <ChatMessage message={item} />
              ))}
            </div>
            <div className="sticky bottom-0 border-l ">
            {selectedImage && <img src={selectedImage} alt="avatar" className="w-[5rem] h-[5rem] object-cover px-2"/>}
              <div className="py-5 flex items-center justify-center space-x-5">
                <input
                onKeyPress={(e) => {
                  if(e.key === "Enter" && e.target.value) {
                    handleCreateMessage(e.target.value);
                    setSelectedImage("");
                  }
                }}
                  type="text"
                  className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                  placeholder="Type a message"
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    className="hidden"
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <AddPhotoAlternateIcon />
                  </label>
                </div>
              </div>
            </div>
          </div> : <div className="h-full space-y-5 flex flex-col items-center justify-center">
            <ChatBubbleOutlineIcon sx={{ fontSize: "5rem" }} />
            <p className="text-xl font-semibold">No chat selected</p>
          </div>
          }
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
