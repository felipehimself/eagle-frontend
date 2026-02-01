// import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
// import { CustomTabs } from '@/components/elements/custom-tabs';
// // import { REGIOES_BASE } from "@/constants";
// import { useGetRegions } from '@/api/get-regions';
// import { TabsLoading } from '@/components/elements/tabs-loading';
// import { Formatter } from '@/utils/common';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button, Grid, Paper, Stack, TextField } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { clientSchema, TClientSchema } from '../types/client.type';

// const TABS_VALUES = ['Cliente'];

// type TClientFormComponentProps = {
//   onSubmit: (data: TClientSchema) => void;
//   initialData?: TClientSchema | undefined;
//   shouldDisable?: boolean;
//   isLoading: boolean;
// };

// export const ClientFormComponent = (props: TClientFormComponentProps) => {
//   const { shouldDisable = false } = props;
//   const [tabValue, setTabValue] = useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const {
//     handleSubmit,
//     formState: { errors },
//     control,

//     setValue,
//     reset,
//   } = useForm<TClientSchema>({
//     resolver: zodResolver(clientSchema),
//     defaultValues: props.initialData || {},
//   });

//   const f = new Formatter();

//   const { data: REGIOES_BASE, isLoading: isRegioesBaseLoading } =
//     useGetRegions();

//   const navigate = useNavigate();

//   console.log({ errors });

//   const onSubmit = (data: TClientSchema) => {
//     props.onSubmit(data);
//   };

//   useEffect(() => {
//     if (props.initialData) {
//       reset(props.initialData);
//     }
//   }, [props.initialData, reset]);

//   if (props.isLoading) {
//     return <TabsLoading />;
//   }

//   return (
//     <Paper
//       component='form'
//       noValidate
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{ py: 2, pb: 2 }}
//     >
//       <CustomTabs
//         fullWidth='standard'
//         value={tabValue}
//         handleChange={handleChange}
//         tabLabels={TABS_VALUES}
//       />

//       <CustomTabPanel value={tabValue} index={0}>
//         <Grid container p={2} spacing={6}>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <Controller
//               name='nome'
//               control={control} // assuming you have control from useForm()
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label='Nome'
//                   fullWidth={true}
//                   disabled={shouldDisable}
//                   error={!!fieldState.error}
//                   // helperText={fieldState.error?.message}
//                 />
//               )}
//             />
//           </Grid>

//           <Grid size={{ xs: 12, md: 6 }}>
//             <Controller
//               name='cnpj'
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   disabled={shouldDisable}
//                   fullWidth
//                   label='CNPJ'
//                   placeholder='XX.XXX.XXX/XXXX-XX'
//                   error={!!fieldState.error}
//                   // helperText={fieldState.error?.message}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     const formattedValue = f.formatCNPJ(value);
//                     setValue('cnpj', formattedValue);
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <Controller
//               name='email'
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   disabled={shouldDisable}
//                   fullWidth
//                   label='Email'
//                   error={!!fieldState.error}
//                   // helperText={fieldState.error?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <Controller
//               name='telefone'
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   disabled={shouldDisable}
//                   fullWidth
//                   label='Telefone'
//                   placeholder='(XX) XXXXX-XXXX'
//                   error={!!fieldState.error}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     const formattedValue = f.formatPhone(value);
//                     setValue('telefone', formattedValue);
//                   }}
//                   // helperText={fieldState.error?.message}
//                 />
//               )}
//             />
//           </Grid>
//         </Grid>
//       </CustomTabPanel>

//       {tabValue === TABS_VALUES.length - 1 && (
//         <Stack
//           direction='row'
//           spacing={2}
//           justifyContent='flex-end'
//           pr={6}
//           pt={1}
//           pb={2}
//         >
//           <Button
//             variant='contained'
//             color='error'
//             type='button'
//             onClick={() => navigate(-1)}
//             disabled={shouldDisable}
//           >
//             Cancelar
//           </Button>
//           <Button
//             variant='contained'
//             color='primary'
//             type='submit'
//             disabled={shouldDisable}
//           >
//             Salvar
//           </Button>
//         </Stack>
//       )}
//     </Paper>
//   );
// };
