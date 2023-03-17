import './Home.modules.css'
import SearchBar from '../SearchBar/SearchBar'
import Cards from '../Cards/Cards'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home () {

    const [dogs, setDogs] = useState([])
    

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

    useEffect( ()=>{
        gets()
        
    }, [])


    return <div className='homePage'>
        <div className='searchDiv'>
            <h2 className='homeTitle'>HOME</h2>
        
        <SearchBar search={onSearch}/>
        </div>
        
        <Cards dogs={dogs} />
    </div>
}