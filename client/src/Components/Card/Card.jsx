import './Card.modules.css'
import { Link } from 'react-router-dom'

export default function Card (props) {

    const {name, image, weight, temperament, id} = props

    return <Link to={'/detail/'+id} className='card'>
    <div>
        <h2>Raza: {name}</h2>
        <h3>Peso: {weight} Kg.</h3>
        <img src={image} alt='dog image' className='foto'/>
        <div className='templist'>
            <h3>Temperamentos</h3>
            {temperament.map((temp, index) => <p key={index} className='temps'>{temp}</p>)}
            </div>
    </div>
    </Link>
    
}