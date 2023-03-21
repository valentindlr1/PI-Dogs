import './NavBar.modules.css'
import { Link } from 'react-router-dom'


export default function NavBar () {


    return <div className='bar'>
        <Link to='/home' className='home'>Home</Link>
        <h1>The Dogs Page</h1>
        <Link to='/form' className='raza'>Add Breed</Link>
    </div>
}