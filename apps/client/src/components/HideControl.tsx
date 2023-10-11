import React from "react";
import { useAppSelector } from "../store";

/**
 * This is a component that checks a user's role
 * and only renders the children if the role is admin
 * Use this only where you need to hide the controls based on user's role
 */

interface IHideControl extends React.PropsWithChildren {}

const HideControl: React.FC<IHideControl> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  return user?.role === "admin" ? children : null;
};

export default HideControl;
