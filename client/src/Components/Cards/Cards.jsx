import './Cards.modules.css'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paginate } from '../../redux/actions'

export default function Cards (props) {

    const [current, setCurrent] = useState(1)

    const dispatch = useDispatch()
    const pages = useSelector(state => state.pages)

    const {dogs} = props

    const showDogs = dogs.map((dog, index) => {
        return <Card key={index} name={dog.name} image={dog.image} weight={dog.weight} life={dog.life_span} temperament={dog.temperament} id={dog.id}/>
    })
    
    function handlePage (event) {
        if (event.target.name === 'next'){
            setCurrent(current+1)
        }
        if (event.target.name === 'prev'){
            setCurrent(current-1)
        }
    }
    
    useEffect(()=>{
        dispatch(paginate(showDogs))
        
    },[dogs])

    return <div className='cards'>
        <div>
            {(current !== 1) && <button name='prev' onClick={handlePage}>{'< Anterior'}</button>}
            {<p>{current + " de " + Object.keys(pages).length}</p>}
            {(current !== Object.keys(pages).length) && <button name='next' onClick={handlePage}>{'Siguiente >'}</button>}
        </div>
        
        <div className='cards'>
        {pages[current]}
        </div>
        
    </div>
}