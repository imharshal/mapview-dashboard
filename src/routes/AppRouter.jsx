import { Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./../pages/Homepage";
import MapViewPage from "./../pages/MapViewPage";
import MapCurrentLocation from "./../components/mapview/MapCurrentLocation";
import Login from "../pages/Login";
import Sidebar from "../components/sidebar/Sidebar";
import Register from "../pages/Register";
import RequireAuth from "./RequireAuth";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Sidebar />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/mapview" element={<MapViewPage />} />
          <Route path="/mapview/:id" element={<MapCurrentLocation />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
