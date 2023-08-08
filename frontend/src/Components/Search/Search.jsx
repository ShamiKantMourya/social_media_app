import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import "./Search.css";
import { getAllUsers } from "../../Services/userService";
import User from "../User/User";

const Search = () => {
  const [userName, setUserName] = useState("");

  const { users, loading } = useSelector((state) => state.allUsersData);
  //   console.log(users);
  const dispatch = useDispatch();

  const searchFormHandler = (event) => {
    event.preventDefault();
    dispatch(getAllUsers(userName));
  };

  return (
    <div className="search-page-container">
      <div className="search-page">
        <Typography className="search-page-text">Harmony_Of_Words</Typography>
        <form className="search-page-form" onSubmit={searchFormHandler}>
          <input
            type="text"
            placeholder="name"
            className="search-page-input"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <button
            disabled={loading}
            type="submit"
            className="search-form-button"
          >
            Search
          </button>

          <div className="searched-user">
            {users &&
              users.map((user) => (
                <div className="searched-user-data">
                  <User
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    location={user.location}
                    avatar={user.avatar.url}
                  />
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
