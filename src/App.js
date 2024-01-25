import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import Message from "./pages/Message/Message";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { getProfile } from "./redux/auth/auth.action";
function App() {
  const {auth} = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");

  useEffect(() => { 
    dispatch(getProfile(jwt));
  },[jwt])
  
  return (
    <div className="">
      <Routes>
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
