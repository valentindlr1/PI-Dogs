const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDogs } = require('../controllers/getDogs')
const { getDog } = require('../controllers/getBreed');
const { getByName } = require('../controllers/getByName');
const { addDog } = require('../controllers/addDog');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getDogs)
router.get('/dogs/:idRaza', getDog)
router.get('/name', getByName)
router.post('/dogs', addDog)



module.exports = router;
