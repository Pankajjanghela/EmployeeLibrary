import { useState } from "react";
import "../CSS/Login.css";

function Login({ setIsLoggedIn }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {

      setError(
        "Please enter username and password."
      );

      return;
    }

    if (
      username.trim() === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "libraryLoggedIn",
        "true"
      );

      localStorage.setItem(
        "libraryUser",
        username.trim()
      );

      setIsLoggedIn(true);

    } else {

      setError(
        "Invalid username or password."
      );
    }
  };

  return (

    <main className="login-page">

      <div className="login-card">

        <div className="login-icon">
          📚
        </div>

        <h1>
          Employee Library
        </h1>

        <p className="login-subtitle">
          Management System
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>
            Password
          </label>

          <div className="password-wrap">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="show-password"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>

          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <div className="login-demo">

          <strong>
            Demo Credentials
          </strong>

          <span>
            Username: admin
          </span>

          <span>
            Password: admin123
          </span>

        </div>

      </div>

    </main>
  );
}

export default Login;