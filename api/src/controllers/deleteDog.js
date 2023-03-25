const { Dog } = require('../db')

const deleteDog = async (req, res)=>{
    try {
        const { idRaza } = req.params
        await Dog.destroy({where: {id: idRaza}})
        res.send('Dog deleted successfully!')
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message})
    }
}

module.exports = { deleteDog }