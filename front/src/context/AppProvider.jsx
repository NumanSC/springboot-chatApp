import { createContext, useState } from "react";

export const TokenContext = createContext();

export function AppProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  console.log("local" + localStorage.getItem("username"));
  const [userData, setUserData] = useState({
    username: localStorage.getItem("username"),
    receiver: "",
    connected: false,
    message: "",
  });

  let Sock;

  return <TokenContext.Provider value={{ token, setToken, username, setUsername, userData, setUserData }}>{children}</TokenContext.Provider>;
}
