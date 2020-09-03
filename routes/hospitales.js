/*
    Hospitales
    ruta: '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
  getAllHospitales,
} = require('../controllers/hospitales');

const router = Router();

// Obtener Hospitales desde/limite
router.get('/', getHospitales);

// Obtener todos los Hospitales
router.get('/all', getAllHospitales);

// Crear Hospitales
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

// Modificar Hospitales
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
  ],
  actualizarHospital
);

// Borrar Hospitales
router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;
