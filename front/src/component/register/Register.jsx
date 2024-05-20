import "./register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const reader = new FileReader();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      console.log("register");
      try {
        const response = await axios.post("/api/user", {
          username: username,
          email: email,
          password: password,
          image: base64Image,
        });
        console.log(response.data);
        navigate("/login");
      } catch (error) {
        console.error(error.response.data.messages);
        setErr(error.response.data.messages[0]); // Hata durumunda konsola hatayı yazdır
      }
    };

    if (image) {
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="user">Username</label>
          <input id="user" type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input id="image" type="file" onChange={handleImageChange} />
        </div>

        <button type="submit">Register</button>
      </form>
      {err}
    </div>
  );
}

export default Register;
