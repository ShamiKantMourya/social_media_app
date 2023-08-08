import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Chat,
  ChatOutlined,
  Add,
  AddOutlined,
  // SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
  Notifications,
  NotificationsOutlined,
  Home,
  HomeOutlined,
  Menu,
  // MenuOutlined,
} from "@mui/icons-material";

// import IMAGES from '../Image/image';
import "./Header.css";

const Header = () => {
  const [displayNav, setDisplayNav] = useState(false);
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <>
      <div className="header">
        <div className="header-logo">
          <p className="header-logo-text">
           <Link to= "/">
           <span>H</span>armony_Of_Words
           </Link>
          </p>
        </div>
        <div
          className={
            displayNav
              ? "header-icons  mobileView-header-icons"
              : "header-icons"
          }
        >
          <Link
            to="/"
            onClick={() => {
              setTab("/");
              setDisplayNav(!displayNav);
            }}
          >
            {tab === "/" ? <Home /> : <HomeOutlined />}
          </Link>
          <Link
            to="/newpost"
            onClick={() => {
              setTab("/newpost");
              setDisplayNav(!displayNav);
            }}
          >
            {tab === "/newpost" ? <Add /> : <AddOutlined />}
          </Link>
          {/* <Link
            to="/chat"
            onClick={() => {
              setTab("/chat");
              setDisplayNav(!displayNav);
            }}
          >
            {tab === "/chat" ? <Chat /> : <ChatOutlined />}
          </Link>
          <Link
            to="/notification"
            onClick={() => {
              setTab("/notification");
              setDisplayNav(!displayNav);
            }}
          >
            {tab === "/notification" ? (
              <Notifications />
            ) : (
              <NotificationsOutlined />
            )}
          </Link> */}
          <Link
            to="/account"
            onClick={() => {
              setTab("/account");
              setDisplayNav(!displayNav);
            }}
          >
            {tab === "/account" ? <AccountCircle /> : <AccountCircleOutlined />}
          </Link>
          <Link
            to="/search"
            onClick={() => {
              setTab("/search");
              setDisplayNav(!displayNav);
            }}
          >
            <button className="search-btn">
              <Search />
            </button>
          </Link>
        </div>
        {/* Hamburger menu */}
        <div className="hamburger-icon">
          <button
            className="menu-btn"
            onClick={() => setDisplayNav(!displayNav)}
          >
            <Menu />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
