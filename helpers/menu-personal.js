const getMenuPersonal = (rol = 'USER_ROLE') => {
  const menu = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'rxjs', url: 'rxjs' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'ProgressBar', url: 'progress' },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-table',
      submenu: [
        // { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Médicos', url: 'medicos' },
      ],
    },
  ];

  if (rol === 'ADMIN_ROLE') {
    menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
  }

  return menu;
};

module.exports = {
  getMenuPersonal,
};
