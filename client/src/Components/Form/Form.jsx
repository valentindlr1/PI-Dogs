import './Form.modules.css'
import validate from './validate'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Form () {
    const [newDog, setDog] = useState({
        name: "",
        weight: "",
        height: "",
        life: "",
        temperament: [],
    });
    const [errors, setErrors] = useState({});
    const [temps, setTemps] = useState([])
    const [show, setShow] = useState(false)
    const [added, setAdded] = useState(false)
    

    function handleChange (event){
        setErrors(validate(newDog))
        setDog({
            ...newDog,
            [event.target.name]: event.target.value
        });
    };
    async function handleSubmit(event){
        event.preventDefault();
        console.log("Simulacion de agregado")
        console.log("DOG >>", newDog)
        await axios.post('http://localhost:3001/dogs', {
            dog: {
                name: newDog.name,
                weight: newDog.weight,
                height: newDog.height,
                life_span: newDog.life
            },
            temperament: newDog.temperament
        })
        setAdded(true)
        setDog({
        name: "",
        weight: "",
        height: "",
        life: "",
        temperament: [],
        })
    }
    
    function handleTemps(event, value){
        
        if (event.target.className === 'eachTemp'){
            event.target.className = 'markedTemp'
            setDog({
                ...newDog,
                "temperament": [...newDog.temperament, value]
            })
        } else {
            event.target.className = 'eachTemp'
            setDog({
                ...newDog,
                "temperament": [...newDog.temperament].filter(t => t !== value)
            })
        }
        
    }
    const allTemps = temps.map((t, index) => <span className='eachTemp' name="temperament" value={t} onClick={(event)=> {
        handleTemps(event, t)
        
    }} key={index}>{t}</span>)

    const selectedTemps = newDog.temperament.map((t, index) => <span className='markedTemp' key={index}>{t}</span>)
    



    useEffect(()=>{
        
        axios.get('http://localhost:3001/temperaments')
        .then(res=>res.data)
        .then(arr => {
            setTemps(arr)
        })
        .catch(err => console.log(err.message))
            
        
    }, [newDog])


        return <div className='container'>
            <div className={(show && 'doShow') || 'notShow'}>
                    <div>
                        <h2 className='tempTitle'>Selecciona temperamentos</h2>
                    </div>
                    <div className='allTemps'>
                    {allTemps}
                    </div>
                    <div>
                        <button className='closeTemps' onClick={()=> setShow(false)} >Aceptar</button>
                    </div>
                </div>
            <div className={(added && 'added') || 'notAdded'}>
                    <div>
                        <h2 className='addedText'>Raza agregada con éxito!</h2>
                    </div>
                    <div>
                        <button className='closeTemps' onClick={()=> setAdded(false)} >Aceptar</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='form'>
                    <div className="formDiv">
                        <h2 className="h2">Añade una nueva raza!</h2>
                        <label className='labels'>Nombre: </label>
                        <input placeholder="Escribe el nombre..." type="text" value={newDog.name} onChange={handleChange} name="name" className={(errors?.name && "warning") || "text"}/>
                        <p className="danger">{errors?.name}</p>
                        <label className="labels">Peso en Kg: </label>
                        <input placeholder="Escribe el peso aprox..." type="text" value={newDog.weight} onChange={handleChange} name="weight" className={(errors?.weight && "warning") || "text"}/>
                        <p className="danger">{errors?.weight}</p>
                        <label className="labels">Altura en cm: </label>
                        <input placeholder="Escribe la altura aprox..." type="text" value={newDog.height} onChange={handleChange} name="height" className={(errors?.height && "warning") || "text"}/>
                        <p className="danger">{errors?.height}</p>
                        <label className="labels">Tiempo de vida: </label>
                        <input placeholder="Escribe los años..." type="text" value={newDog.life} onChange={handleChange} name="life" className={(errors?.life && "warning") || "text"}/>
                        <p className="danger">{errors?.life}</p>
                        <div>
                        <label className="labels">Temperamento: </label>
                        <button type='button' className='openTemps' onClick={()=> {
                            setShow(true)
                            
                            }}>Elegir</button>
                        <div>
                            {selectedTemps}
                        </div>
                        </div>
                        <hr />
                        
                        <button type="submit" className="sub">CREAR</button>

                    </div>
            
                </form>
                
        </div>
        
}