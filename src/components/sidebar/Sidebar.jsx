import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import sidebarData from "./sidebarData";
import sidebarLogo from "../../assets/img/logo.png";
import "./sidebar.css";
import { useAuth } from "../../auth/Auth";
import { FiLogOut } from "react-icons/fi";
function Sidebar() {
  const auth = useAuth();
  return (
    <>
      <div id="sidebar">
        <div className="sidebar-content">
          <img
            className="sidebar-logo"
            src={sidebarLogo}
            alt="Sidebar-Logo"
            // width={80}
          />
          {sidebarData.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={`sidebar-menu-item`}
              // className={`sidebar-menu-item ${({ isActive }) =>
              //   isActive ? "greenyellow" : "white"}`}
            >
              {/* <span className="sidebar-menu-item-icon">{item.icon}</span> */}
              <span> {item.title}</span>
            </NavLink>
          ))}
        </div>
        <div className="sidebar-footer">
          <span className="text-sm text-0 ml-2">
            {auth.user?.name?.split(" ")[0]}{" "}
          </span>

          <FiLogOut
            onClick={() => auth?.setLoggedOut()}
            className="cursor-pointer font-bold"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Sidebar;
