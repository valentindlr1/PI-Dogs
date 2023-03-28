const { Router } = require("express");

const { getDogs } = require("../controllers/getDogs");
const { getDog } = require("../controllers/getBreed");
const { getByName } = require("../controllers/getByName");
const { addDog } = require("../controllers/addDog");
const { getTemper } = require("../controllers/getTemper");
const { deleteDog } = require("../controllers/deleteDog");
const { editDog } = require("../controllers/editDog");

const router = Router();

router.get("/dogs", getDogs);
router.put("/dogs", editDog);
router.get("/dogs/:idRaza", getDog);
router.delete("/dogs/:idRaza", deleteDog);
router.get("/name", getByName);
router.post("/dogs", addDog);
router.get("/temperaments", getTemper);

module.exports = router;
