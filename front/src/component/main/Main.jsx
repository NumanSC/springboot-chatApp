import axios from "axios";
import Chat from "./../chat/Chat";
import { useContext, useEffect, useState } from "react";

import ChatRoom from "../../ChatRoom";

function Main() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  // const [sender, setSender] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const token = localStorage.getItem("token");

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      setUsers(response.data);
      console.log(response.data);
      localStorage.setItem("users", response.data);
      console.log(localStorage.getItem("users"));
    } catch (error) {
      console.error(error); // Hata durumunda konsola hatayı yazdır
    }
  };

  const getMessage = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    setReceiver(id);
    try {
      const response = await axios.get("/api/messages/" + id);
      setMessage(response.data);
      console.log(response.data);
      setOpenChat(true);
    } catch (error) {
      console.error(error); // Hata durumunda konsola hatayı yazdır
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <ChatRoom users={users} />

      {/* <button onClick={getUsers}>bas</button>
      <div>
        {users[0] &&
          users.map((user, index) => (
            <div id={user.id} key={index} onClick={getMessage}>
              <p id={user.id}>{user.username}</p>
              <img src={`data:image/jpeg;base64,${user.image}`} alt="" />
            </div>
          ))}
      </div>
      <div>{openChat && <Chat token={token} receiver={receiver} />}</div>

      <div>
        <h1>Messages</h1>
        {message &&
          message.map((msg, index) => (
            <div key={index}>
              <p>{msg.content}</p>
            </div>
          ))}
      </div>
      <Chat /> */}
    </div>
  );
}

export default Main;
