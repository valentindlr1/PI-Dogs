import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import Home from "./Components/Home/Home";
import NavBar from "./Components/Navbar/NavBar";
import Detail from "./Components/Detail/Detail";
import Form from "./Components/Form/Form";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const access = useSelector((state) => state.access);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!access) navigate("/");
  }, [access]);
  return (
    <div className="App">
      <div>{location.pathname !== "/" && <NavBar />}</div>

      <Routes>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Welcome />}></Route>
      </Routes>
    </div>
  );
}

export default App;
