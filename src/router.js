import { createBrowserRouter } from "react-router-dom";
import Cabinet from "./routes/Cabinet";
import ErrorPage from "./routes/ErrorPage";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Cabinet />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

export default router;
