import { PathRouteProps } from "react-router-dom";
import Signup from "../pages/Auth/Signup";
import Signin from "../pages/Auth/Signin";
import AllergyList from "../pages/Allergy/AllergyList";
import AllergyDetail from "../pages/Allergy/AllergyDetail";
import NewAllergy from "../pages/Allergy/NewAllergy";
import EditAllergy from "../pages/Allergy/EditAllergy";

export const publicRoutes: PathRouteProps[] = [
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
];

export const privateRoutes: PathRouteProps[] = [
  { path: "/allergies", element: <AllergyList /> },
  { path: "/allergies/:id", element: <AllergyDetail /> },
  { path: "/allergies/add", element: <NewAllergy /> },
  { path: "/allergies/:id/edit", element: <EditAllergy /> },
];
