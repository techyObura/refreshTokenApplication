import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/user/register", {
        username,
        password,
        isAdmin: admin,
      });
      setUser(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        maxHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "60%" }}>
        <h5 style={{ fontSize: "24px", textAlign: "center" }}>Register</h5>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="username" style={{ fontSize: "22px" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              style={{
                outline: "none",
                border: "1px solid pink",
                width: "300px",
                height: "26px",
                padding: "0 5px 0 5px",
                borderRadius: "5px",
                fontSize: "15px",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="password" style={{ fontSize: "22px" }}>
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
              style={{
                outline: "none",
                border: "1px solid pink",
                width: "300px",
                height: "26px",
                padding: "0 5px 0 5px",
                borderRadius: "5px",
                fontSize: "15px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label
              htmlFor="isAdmin"
              style={{ fontSize: "18px", whiteSpace: "nowrap" }}
            >
              Are you an Admin?
            </label>
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              style={{
                outline: "none",
                borderRadius: "5px",
              }}
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <button
              style={{
                background: "blue",
                width: "100%",
                border: "none",
                height: "35px",
                fontSize: "16px",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Register
            </button>
          </div>
        </form>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>Already have an account?</p>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <p>login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
