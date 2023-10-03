import { PathRouteProps } from "react-router-dom";
import Signup from "../pages/Auth/Signup";
import Signin from "../pages/Auth/Signin";

export const publicRoutes: PathRouteProps[] = [
  { path: "/signup", Component: Signup },
  { path: "/signin", Component: Signin },
];
