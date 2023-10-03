import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Container,
  Card,
  TextField,
  Stack,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

document.title = "Allergy Management System";

const Signin = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div>
        <Container maxWidth="sm">
          <Card sx={{ padding: 4 }}>
            <h2>Welcome to Allergy Management System</h2>
            <p>Please sign in to continue.</p>
            <Stack gap={2}>
              <TextField variant="outlined" label="Email" />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  height: 50,
                }}
              >
                Login
              </Button>
            </Stack>
            <h4>
              Don't have an account?
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                {" "}
                Signup
              </Link>
            </h4>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Signin;
