import Login from "./component/login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./component/register/Register";
import Layout from "./component/Layout/Layout";
import Main from "./component/main/Main";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        { path: "/register", element: <Register /> },
        { path: "/main", element: <Main /> },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
