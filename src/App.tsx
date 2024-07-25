
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Stocks from "./pages/Stocks";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage/>
    },
    {
      path: "login",
      element: <Login/>,
    },
    {
      path: "stocks",
      element: <Stocks />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
