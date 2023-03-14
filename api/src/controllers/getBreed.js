const { Dog } = require('../db')
const axios = require('axios')


const getApi = async (idRaza) => {
    try {
        
        const response = await axios.get('https://api.thedogapi.com/v1/breeds/'+idRaza)
        let breed = response.data
        
        if (breed.name) return breed

        throw new Error('')

    } catch (error) {
        return false
    }
    
}


const getDog = async (req, res) =>{

    try {
        
        const {idRaza} = req.params

        let fromApi = await getApi(idRaza)
        
        if (fromApi !== false) return res.json(fromApi)

        let fromDB = await Dog.findAll({where: {id: Number(idRaza)}})
        
        if(fromDB.length === 0) throw new Error('No existe el id ingresado')
        
        return res.json(fromDB[0])
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
      
}

module.exports = {getDog}