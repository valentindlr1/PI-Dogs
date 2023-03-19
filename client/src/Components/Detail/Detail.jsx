import './Detail.modules.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Detail () {

    const [dog, setDog] = useState({
        name: "",
        weight: "",
        height: "",
        image: "",
        life_span: "",
        temperament: []
    })

    const {id} = useParams()

    const tempList = dog?.temperament.map((t, ind) => {
        return <div className='detailTemps' key={ind}>{t}</div>
    })

    useEffect(()=>{
        
        axios.get('http://localhost:3001/dogs/'+id)
        .then(res=> res.data)
        .then(perro => {
            if(perro.name){
                setDog({...dog, ...perro})
                
            }
        })
        .catch(error => window.alert('oops... error: '+error.message ))

        return setDog({name: "",
        weight: "",
        height: "",
        image: "",
        life_span: "",
        temperament: []})        
    },[id])

    return <div className='detail'>
        <h2 className='detailTitle'>{dog?.name}</h2>
        <img src={dog?.image} className='detailImage'/>
        <div className='listDetail'>
        <h3 className='datos'>Peso aproximado: {dog?.weight} Kg.</h3>
        <h3 className='datos'>Altura aproximada: {dog?.height} cm.</h3>
        <h3 className='datos'>Esperanza de vida: {dog?.life_span}</h3>
        
            
            <div className='temperDatos'>
            <h3 >Temperamentos</h3>
            <div>
            {tempList}
            </div>
                
                </div>
        
        </div>
        
        <h4 className='id'>ID: {id}</h4>
    </div>
}