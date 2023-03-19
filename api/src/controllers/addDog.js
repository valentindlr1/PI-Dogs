const { Dog, Temperament } = require('../db')

const addDog = async (req, res) => {
    try {
        const {dog, temperament} = req.body
        const newDog = await Dog.create({...dog, temperament})
        
        temperament.map(async(t) => {
            const find = await Temperament.findOne({where: {name: t}})

            await newDog.addTemperament(find)
            
        })
        
        return res.json({...newDog})
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
    
}

module.exports = { addDog }