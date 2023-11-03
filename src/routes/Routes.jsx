import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Booking from "../pages/Bookings/Booking";
import TableRow from "../pages/Bookings/TableRow";
import BookService from "../pages/BookService/BookService";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/singup',
        element: <SignUp></SignUp>
      },
      {
        path: '/book/:id',
        element: <PrivateRoute><BookService></BookService></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/services/${params.id}`)
      },
      {
        path: '/bookings',
        element: <PrivateRoute><Booking></Booking></PrivateRoute>
      },
      {
        path: '/table',
        element: <TableRow></TableRow>
      }
    ]
  },
]);

export default router; 