import React from "react";
import AppBar from "./AppBar";
import { Box } from "@mui/material";

interface ILayout extends React.PropsWithChildren {
  title: string;
}

const Layout: React.FC<ILayout> = ({ children, title }) => {
  return (
    <React.Fragment>
      <AppBar title={title} />
      <Box sx={{ marginTop: 8 }}>{children}</Box>
    </React.Fragment>
  );
};

export default Layout;
