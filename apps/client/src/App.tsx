import { Route, Routes } from "react-router-dom";
import "./App.css";
import { privateRoutes, publicRoutes } from "./routes";
import Signin from "./pages/Auth/Signin";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./store";
import { hideSnackbar } from "./store/Snackbar/snackbar.slice";
import { useEffect } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector((state) => state.snackbar);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (snackbar?.showSnackBar) {
        dispatch(hideSnackbar());
      }
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <Routes>
        <Route path="/" Component={Signin} />

        {publicRoutes.map((r) => (
          <Route path={r.path} element={r.element} key={r.path} />
        ))}

        {privateRoutes.map((r) => (
          <Route
            path={r.path}
            element={<ProtectedRoute>{r.element}</ProtectedRoute>}
            key={r.path}
          />
        ))}
      </Routes>
      <Snackbar open={snackbar?.showSnackBar} autoHideDuration={3000}>
        <Alert severity={snackbar?.type || "success"} sx={{ width: "100%" }}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
