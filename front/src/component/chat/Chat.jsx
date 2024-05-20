import "./chat.css";
import axios from "axios";
import { useState } from "react";

function Chat({ token, receiver }) {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await getUser(e);
    try {
      const response = await axios.post(
        "/api/messages/send",
        {
          sender: user.id,
          receiver: receiver,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // Başarılı yanıtı konsola yazdır
    } catch (error) {
      console.error(error); // Hata durumunda konsola hatayı yazdır
    }
  };

  const getUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Başarılı yanıtı konsola yazdır
    } catch (error) {
      console.error(error); // Hata durumunda konsola hatayı yazdır
    }
  };

  return (
    <div className="chat-container">
      <form className="chat-input" action="submit">
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" onClick={sendMessage}>
          tıkla
        </button>
      </form>
      {user && <h1>{user.username}</h1>}
    </div>
  );
}

export default Chat;
