import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Container,
  Card,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService, { AuthDto } from "../../services/auth";
import { useAppDispatch } from "../../store";
import { setSuccess } from "../../store/Snackbar/snackbar.slice";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Enter valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long with a special character",
      }
    ),
});

interface IInitialState {
  email: string;
  password: string;
}

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signup = useMutation({
    mutationKey: ["signup"],
    mutationFn: (body: AuthDto) => AuthService.signUp(body),
    onSuccess: () => {
      dispatch(setSuccess({ message: "Signup successful" }));
      navigate("/signin");
      formik.resetForm();
    },
  });

  const formik = useFormik<IInitialState>({
    initialValues: { email: "", password: "" },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      signup.mutate(values);
    },
  });

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
            <p>Enter your details to signup</p>
            <Stack gap={2}>
              <TextField
                variant="outlined"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                error={formik.errors.email ? true : false}
                helperText={formik.errors.email}
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={formik.values.password}
                  error={formik.errors.password ? true : false}
                  onChange={formik.handleChange("password")}
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
                {!!formik.errors.password && (
                  <FormHelperText error id="accountId-error">
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  height: 50,
                }}
                onClick={formik.submitForm}
                disabled={signup.isLoading}
              >
                {signup.isLoading ? "Loading" : "Sign up"}
              </Button>
            </Stack>
            <h4>
              Already have an account?
              <Link to={"/signin"} style={{ textDecoration: "none" }}>
                {" "}
                Login
              </Link>
            </h4>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Signup;
