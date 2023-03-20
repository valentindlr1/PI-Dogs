import './Home.modules.css'
import SearchBar from '../SearchBar/SearchBar'
import Cards from '../Cards/Cards'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home () {

    const [dogs, setDogs] = useState([])
    const [filtered, setFilter] = useState([...dogs])
    const [show, setShow] = useState(false)
    const [temps, setTemps] = useState([])
    const [checkedTemp, setChecked] = useState(false)
    const [tempsSelected, setSelected] = useState([])
    const [myCreated, setMyCreated] = useState(false)
    const [saveSelected, setSave] = useState([])
    const [orderFlag, setOrder] = useState(false)
    

    const onSearch = async (input) => {
        if(input !== ""){
            const result = await axios.get('http://localhost:3001/name?name='+input)
            const found = result.data
            setDogs(found)
        } else {
            gets()
        }
        
    }
    const gets = async () => {
        
        const perros = await axios.get('http://localhost:3001/dogs')
        setDogs(perros.data)
        
    }
    function handleTemps(event, value){
        if (event.target.className === 'eachTemp'){
            event.target.className = 'markedTemp'
            setSelected([...tempsSelected, value])

        } else {
            event.target.className = 'eachTemp'
            setSelected([...tempsSelected].filter(temp => temp !== value))
        }
        
        
        
    }
    function handleFilterTemp (event) {
        if(event.target.checked){
            setChecked(true)
            if (saveSelected.length){
                setSelected(saveSelected)
            }
            
        } else {
            setChecked(false)
            setSave(tempsSelected)
            setSelected([])
        }
    }

    const allTemps = temps.map((t, index) => <span className='eachTemp' name="temperament" value={t} onClick={(event)=> {
        handleTemps(event, t)
        
    }} key={index}>{t}</span>)

    function handleOrder (event, fil, perros) {
        const option = event.target.value
        if(myCreated || checkedTemp){
            let aux = fil
            if (option === 'A-Z'){
                 aux.sort((a, b)=> a.name.localeCompare(b.name))
            }
            if (option === 'Z-A'){
                 aux.sort((a, b)=> b.name.localeCompare(a.name))
            }
            if (option === 'Peso ascendente'){
                 aux.sort((a, b)=> Number(a.weight.split(' ')[0]) - Number(b.weight.split(' ')[0]))
            }
            if (option === 'Peso descendente'){
                 aux.sort((a, b)=> Number(b.weight.split(' ')[0]) - Number(a.weight.split(' ')[0]))
            }
            console.log(aux)
            setFilter(aux)
        } else {
            let aux = perros
            if (option === 'A-Z'){
                 aux.sort((a, b)=> a.name.localeCompare(b.name))
            }
            if (option === 'Z-A'){
                 aux.sort((a, b)=> b.name.localeCompare(a.name))
            }
            if (option === 'Peso ascendente'){
                 aux.sort((a, b)=> Number(a.weight.split(' ')[0]) - Number(b.weight.split(' ')[0]))
            }
            if (option === 'Peso descendente'){
                 aux.sort((a, b)=> Number(b.weight.split(' ')[0]) - Number(a.weight.split(' ')[0]))
            }
            console.log(aux)
            setDogs(aux)
        }
        setOrder(!orderFlag)
        // SI CAMBIA EL ORDEN DEL STATE, PERO NO SE VE REFLEJADO
    }

    useEffect( ()=>{
        gets()
        axios.get('http://localhost:3001/temperaments')
        .then(res=>res.data)
        .then(arr => {
            setTemps(arr)
        })
        .catch(err => console.log(err.message))
        
        // FILTROS:
        
        let aux = []

        if(checkedTemp){

            dogs.forEach(dog => {
                if(myCreated){
                    if (typeof dog.id === 'string'){
                        if (tempsSelected.every(temp => {
                            return dog.temperament.includes(temp)
                        })) aux.push(dog)
                    }
                } else {
                    if (tempsSelected.every(temp => {
                        return dog.temperament.includes(temp)
                    })) aux.push(dog)
                }
                
            })
            
        } else {
            if(myCreated) {
                dogs.forEach(dog => {
                    if (typeof dog.id === 'string'){
                        aux.push(dog)
                    }
                })
                
            } else aux = aux.filter(dog => typeof dog.id === 'number') 
        }
     
        setFilter(aux)
        
    }, [tempsSelected, checkedTemp, myCreated, orderFlag])


    return <div className='homePage'>
            <h2 className='homeTitle'>HOME</h2>
        <div className='searchDiv'>
            
        <SearchBar search={onSearch}/>
        <label className='order'>{"Ordenar por... "} 
        <select onChange={(event)=>handleOrder(event, filtered, dogs)}>
            <optgroup label='Orden Alfabético'>
            <option>A-Z</option>
            <option>Z-A</option>
            </optgroup>
            <optgroup label='Peso'>
            <option>Peso ascendente</option>
            <option>Peso descendente</option>
            </optgroup>
            
        </select>
        </label>
        
        <button className='filter' onClick={() =>{setShow(!show)}}>Filtros 🔎</button>
        </div>
        {!filtered.length && !!tempsSelected.length && <h3>{"NINGUNA COINCIDENCIA :("}</h3>}
        <Cards dogs={(!tempsSelected.length && !myCreated) ? dogs : filtered} />

        <div className={(show && 'doShow') || 'notShow'}>
            <h2>Filtrar por:</h2>
                <div>
                <div className='filterDiv'>
                        <label className='filterText'>
                        <input type='checkbox' onClick={()=> setMyCreated(!myCreated)}></input>Mis creaciones
                        </label>
                    
                    </div>
                    <div>
                        <label className='filterText'>
                        <input type='checkbox' onClick={handleFilterTemp}></input>Temperamentos
                        </label>
                        
                    </div>
                </div>
                    
                    <div className={checkedTemp ? 'allTemps' : 'notShow'}>
                    {allTemps}
                    </div>
                    <div>
                        <button className='closeTemps' onClick={()=> setShow(false)} >Aceptar</button>
                    </div>
                </div>
    </div>
}