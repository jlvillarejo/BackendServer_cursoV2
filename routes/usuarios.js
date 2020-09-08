/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  getUsuarios,
  getAllUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require('../controllers/usuarios');

const {
  validarJWT,
  validarAdminRol,
  validarAdminRol_o_User,
} = require('../middlewares/validar-jwt');

const router = Router();

// Obtener todos los usuarios
router.get('/all', validarJWT, getAllUsuarios);

// Obtener Usuarios limitado
router.get('/', validarJWT, getUsuarios);

// Crear Usuarios
router.post(
  '/',
  [
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuario
);

// Modificar Usuarios
router.put(
  '/:id',
  [
    validarJWT,
    validarAdminRol_o_User,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('rol', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

// Borrar Usuarios
router.delete('/:id', [validarJWT, validarAdminRol], borrarUsuario);

module.exports = router;
