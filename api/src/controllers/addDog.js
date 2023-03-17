const { Dog, Temperament } = require('../db')

const addDog = async (req, res) => {
    try {
        const {dog, temperament} = req.body
        console.log(req.body)
        const newDog = await Dog.create({...dog, temperament})
        
        return res.json({newDog})
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
    
}

module.exports = { addDog }