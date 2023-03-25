import "./Welcome.modules.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
const backgorund = require("../../img/repetitive-bg.webp");

export default function Welcome() {
  const dispatch = useDispatch();

  return (
    <div className="welcomeBG">
      <div className="welcome">
        {/* <img src={backgorund} className='bg'></img> */}
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
