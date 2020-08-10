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
} = require('../controllers/hospitales');

const router = Router();

// Obtener Hospitales
router.get('/', getHospitales);

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
