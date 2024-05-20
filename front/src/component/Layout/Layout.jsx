import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import Login from "../login/Login";
import { useState } from "react";
function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    // Oturum açma işlemi gerçekleştiğinde isLoggedIn durumunu true olarak ayarla.
    setIsLoggedIn(true);
  };
  return (
    <div>
      {!isLoggedIn && (
        <Link to={"/login"} onClick={(e) => setIsLoggedIn(true)}>
          Login
        </Link>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
