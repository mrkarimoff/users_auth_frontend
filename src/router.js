import { createBrowserRouter } from "react-router-dom";
import Cabinet from "./routes/Cabinet";
import ErrorPage from "./routes/ErrorPage";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";

const router = createHashRouter([
  {
    path: "/users_auth_frontend",
    element: <Cabinet />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

export default router;
