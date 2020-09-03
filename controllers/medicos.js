const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;
  const bloque = Number(req.query.bloque) || 5;

  const [medicos, total] = await Promise.all([
    Medico.find()
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img')
      .skip(desde)
      .limit(bloque),

    Medico.countDocuments(),
  ]);

  res.json({
    ok: true,
    medicos,
    total,
  });
};

const getAllMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img');

  res.json({
    ok: true,
    medicos,
  });
};

const getMedicoId = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id)
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img');

    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: 'Error al recuperar médico',
    });
  }
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: 'Medico no encontrado por id',
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const borrarMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: 'Medico no encontrado por id',
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Médico borrado',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getMedicos,
  getAllMedicos,
  getMedicoId,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
