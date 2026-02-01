// import { PageHeader } from '@/components/elements/page-header';
// // import { DriverFormComponent } from "../components/driver-form-component";
// import { useGetDriverData } from '@/api/get-driver-data';
// import { Stack } from '@mui/material';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';

// export const EditTariff = () => {
//   const { id } = useParams();

//   const [shouldDisable, setShouldDisable] = useState(true);

//   const { data: driverData, isLoading: isDriverDataLoading } = useGetDriverData(
//     {
//       config: {
//         enabled: Boolean(id),
//       },
//       id: id!,
//     },
//   );

//   console.log({ driverData });

//   return (
//     <Stack spacing={6}>
//       <PageHeader
//         handleEdit={() => setShouldDisable((prev) => !prev)}
//         disableEditButton={isDriverDataLoading}
//         title='Tarifário'
//         subtitle={shouldDisable ? 'Dados do cadastro' : 'Editando cadastro'}
//         showBackButton
//       />

//       {/* <DriverFormComponent
//         isLoading={isDriverDataLoading}
//         onSubmit={(data) => {
//           console.log("data", data);
//           // queryClienti.invalidateQueries({ queryKey: ["useGetDriverData", id] });
//         }}
//         shouldDisable={shouldDisable}
//         initialData={driverData}
//       /> */}
//     </Stack>
//   );
// };
