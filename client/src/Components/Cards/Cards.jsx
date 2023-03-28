import './Cards.modules.css'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paginate } from '../../redux/actions'

export default function Cards (props) {

    const [current, setCurrent] = useState(1)

    const dispatch = useDispatch()
    const pages = useSelector(state => state.pages)

    const {dogs, flag} = props

    const showDogs = dogs.map((dog, index) => {
        return <Card 
        key={index} 
        name={dog.name} 
        image={dog.image} 
        weight={dog.weight}
        height={dog.height}
        life={dog.life_span} 
        temperament={dog.temperament} 
        id={dog.id}
        />
    })
    
    function handlePage (event) {
        if (event.target.name === 'next'){
            setCurrent(current+1)
        }
        if (event.target.name === 'prev'){
            setCurrent(current-1)
        }
    }
    function handleCurrent () {
        if (current > Object.keys(pages).length) {
            if (Object.keys(pages).length > 0){
                setCurrent(Object.keys(pages).length)
            } else setCurrent(1)
        }
    }
    
    useEffect(()=>{
        
        dispatch(paginate(showDogs))
        handleCurrent()
        
    },[dogs])

    return <div className='cardsDiv'>
        <div className='pages'>
            {(current !== 1) && <button name='prev' onClick={handlePage} className='movePage'>{'< Previous'}</button>}
            {<p>{current + " of " + Object.keys(pages).length}</p>}
            {(current < Object.keys(pages).length) && <button name='next' onClick={handlePage} className='movePage'>{'Next >'}</button>}
        </div>
        {flag === 'flag' && <h3>{"NOTHING FOUND :("}</h3>}
        <div className='cards'>
        {pages[current]}
        </div>

        <div className='pages'>
            {(current !== 1) && <button name='prev' onClick={handlePage} className='movePage'>{'< Previous'}</button>}
            {<p>{current + " de " + Object.keys(pages).length}</p>}
            {(current < Object.keys(pages).length) && <button name='next' onClick={handlePage} className='movePage'>{'Next >'}</button>}
        </div>
        
    </div>
}