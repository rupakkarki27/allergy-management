import { PathRouteProps } from "react-router-dom";
import Signup from "../pages/Auth/Signup";
import Signin from "../pages/Auth/Signin";
import AllergyList from "../pages/Allergy/AllergyList";
import AllergyDetail from "../pages/Allergy/AllergyDetail";

export const publicRoutes: PathRouteProps[] = [
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
];

export const privateRoutes: PathRouteProps[] = [
  { path: "/allergies", element: <AllergyList /> },
  { path: "/allergies/:id", element: <AllergyDetail /> },
];
