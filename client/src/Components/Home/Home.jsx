import './Home.modules.css'
import SearchBar from '../SearchBar/SearchBar'
import Cards from '../Cards/Cards'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filter, order } from '../../redux/actions'

export default function Home () {

    const [dogs, setDogs] = useState([])
    // const [filtered, setFilter] = useState([...dogs])
    const [show, setShow] = useState(false)
    const [temps, setTemps] = useState([])
    const [checkedTemp, setChecked] = useState(false)
    const [tempsSelected, setSelected] = useState([])
    const [myCreated, setMyCreated] = useState(false)
    const [saveSelected, setSave] = useState([])
    const [orderFlag, setOrder] = useState(false)
    
    const dispatch = useDispatch()
    const filtered = useSelector(state => state.filtered)

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
           
            dispatch(order(option, fil))

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
            
            setDogs(aux)
        }
        setOrder(!orderFlag)
       
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
        
      
        dispatch(filter(dogs, myCreated, checkedTemp, tempsSelected))
        
        return 
    }, [tempsSelected, checkedTemp, myCreated])


    return <div className='homePage'>
            <h2 className='homeTitle'>HOME</h2>
        <div className='searchDiv'>
            
        <SearchBar search={onSearch}/>
        <label className='order'>{"Order by... "} 
        <select onChange={(event)=>handleOrder(event, filtered, dogs)} className='selectOrder'>
            <optgroup label='Alphabetic Order'>
            <option>Ascendent</option>
            <option>Descendent</option>
            </optgroup>
            <optgroup label='Weight'>
            <option>Peso ascendente</option>
            <option>Peso descendente</option>
            </optgroup>
            
        </select>
        </label>
        
        <button className='filter' onClick={() =>{setShow(!show)}}>Filters 🔍</button>
        </div>
        
        <Cards dogs={(!tempsSelected.length && !myCreated) ? dogs : filtered } flag={((!filtered.length && !!tempsSelected.length) || !dogs.length) && 'flag'} />

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
                        <button className='closeTemps' onClick={()=> setShow(false)} >Accept</button>
                    </div>
                </div>
    </div>
}