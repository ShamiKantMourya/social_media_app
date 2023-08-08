import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { loadUser } from "./Services/userService";
import HomePage from "./Components/Home/HomePage";
import UserAccount from "./Components/UserAccount/UserAccount";
import CreatePost from "./Components/CreatePost/CreatePost";
import SignUp from "./Components/SignUp/SignUp";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgetPassword from "./Components/Password/ForgetPassword";
import ResetPassword from "./Components/Password/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import Search from "./Components/Search/Search";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <UserAccount /> : <Login />}
        />
        <Route
          path="/newpost"
          element={isAuthenticated ? <CreatePost /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <UserAccount /> : <SignUp />}
        />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />
        <Route
          path="/forget/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgetPassword />}
        />
        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />
        <Route
          path="/search"
          element={isAuthenticated ? <Search /> : <Login />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
