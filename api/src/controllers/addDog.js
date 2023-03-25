const { Dog, Temperament } = require("../db");

const addDog = async (req, res) => {
  try {
    const { dog, temperament } = req.body;
    // if >> throw Error
    const newDog = await Dog.create({ ...dog, temperament });

    temperament.map(async (t) => {
      const find = await Temperament.findOne({ where: { name: t } });

      await newDog.addTemperament(find);
    }); // PROMISE ALL

    return res.json({ ...newDog });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { addDog };
