const { Dog } = require('../db')
const axios = require('axios')


const getApi = async () => {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds/')
    const breeds = response.data

    let ApiData = []

    breeds.forEach(dog => {
        ApiData.push(dog)
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