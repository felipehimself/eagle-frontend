import { ProtectedLayout } from '@/layouts/protected-layout';
import { lazyImport } from '@/utils/lazy-import';
import { Navigate, RouteObject } from 'react-router-dom';
import { AppBase } from './app-base';

const { Home } = lazyImport(
  () => import('@/features/home/routes/home'),
  'Home',
);

const { AuthRoutes } = lazyImport(
  () => import('@/features/auth'),
  'AuthRoutes',
);

const { ClientsRoutes } = lazyImport(
  () => import('@/features/clients'),
  'ClientsRoutes',
);

const { RootRedirect } = lazyImport(
  () => import('@/features/root-redirect'),
  'RootRedirect',
);

const { RegisteredClients } = lazyImport(
  () => import('@/features/clients/routes/registered-clients'),
  'RegisteredClients',
);
const { Signin } = lazyImport(
  () => import('@/features/auth/routes/signin'),
  'Signin',
);
const { Signup } = lazyImport(
  () => import('@/features/auth/routes/signup'),
  'Signup',
);

const { Confirm } = lazyImport(
  () => import('@/features/auth/routes/confirm'),
  'Confirm',
);

const { EditClient } = lazyImport(
  () => import('@/features/clients/routes/edit-client.tsx'),
  'EditClient',
);

const { AddClient } = lazyImport(
  () => import('@/features/clients/routes/add-client.tsx'),
  'AddClient',
);

const { DriversRoutes } = lazyImport(
  () => import('@/features/drivers'),
  'DriversRoutes',
);

const { RegisteredDrivers } = lazyImport(
  () => import('@/features/drivers/routes/registered-drivers'),
  'RegisteredDrivers',
);

const { EditDriver } = lazyImport(
  () => import('@/features/drivers/routes/edit-driver'),
  'EditDriver',
);

const { AddDriver } = lazyImport(
  () => import('@/features/drivers/routes/add-driver'),
  'AddDriver',
);

const { VehiclesRoutes } = lazyImport(
  () => import('@/features/vehicles'),
  'VehiclesRoutes',
);

const { RegisteredVehicles } = lazyImport(
  () => import('@/features/vehicles/routes/registered-vehicles'),
  'RegisteredVehicles',
);

const { AddVehicle } = lazyImport(
  () => import('@/features/vehicles/routes/add-vehicle'),
  'AddVehicle',
);

const { EditVehicle } = lazyImport(
  () => import('@/features/vehicles/routes/edit-vehicle'),
  'EditVehicle',
);

const { RoutesRoutes } = lazyImport(
  () => import('@/features/routes'),
  'RoutesRoutes',
);

const { RegisteredRoutes } = lazyImport(
  () => import('@/features/routes/routes/registered-routes'),
  'RegisteredRoutes',
);

const { AddRoute } = lazyImport(
  () => import('@/features/routes/routes/add-route'),
  'AddRoute',
);

const { RegionsRoutes } = lazyImport(
  () => import('@/features/regions/routes'),
  'RegionsRoutes',
);

const { RegisteredRegions } = lazyImport(
  () => import('@/features/regions/routes/registered-regions'),
  'RegisteredRegions',
);

const { AddRegion } = lazyImport(
  () => import('@/features/regions/routes/add-region'),
  'AddRegion',
);

const { EditRegion } = lazyImport(
  () => import('@/features/regions/routes/edit-region'),
  'EditRegion',
);

// const { ClientsReportsRoutes } = lazyImport(
//   () => import('@/features/reports/routes'),
//   'ClientsReportsRoutes'
// );

// const { ClientsReport } = lazyImport(
//   () => import('@/features/reports/routes/clients-report'),
//   'ClientsReport'
// );

const { TariffsRoutes } = lazyImport(
  () => import('@/features/tariff/routes'),
  'TariffsRoutes',
);

const { RegisteredTariffs } = lazyImport(
  () => import('@/features/tariff/routes/registered-tariffs'),
  'RegisteredTariffs',
);

const { AddTariff } = lazyImport(
  () => import('@/features/tariff/routes/add-tariff'),
  'AddTariff',
);

const { EditTariff } = lazyImport(
  () => import('@/features/tariff/routes/edit-tariff'),
  'EditTariff',
);

export const AppRoutesConfig: RouteObject[] = [
  {
    path: '/',
    element: <AppBase />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      {
        path: 'auth',
        element: <AuthRoutes />,
        children: [
          { index: true, element: <Navigate to='signin' replace /> },
          { path: 'signin', element: <Signin />, index: true },
          { path: 'signup', element: <Signup /> },
          { path: 'confirm', element: <Confirm /> },
        ],
      },
      {
        path: 'app',
        element: <ProtectedLayout />,
        children: [
          // remover posteriormente
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'clientes',
            element: <ClientsRoutes />,
            children: [
              { path: 'cadastros', element: <RegisteredClients /> },
              { path: 'editar/:id', element: <EditClient /> },
              { path: 'cadastrar', element: <AddClient /> },
            ],
          },
          {
            path: 'motoristas',
            element: <DriversRoutes />,
            children: [
              { path: 'cadastros', element: <RegisteredDrivers /> },
              { path: 'editar/:id', element: <EditDriver /> },
              { path: 'cadastrar', element: <AddDriver /> },
            ],
          },
          {
            path: 'veiculos',
            element: <VehiclesRoutes />,
            children: [
              { path: 'cadastros', element: <RegisteredVehicles /> },
              { path: 'editar/:id', element: <EditVehicle /> },
              { path: 'cadastrar', element: <AddVehicle /> },
            ],
          },
          {
            path: 'rotas',
            element: <RoutesRoutes />,
            children: [
              { path: 'cadastrar', element: <AddRoute /> },
              { path: 'buscar', element: <RegisteredRoutes /> },
            ],
          },
          {
            path: 'regioes',
            element: <RegionsRoutes />,
            children: [
              { path: 'cadastros', element: <RegisteredRegions /> },
              { path: 'editar/:id', element: <EditRegion /> },
              { path: 'cadastrar', element: <AddRegion /> },
            ],
          },

          // {
          //   path: 'relatorios',
          //   element: <ClientsReportsRoutes />,
          //   children: [{ path: 'clientes', element: <ClientsReport /> }],
          // },

          {
            path: 'tarifario',
            element: <TariffsRoutes />,
            children: [
              { path: 'repasses', element: <RegisteredTariffs /> },
              { path: 'cadastrar', element: <AddTariff /> },
              { path: 'editar/:id', element: <EditTariff /> },
            ],
          },
        ],
      },
    ],
  },
];
