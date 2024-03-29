import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import Message from "./pages/Message/Message";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { getProfile } from "./redux/auth/auth.action";
import { getAllPost } from "./redux/post/post.action";
import { ThemeProvider } from "@mui/material";
import { DarkTheme } from "./Theme/DarkTheme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {auth} = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");

  useEffect(() => { 
    dispatch(getProfile(jwt));
  },[jwt])


  
  return (
    <ThemeProvider theme={DarkTheme}>
      <Routes>
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
