import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Checkout from "../pages/Checkout/Checkout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/singup',
          element:<SignUp></SignUp>
        },
        {
          path:'/services/:id',
          element:<Checkout></Checkout>,
          loader:({params})=>fetch(`http://localhost:3000/services/${params.id}`)
        }
      ]
    },
  ]);

  export default router; 