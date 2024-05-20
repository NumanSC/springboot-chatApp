import { over, setInterval } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs.js";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./context/AppProvider";
import axios from "axios";
import UserEdits from "./component/UserEdits";

var stompClient = null;
const ChatRoom = () => {
  // console.log(users);

  const { username, userData, setUserData } = useContext(TokenContext);

  const [privateChats, setPrivateChats] = useState(new Map());
  const [users, setUsers] = useState([]);
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");

  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState("");

  const [edit, setEdit] = useState(false);
  // const [userData, setUserData] = useState({
  //   username: "",
  //   receiver: "",
  //   connected: false,
  //   message: "",
  // });

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
      console.log(response.data);
      localStorage.setItem("users", response.data);
      console.log(localStorage.getItem("users"));
    } catch (error) {
      console.error(error); // Hata durumunda konsola hatayı yazdır
    }
  };

  const getMessage = async () => {
    try {
      const response = await axios.get("messages/" + userData.username);
      setMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error); // Hata durumunda konsola hatayı yazdır
    }
  };

  useEffect(() => {
    const initialPrivateChats = new Map();
    users.forEach((user) => {
      initialPrivateChats.set(user.username, []);
    });
    setPrivateChats(initialPrivateChats);
  }, [users]);

  const connect = () => {
    const initialPrivateChats = new Map();

    users.forEach((user) => {
      initialPrivateChats.set(user.username, []);
    });
    // Oluşturulan özel sohbetleri state'e ayarlayın
    setPrivateChats(initialPrivateChats);
    getMessage();
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe("/user/" + userData.username + "/private", onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      sender: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  useEffect(() => {
    console.log(privateChats);
  }, [privateChats]);

  useEffect(() => {}, []);

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        // if (!privateChats.get(payloadData.sender)) {
        //   console.log(payloadData.sender);
        //   privateChats.set(payloadData.sender, []);

        //   // users.forEach((user) => {
        //   //   privateChats.set(user.username, []);
        //   // });

        //   setPrivateChats(new Map(privateChats));
        // }
        break;
      case "MESSAGE":
        console.log(payload.status);
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    setPrivateChats((prevPrivateChats) => {
      const updatedPrivateChats = new Map(prevPrivateChats);
      const senderChats = updatedPrivateChats.get(payloadData.sender) || [];
      updatedPrivateChats.set(payloadData.sender, [...senderChats, payloadData]);
      return updatedPrivateChats;
    });
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        sender: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        sender: userData.username,
        receiver: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }

    window.scrollTo({
      top: document.documentElement.querySelector(".chat-messages").scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const chatMessagesElement = document.querySelector(".chat-messages");
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }, [publicChats, privateChats, message, tab]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    connect();
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    console.log(userData.connected);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="container">
      {isLoaded && users && (
        <div className="chat-box">
          <div className="profil">
            {users[0] &&
              users.map((user, index) => (
                <div key={index} onClick={(e) => setEdit(!edit)}>
                  {user.username == userData.username && <img src={`data:image/jpeg;base64,${user.image}`} alt="" />}
                </div>
              ))}
          </div>

          <div className="member-list">
            {!edit && (
              <ul>
                {/* <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li> */}
                <h3>Chats</h3>
                <li>
                  <input type="text" placeholder="Search" />
                </li>
                {[...privateChats.keys()].map(
                  (name, index) =>
                    name != userData.username && (
                      <li
                        onClick={() => {
                          setTab(name);
                        }}
                        className={`member ${tab === name && "active"}`}
                        key={index}
                      >
                        <span>{users[0] && users.map((user, index) => <div key={index}>{user.username == name && <img src={`data:image/jpeg;base64,${user.image}`} alt="" />}</div>)}</span>
                        <span>{name}</span>
                      </li>
                    )
                )}
              </ul>
            )}
            {edit && (
              <ul className="edit">
                <h3>Profil</h3>
                <li className="editImg">
                  {users[0] && users.map((user, index) => <div key={index}>{user.username == userData.username && <img src={`data:image/jpeg;base64,${user.image}`} alt="" />}</div>)}
                </li>
                <li>
                  <div className="yourname">Your Name</div> {userData.username}
                </li>
              </ul>
            )}
          </div>
          {/* {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li className={`message ${chat.sender === userData.username && "self"}`} key={index}>
                    {chat.sender !== userData.username && <div className="avatar">{chat.sender}</div>}
                    <div className="message-data">{chat.message}</div>
                    {chat.sender === userData.username && <div className="avatar self">{chat.sender}</div>}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                <button type="button" className="send-button" onClick={sendValue}>
                  send
                </button>
              </div>
            </div>
          )} */}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <div className="header">
                {users[0] && users.map((user, index) => <div key={index}>{user.username == tab && <img src={`data:image/jpeg;base64,${user.image}`} alt="" />}</div>)}
                {tab}
              </div>
              <ul className="chat-messages">
                {/* Eski mesajlar */}
                {message
                  .filter((msg) => msg.receiver === tab || msg.sender === tab || msg.receiver === useState.username)
                  .map((msg, index) => (
                    <li className={`message ${msg.sender === userData.username && "self"}`} key={index + privateChats.get(tab).length}>
                      {msg.sender !== userData.username && (
                        <div className="avatar">
                          {users[0] && users.map((user, index) => <div key={index}>{user.username == msg.sender && <img src={`data:image/jpeg;base64,${user.image}`} alt="" />}</div>)}
                        </div>
                      )}
                      <div className="message-data">
                        {msg.sender !== userData.username && <div className={msg.sender != userData.username && "green"}>{msg.sender}</div>}
                        {msg.message}
                      </div>
                      {msg.sender === userData.username && <div className="avatar self"></div>}
                    </li>
                  ))}
                {/* Özel sohbet mesajları */}
                {privateChats.get(tab).map((chat, index) => (
                  <li className={`message ${chat.sender === userData.username && "self"}`} key={index}>
                    {chat.sender !== userData.username && (
                      <div className="avatar">
                        {users[0] && users.map((user, userIndex) => <div key={userIndex}>{user.username === chat.sender && <img src={`data:image/jpeg;base64,${user.image}`} alt="" />}</div>)}
                      </div>
                    )}
                    <div className="message-data">
                      {chat.sender !== userData.username && <div className={chat.sender !== userData.username ? "green" : ""}>{chat.sender}</div>}
                      {chat.message}
                    </div>
                    {chat.sender === userData.username && <div className="avatar self"></div>}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="Enter your message..."
                  value={userData.message}
                  onChange={(e) => setUserData({ ...userData, message: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && userData.message.trim() !== "") {
                      sendPrivateValue();
                    }
                  }}
                />

                {userData.message && (
                  <button type="button" className="send-button" onClick={() => sendPrivateValue()}>
                    >
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {!isLoaded && <div>Loading...</div>}
    </div>
  );
};

export default ChatRoom;
