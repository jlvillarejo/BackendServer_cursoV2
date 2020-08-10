/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require('../controllers/medicos');

const router = Router();

// Obtener Médicos
router.get('/', getMedicos);

// Crear Médicos
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser válido').isMongoId(),
    validarCampos,
  ],
  crearMedico
);

// Modificar Médicos
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser válido').isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

// Borrar Médicos
router.delete('/:id', borrarMedico);

module.exports = router;
