import "./Card.modules.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteDog, editDog } from "../../redux/actions";
import { useDispatch } from "react-redux";
const loading = require('../../img/spinning.gif')

export default function Card(props) {
  const { name, image, weight, temperament, id, height, life } = props;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  async function handleDelete() {
    await axios.delete("http://localhost:3001/dogs/" + id);
    dispatch(deleteDog(id))
  }
 function handleEdit(){
  const weightSplit = weight.split(' ')
  const weightMin = weightSplit[0]
  const weightMax = weightSplit[2]
  const heightSplit = height.split(' ')
  const heightMin = heightSplit[0]
  const heightMax = heightSplit[2]
  dispatch(editDog({
    name,
    image,
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    temperament,
    id,
    life
  }))
  navigate('/Form')
  }

  return (
    <div className="card">
        {!Number(id) && (
          <button className="deleteDog" onClick={handleDelete}>
            {"❌"}
          </button>
        )}
        {
          !Number(id) && (
            <button className="editDog" onClick={handleEdit}>
              {"✍️"}
            </button>
          )
        }

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
