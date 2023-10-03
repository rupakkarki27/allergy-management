import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes } from "./routes";
import Signin from "./pages/Auth/Signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Signin} />

        {publicRoutes.map((r) => (
          <Route path={r.path} Component={r.Component} key={r.path} />
        ))}
      </Routes>
    </>
  );
}

export default App;
