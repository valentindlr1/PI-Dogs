import './Detail.modules.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Detail () {

    const [dog, setDog] = useState({})

    const {id} = useParams()

    useEffect(()=>{
        
        axios.get('http://localhost:3001/dogs/'+id)
        .then(res=> res.data)
        .then(perro => {
            if(perro.name){
                setDog(perro)
                
            }
        })
        .catch(error => window.alert('oops... error: '+error.message ))

        
    },[id])

    return <div>
        <h2>{dog?.name}</h2>
        <h3>{dog?.weight} Kg.</h3>
        <h3>{dog?.height} cm.</h3>
        <h3>{dog?.life_span}</h3>
        <span>
            <h3>Temperamentos</h3>
            <p>{dog?.temperament}</p>
        </span>
        <img src={dog?.image}/>
        <h4>ID: {id}</h4>
    </div>
}