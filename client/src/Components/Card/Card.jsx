import "./Card.modules.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { setDogs } from "../../redux/actions";
import { useDispatch } from 'react-redux'
const loading = require('../../img/spinning.gif')


export default function Card(props) {
  const { name, image, weight, temperament, id } = props;
  const dispatch = useDispatch()

  async function handleDelete(event) {
    await axios.delete("http://localhost:3001/dogs/" + id);
    const dogs = (await axios.get("http://localhost:3001/dogs")).data
    dispatch(setDogs(dogs))
  }

  return (
    <div className="card">
        {!Number(id) && (
          <button className="deleteDog" onClick={handleDelete}>
            {"❌"}
          </button>
        )}
      <Link to={"/detail/" + id} className='link'>

        <h2>Breed: {name}</h2>
        <h3>Weight: {weight} Kg.</h3>
        {image ? <img src={image} alt="dog image" className="foto" /> : <img src={loading} alt="loading" className="foto" />}
        <div className="templist">
          <h3>Temperaments</h3>
          {temperament.map((temp, index) => (
            <p key={index} className="temps">
              {temp}
            </p>
          ))}
        </div>
      </Link>
    </div>
  );
}
