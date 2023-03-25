const { Dog } = require("../db");
const axios = require("axios");

const getApi = async (idRaza) => {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds/");
    let breeds = response.data;
    let breed = breeds.filter((dog) => dog.id === Number(idRaza))[0];
    let temperament = breed.temperament ? breed.temperament : false;
    let temps = temperament ? temperament.split(", ") : [];
    let result = {
      name: breed.name,
      weight: breed.weight.imperial,
      height: breed.height.imperial,
      id: breed.id,
      life_span: breed.life_span,
      temperament: temps,
      origin: breed.origin,
      image: breed.image.url,
    };

    if (breed.name) return result;

    throw new Error("");
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getDog = async (req, res) => {
  try {
    const { idRaza } = req.params;
    // verificar que sea numero
    let fromApi = await getApi(idRaza);

    if (fromApi !== false) return res.json(fromApi);

    let fromDB = await Dog.findAll({ where: { id: idRaza } });

    if (fromDB.length === 0) throw new Error("No existe el id ingresado");

    return res.json(fromDB[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getDog };
