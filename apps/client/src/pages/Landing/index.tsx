import { Card, Container } from "@mui/material";
import React from "react";

document.title = "Home | Allergy Management System";

const Landing = () => {
  return (
    <React.Fragment>
      <div>
        <Container maxWidth="sm">
          <Card sx={{ padding: 4 }}>
            <h2>Welcome to Allergy Management System</h2>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Landing;
0;
