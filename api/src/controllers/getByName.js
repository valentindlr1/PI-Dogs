const { Dog } = require('../db')
const axios = require('axios')

const getApi = async (name) => {
    try {
        let result = []
        const response = await axios.get('https://api.thedogapi.com/v1/breeds/')
        let breeds = response.data
        name = name.toUpperCase()
        
        breeds.forEach(dog => {
            // let dogname = dog.name.toUpperCase()
            let found = dog.name.toUpperCase().split(name)
            if (found.length > 1) result.push(dog)
        });
        console.log("API RESULT >>",result)
        return result

    } catch (error) {
        return error
    }
    
}


const getByName = async (req, res) =>{
console.log('holaa')
    try {
        
        const { name } = req.query
        console.log("NAME >>", name)
        let fromApi = await getApi(name)    // Cualquiera que contenga el name, en la Apo
        console.log("FROM API >>",fromApi)
        let upperName = name[0].toUpperCase() + name.slice(1).toLowerCase()

        let fromDB = await Dog.findAll({where: {name: upperName}}) // Sólo el name exacto, en la DB
        
        let result = [...fromApi, ...fromDB]
        if (result.length === 0) throw new Error('No existe la raza ingresada')
        return res.json(result)
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
      
}

module.exports = { getByName }