import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

const Users = ({ user, success, setSuccess }) => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/user/delete/${userId}`,
        {
          headers: {
            authorization: "Bearer " + user.accessToken,
          },
        }
      );
      setSuccess(res.data);
      console.log(res.data);
      if (user._id === userId) {
        window.localStorage.clear();
      }
      window.location = "/users";
    } catch (error) {
      console.log(error.message);
      setSuccess(false);
    }
  };

  if (user) {
    try {
      useEffect(() => {
        const loadUsers = async () => {
          const res = await axios.get("http://localhost:8000/api/user/users");
          if (res) {
            setUsers(res.data);
          } else {
            console.log("Couldn't get users");
          }
        };
        loadUsers();
      }, []);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div
      style={{
        width: "full",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "20px",
      }}
    >
      <h2>Other Users Working with Our Subscription</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {users < 1 ? (
            <>
              <p style={{ fontSize: "24px", marginTop: "100px" }}>
                You do not have an account
              </p>
            </>
          ) : (
            <>
              {users.map((user, index) => {
                return (
                  <div
                    style={{
                      width: "80%",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "18px",
                    }}
                    key={index}
                  >
                    <p style={{ width: "200px" }}>{user.username}</p>
                    {user.isAdmin ? (
                      <>
                        <p style={{ textAlign: "left", color: "orange" }}>
                          Admin
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        <p style={{ textAlign: "left", color: "grey" }}>User</p>
                      </>
                    )}
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdOutlineDelete size={24} />
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
