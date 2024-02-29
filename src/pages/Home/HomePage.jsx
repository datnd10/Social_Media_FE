import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import { Routes, useLocation, Route } from "react-router-dom";

import MiddlePart from "../../components/MiddlePart/MiddlePart";
import Reels from "../../components/Reels/Reels";
import Profile from "../Profile/Profile";
import HomeRight from "../../components/HomeRight/HomeRight";
import { useDispatch, useSelector } from "react-redux";

import { store } from "../../redux/store";
import SuggestPeople from "../../components/MiddlePart/SuggestPeople";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("token");
  const {auth} = useSelector(store => store);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={0} lg={2}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={0} lg={1}>
          <div>
            
          </div>
        </Grid>
        <Grid
          lg={location.pathname === "/" ? 6 : 8}
          item
          className="px-5 flex justify-center"
          xs={12}
        >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/suggestions" element={<SuggestPeople />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>
        {location.pathname === "/" ? (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        ) : <Grid item xs={0} lg={1}>
        <div>
          
        </div>
      </Grid>}
      </Grid>
    </div>
  );
};
export default HomePage;
