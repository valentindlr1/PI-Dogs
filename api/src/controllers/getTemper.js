const axios = require("axios");
const { Temperament } = require("../db");

const getTemper = async (req, res) => {
  try {
    const check = await Temperament.count();

    const response = await axios.get("https://api.thedogapi.com/v1/breeds/");
    const breeds = response.data;

    let tempers = [];

    breeds.forEach((dog) => {
      let temps = dog.temperament;
      let array = temps ? temps.split(", ") : [];
      tempers.push(...array);
    });

    let allTemps = [...new Set(tempers)];
    if (check !== 0) return res.json(allTemps);
    for (let i = 0; i < allTemps.length; i++) {
      await Temperament.create({
        name: allTemps[i],
        id: i,
      });
    }

    res.json(allTemps);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTemper };
