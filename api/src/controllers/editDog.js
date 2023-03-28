const { Dog } = require("../db");

const editDog = async (req, res) => {
  try {
    const dog = req.body;
    const found = await Dog.findOne({ where: { name: dog.name } });
    await found.set(dog);
    await found.save();
    res.send("Dog edited successfully!");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { editDog };
