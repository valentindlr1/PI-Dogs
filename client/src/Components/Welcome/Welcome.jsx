import "./Welcome.modules.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

export default function Welcome() {
  const dispatch = useDispatch();

  return (
    <div className="welcomeBG">
      <div className="welcome">
        <h1>BIENVENIDO A MI PI</h1>
        <Link to="/home">
          <button className="welcomeBut" onClick={() => dispatch(login())}>
            INGRESAR
          </button>
        </Link>
        <p>Made By Valentindlr1</p>
      </div>
    </div>
  );
}
