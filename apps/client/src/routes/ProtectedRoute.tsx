import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

interface IProtectedRoute extends React.PropsWithChildren {}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth);

  if (!auth?.isAuthenticated) {
    return <Navigate to={"/signin"} replace />;
  }

  return children;
};

export default ProtectedRoute;
