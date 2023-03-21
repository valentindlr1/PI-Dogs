import './Form.modules.css'
import validate from './validate'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Form () {
    const [newDog, setDog] = useState({
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        life: "",
        image: "",
        temperament: [],
    });
    const [errors, setErrors] = useState({});
    const [temps, setTemps] = useState([])
    const [show, setShow] = useState(false)
    const [added, setAdded] = useState(false)
    const [incomplete, setIncomplete] = useState(false)
    

    function handleChange (event){
        setErrors(validate(newDog))
        setDog({
            ...newDog,
            [event.target.name]: event.target.value
        });
    };
    async function handleSubmit(event){
        event.preventDefault();

        setErrors(validate(newDog))

        if (!newDog.name.length || !newDog.weightMin.length || !newDog.weightMax.length || !newDog.heightMin.length || !newDog.heightMax.length || !newDog.life.length || !newDog.temperament.length ){
            setIncomplete(true)
            return
        }
        setIncomplete(false)

        await axios.post('http://localhost:3001/dogs', {
            dog: {
                name: newDog.name,
                weight: newDog.weightMin + " - " + newDog.weightMax,
                height: newDog.heightMin + " - " + newDog.heightMax,
                life_span: newDog.life,
                image: newDog.image
            },
            temperament: newDog.temperament
        })
        setAdded(true)
        setDog({
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        life: "",
        image: "",
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
            <div className={incomplete ? 'incompleteData' : 'completedData'}>
                <div>
                    <h2>Por favor completa los datos</h2>
                </div>
                <div>
                    <button className='closeTemps' onClick={()=> setIncomplete(false)}>Aceptar</button>
                </div>
            </div>
                <form onSubmit={handleSubmit} className='form'>
                    <div className="formDiv">
                        <h2 className="h2">Añade una nueva raza!</h2>
                        
                        <label className='labels'>Nombre: </label>
                        <input placeholder="Escribe el nombre..." type="text" value={newDog.name} onChange={handleChange} name="name" className={(errors?.name && "warning") || "text"}/>
                        <p className="danger">{errors?.name}</p>
                        
                        <label className="labels">Peso en Kg: </label>
                        <input placeholder="Peso mínimo..." type="number" value={newDog.weightMin} onChange={handleChange} name="weightMin" className={(errors?.weight && "warningMinmax") || "minmax"}/>
                        <input placeholder="Peso máximo..." type="number" value={newDog.weightMax} onChange={handleChange} name="weightMax" className={(errors?.weight && "warningMinmax") || "minmax"}/>
                        <br></br>
                        <p className="danger">{errors?.weight}</p>
                        
                        <label className="labels">Altura en cm: </label>
                        <input placeholder="Altura mínima..." type="number" value={newDog.heightMin} onChange={handleChange} name="heightMin" className={(errors?.height && "warningMinmax") || "minmax"}/>
                        <input placeholder="Altura máxima..." type="number" value={newDog.heightMax} onChange={handleChange} name="heightMax" className={(errors?.height && "warningMinmax") || "minmax"}/>
                        <p className="danger">{errors?.height}</p>
                        
                        <label className="labels">Tiempo de vida: </label>
                        <input placeholder="Escribe los años..." type="text" value={newDog.life} onChange={handleChange} name="life" className={(errors?.life && "warning") || "text"}/>
                        <p className="danger">{errors?.life}</p>
                        <
                            label className="labels">URL de imagen: </label>
                        <input placeholder="Pega aquí la URL..." type="text" value={newDog.image} onChange={handleChange} name="image" className={(errors?.image && "warning") || "text"}/>
                        <p className="danger">{errors?.image}</p>
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