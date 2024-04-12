import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = ({ user }) => {
  const handleLogout = async () => {
    try {
      /* await axios.delete(`http://localhost:8000/api/user/delete/${user._id}`, {
        headers: {
          authorization: "Bearer " + user.accessToken,
        },
      }); */
      window.localStorage.clear();
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div style={{ width: "98vw" }}>
      <div
        style={{
          width: "98%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {user !== null && (
          <div
            style={{
              width: "270px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to={"/users"}>
              <button
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  width: "150px",
                  height: "40px",
                  backgroundColor: "blue",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                Other users
              </button>
            </Link>
            <button
              style={{
                marginRight: "10px",
                cursor: "pointer",
                width: "100px",
                height: "40px",
                backgroundColor: "blue",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                color: "white",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          width: "90%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          {user !== null ? (
            <h2>Welcome to {user.username}'s test page</h2>
          ) : (
            <h2 style={{ textAlign: "center" }}>A test page</h2>
          )}
          {user !== null || user === 0 ? (
            <>
              <Link to={"/profile"}>
                <button
                  style={{
                    width: "300px",
                    height: "50px",
                    backgroundColor: "blue",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "18px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {user.username}'s Profile
                </button>
              </Link>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "250px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link to={"/login"}>
                  <button
                    style={{
                      width: "100px",
                      height: "40px",
                      backgroundColor: "blue",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "18px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </button>
                </Link>

                <Link to={"/register"}>
                  <button
                    style={{
                      width: "100px",
                      height: "40px",
                      backgroundColor: "white",
                      border: "1px solid gray",
                      borderRadius: "10px",
                      fontSize: "18px",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Register
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
