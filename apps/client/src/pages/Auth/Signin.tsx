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
  FormHelperText,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService, { AuthDto } from "../../services/auth";
import { setSuccess } from "../../store/Snackbar/snackbar.slice";
import { useAppDispatch } from "../../store";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "@allergy-management/models";
import { userLogin } from "../../store/Auth/auth.slice";

document.title = "Allergy Management System";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Enter valid email"),
  password: Yup.string().required("Password is required"),
});

interface IInitialState {
  email: string;
  password: string;
}

const Signin = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signin = useMutation({
    mutationKey: ["signin"],
    mutationFn: (body: AuthDto) => AuthService.signIn(body),
    onSuccess: (data) => {
      navigate("/allergies");
      dispatch(
        userLogin({
          isAuthenticated: true,
          token: data?.token,
          user: data?.user,
        })
      );
      dispatch(setSuccess({ message: "Login successful" }));
      formik.resetForm();
    },
    onError: (error: AxiosError<IApiErrorResponse>) => {
      formik.setFieldError("password", error.response?.data?.message);
    },
  });

  const formik = useFormik<IInitialState>({
    initialValues: { email: "", password: "" },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      signin.mutate(values);
    },
    validateOnChange: false,
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
            <p>Please sign in to continue.</p>
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
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  error={formik.errors.password ? true : false}
                  onChange={formik.handleChange("password")}
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
                disabled={signin.isLoading}
              >
                {signin.isLoading ? "Loading..." : "Login"}
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
