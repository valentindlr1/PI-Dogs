const { Dog } = require('../db')
const axios = require('axios')


const getApi = async () => {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds/')
    const breeds = response.data

    let ApiData = []


    breeds.forEach(dog => {
        let temperament = dog.temperament
        let temps = temperament ? temperament.split(', ') : []
        ApiData.push({
            name: dog.name,
            weight: dog.weight.imperial,
            height: dog.height.imperial,
            id: dog.id,
            life_span: dog.life_span,
            temperament: temps,
            origin: dog.origin,
            image: dog.image.url
        })
    })

    return ApiData
}

const getDogs = async (req, res) =>{

    try {
        let api = await getApi()
        let db = await Dog.findAll()
        let result = [...api, ...db]

        return res.json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
      
}

module.exports = {getDogs}