import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import axios from "axios";
import Users from "./pages/Users";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);

  const db = "myDatabase";
  const localUser = JSON.parse(localStorage.getItem(db));

  const items = user === null ? localUser : user;

  const refreshToken = async () => {
    if (user.accessToken) {
      try {
        const res = await axios.post("http://localhost:8000/api/user/refresh", {
          token: user.refreshToken,
        });
        const newUser = {
          _id: user._id,
          username: user.username,
          isAdmin: isAdmin,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };
        setUser(newUser);

        localStorage.setItem(db, JSON.stringify(newUser));
        return res.data;
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(user.accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();

        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/user/login", {
        username,
        password,
      });

      try {
        setUser(res.data);
        localStorage.setItem(db, JSON.stringify(res.data));
      } catch (error) {
        console.log(error.message);
      }
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage user={items} />} />
        <Route
          path="/login"
          element={
            <Login
              handleSubmit={handleSubmit}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route path="/register" element={<Register axios={axiosJWT} />} />
        <Route path="/profile" element={<Profile user={items} />} />
        <Route
          path="/users"
          element={
            <Users user={items} success={success} setSuccess={setSuccess} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
