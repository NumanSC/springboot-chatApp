import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

import { Link } from "react-router-dom";
import { TokenContext } from "../../context/AppProvider";

function Login() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { username, setUsername, userData, setUserData } = useContext(TokenContext);

  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      setUserData({ ...userData, username: username });
      localStorage.setItem("username", username);
      console.log(userData, "data");
      navigate("/main");
    } catch (error) {
      console.error(error);
      setErr(error.response.data.messages[0]);
    }
  };

  const handleUsername = (e) => {
    //const { value } = event.target;
    setUsername(e.target.value);
    console.log(username);
  };

  return (
    <div>
      <div className="login">
        <div className="login_container">
          <div className="login_text">
            <h1>Sign in</h1>
          </div>
          <form action="submit" onSubmit={userLogin}>
            <div>
              <label htmlFor="user">Username</label>
              <input id="user" type="text" onChange={handleUsername} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="text" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">bas</button>
            <Link to={"/register"}>
              <button>Register</button>
            </Link>
          </form>
          {err}
        </div>
      </div>
    </div>
  );
}

export default Login;
