const { Dog } = require('../db')

const addDog = async (req, res) => {
    try {
        const {dog, temperament} = req.body
        const result = await Dog.create({...dog, temperamentId: temperament})
        return res.json({result})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
    
}

module.exports = { addDog }