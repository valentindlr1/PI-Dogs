import './Welcome.modules.css'
import { Link } from 'react-router-dom'

export default function Welcome () {


    return <div>
        <h1>BIENVENIDO A MI PI</h1>
        <Link to='/home'><button>INGRESAR</button></Link>
        
    </div>
}