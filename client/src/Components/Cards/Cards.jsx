import './Cards.modules.css'
import Card from '../Card/Card'


export default function Cards (props) {

    const {dogs} = props

    const showDogs = dogs.map((dog, index) => {
        return <Card key={index} name={dog.name} image={dog.image} weight={dog.weight} life={dog.life_span} temperament={dog.temperament} id={dog.id}/>
    })
    
    return <div className='cards'>
        {showDogs}
    </div>
}