const { Dog, Dog_Temperament, Temperament } = require('../db')
const axios = require('axios')


const getApi = async () => {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds/')
    const breeds = response.data

    let ApiData = breeds.map(dog => {
        let temperament = dog.temperament
        let temps = temperament ? temperament.split(', ') : []
        return {
            name: dog.name,
            weight: dog.weight.imperial,
            height: dog.height.imperial,
            id: dog.id,
            life_span: dog.life_span,
            temperament: temps,
            origin: dog.origin,
            image: dog.image.url
        }
    })

    return ApiData
}

const getDB = async () => {
    
        const dogs = await Dog.findAll()
        
        
    return dogs
      
}
const getDogs = async (req, res) =>{

    try {
        let api = await getApi()
        let db = await getDB()
        let result = [...api, ...db]

        return res.json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
      
}

module.exports = {getDogs}