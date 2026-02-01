// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FaceIcon from '@mui/icons-material/Face';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

// import BarChartIcon from '@mui/icons-material/BarChart';
// import MapIcon from '@mui/icons-material/Map';

// import CarCrashIcon from '@mui/icons-material/CarCrash';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const MENU_ROUTES = [
  {
    icon: FaceIcon,
    label: 'Clientes',
    id: 'clientes',
    children: [
      {
        to: '/app/clientes/cadastros',
        id: 'clientes-cadastros',
        label: 'Cadastros',
      },
    ],
  },
  // {
  //   icon: CalendarMonthIcon,
  //   label: 'Eventos',
  //   id: 'eventos',
  //   children: [
  //     {
  //       to: '/app/clientes/cadastros',
  //       id: 'eventos-cadastrar',
  //       label: 'Cadastrar',
  //     },
  //   ],
  // },
  // {
  //   icon: PeopleAltIcon,
  //   label: 'Motorista / Ajudante',
  //   id: 'motorista-ajudante',
  //   children: [
  //     {
  //       to: '/app/motoristas/cadastros',
  //       id: 'motorista-ajudante-cadastros',
  //       label: 'Cadastros',
  //     },
  //   ],
  // },
  // {
  //   icon: CarCrashIcon,
  //   label: 'Oficina',
  //   id: 'oficina',
  //   children: [
  //     {
  //       to: '/app/clientes/cadastros',
  //       id: 'oficina-cadastrar',
  //       label: 'Cadastrar',
  //     },
  //   ],
  // },
  // {
  //   icon: BarChartIcon,
  //   label: 'Relatórios',
  //   id: 'relatorios',
  //   children: [
  //     {
  //       to: '/app/relatorios/clientes',
  //       id: '/app/relatorios/clientes',
  //       label: 'Clientes',
  //     },
  //   ],
  // },
  {
    icon: LocationOnIcon,
    label: 'Regiões / Bases',
    id: 'Regiões-Base',
    children: [
      {
        to: '/app/regioes/cadastros',
        id: '/app/regioes/cadastros',
        label: 'Cadastros',
      },
    ],
  },

  // {
  //   icon: MapIcon,
  //   label: 'Rotas',
  //   id: 'rotas',
  //   children: [
  //     {
  //       to: '/app/rotas/buscar',
  //       id: '/app/rotas/buscar',
  //       label: 'Buscar',
  //     },
  //     {
  //       to: '/app/rotas/cadastrar',
  //       id: '/app/rotas/cadastrar',
  //       label: 'Cadastrar',
  //     },
  //   ],
  // },
  // {
  //   icon: LocalAtmIcon,
  //   label: 'Tarifário',
  //   id: 'tarifario',
  //   children: [
  //     {
  //       to: '/app/tarifario/repasses',
  //       id: '/app/tarifario/repasses',
  //       label: 'Repasses',
  //     },
  //   ],
  // },
  {
    icon: DirectionsCarIcon,
    label: 'Veículos / Placas',
    id: 'veiculos',
    children: [
      {
        to: '/app/veiculos/cadastros',
        id: 'veiculos-cadastrar',
        label: 'Cadastros',
      },
    ],
  },
];
