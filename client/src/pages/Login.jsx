import { Link } from "react-router-dom";

const Login = ({
  handleSubmit,
  username,
  password,
  setPassword,
  setUsername,
}) => {
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
        <h5 style={{ fontSize: "24px", textAlign: "center" }}>Login</h5>
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
              Login
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
          <p>Don't have an account?</p>
          <Link to={"/register"} style={{ textDecoration: "none" }}>
            <p>register</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
