// import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
// import { CustomTabs } from '@/components/elements/custom-tabs';
// import {
//   CIDADES_TARIFARIO,
//   TARIFARIO_KM,
//   TIPOS_OPERACAO_TARIFARIO,
//   TIPOS_VEICULO,
//   TIPOS_VIAGEM_TARIFARIO,
//   TIPOS_VINCULO,
// } from '@/constants';
// // import { Formatter } from '@/utils/common';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   Grid,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Paper,
//   Select,
//   Skeleton,
//   Stack,
//   TextField,
// } from '@mui/material';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { TABS_VALUES } from '../constants';
// import { tariffSchema, TTariffSchema } from '../types/tariff.type';

// import { useGetClients } from '@/api/get-clients';
// import { useNavigate } from 'react-router-dom';

// import { useGetRegions } from '@/api/get-regions';
// import { TabsLoading } from '@/components/elements/tabs-loading';
// // import { useNotification } from '@/hooks/use-notification';
// import { FabButton } from '@/components/elements/fab-button';
// import { GenericMRT } from '@/components/elements/generic-mrt';
// import { ETipoServico, ETipoVinculo } from '@/enums';
// import { tableHeadCellStyle, tableHeadRowStyle } from '@/styles';
// import { Formatter } from '@/utils/common';
// import { MRT_ColumnDef } from 'material-react-table';
// import { MrtRowWrapper } from './mrt-row-wrapper';

// const FIELDS_TO_CLEAN = [
//   'tipoVeiculo',
//   'tipoVinculo',
//   'cidade',
//   'domingoOuFeriado',
// ];

// type TTariffSchemaKey = keyof TTariffSchema;

// type TDataItem = {
//   // tipo: string;
//   km: string;
//   diaria: number;
//   ate49: number;
//   ate70: number;
//   ate80: number;
//   ate100: number;
//   acima100: number;
// };

// type TColumn = MRT_ColumnDef<TDataItem> & {
//   columns?: MRT_ColumnDef<TDataItem>[];
// };

// // const data = [
// //   {
// //     tipo: 'Utilitário',
// //     km: '0-100',
// //     diaria: 260,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     tipo: 'Utilitário',
// //     km: '101-150',
// //     diaria: 290,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     tipo: 'Utilitário',
// //     km: '151-200',
// //     diaria: 340,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     tipo: 'Utilitário',
// //     km: '201-300',
// //     diaria: 390,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     tipo: 'Utilitário',
// //     km: '>300',
// //     diaria: 440,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// // ];

// // const format = new Intl.NumberFormat('pt-BR', {
// //   style: 'currency',
// //   currency: 'BRL',
// //   minimumFractionDigits: 2,
// // });

// const f = new Formatter();

// interface ITariffFormComponentProps {
//   isLoading: boolean;
//   onSubmit: (data: TTariffSchema) => void;
//   shouldDisable: boolean;
//   initialData?: TTariffSchema;
//   isSubmitting?: boolean;
// }
// export const TariffFormComponent = (props: ITariffFormComponentProps) => {
//   const navigate = useNavigate();
//   const [dataGridRules, setDataGridRules] = useState<TDataItem[]>([]);
//   const [mostrarCidade, setMostrarCidade] = useState(false);
//   // const { addNotification } = useNotification();

//   const [tabValue, setTabValue] = useState(0);

//   const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleAddRuleRow = () => {
//     setDataGridRules((prev) => [
//       ...prev,
//       {
//         tipo: '',
//         km: '',
//         diaria: 0,
//         ate49: 0,
//         ate70: 0,
//         ate80: 0,
//         ate100: 0,
//         acima100: 0,
//       },
//     ]);
//   };

//   const { data: CLIENTES, isLoading: isLoadingClientes } = useGetClients({});
//   const { data: REGIOES, isLoading: isLoadingRegioes } = useGetRegions({});

//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//     watch,
//     setValue,
//     reset,
//   } = useForm<TTariffSchema>({
//     resolver: zodResolver(tariffSchema),
//     defaultValues: props.initialData || {},
//   });

//   useEffect(() => {
//     if (props.initialData) {
//       reset(props.initialData);
//     }
//   }, [props.initialData, reset]);

//   const tipoServico = watch('tipoServico');
//   const tipoVeiculo = watch('tipoVeiculo');
//   const tipoVinculo = watch('tipoVinculo');
//   console.log({ tipoServico });
//   console.log({ tipoVinculo });

//   const disableCidade = useMemo(() => {
//     if (tipoServico === undefined || tipoVinculo === undefined) return false;

//     return (
//       tipoServico.toLowerCase() === ETipoServico.Cliente &&
//       tipoVinculo.toLowerCase() === ETipoVinculo.Agregado
//     );
//   }, [tipoServico, tipoVinculo]);

//   const onSubmit = (data: TTariffSchema) => {
//     props.onSubmit(data);
//     console.log(data);
//   };

//   const columns = useMemo<TColumn[]>(
//     () => [
//       {
//         header: 'Tarifa',
//         grow: true,
//         columns: [
//           {
//             accessorKey: 'km',
//             header: 'Km',
//             size: 110,
//             Cell: ({ cell }) => {
//               return (
//                 <MrtRowWrapper>
//                   <Select
//                     fullWidth
//                     value={''}
//                     // label='Tipo Veículo'
//                     disabled={props.shouldDisable}
//                     variant='standard'
//                   >
//                     {TARIFARIO_KM.map(({ value, id }) => (
//                       <MenuItem key={value} value={id}>
//                         {value}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </MrtRowWrapper>
//               );
//             },
//           },
//           {
//             accessorKey: 'diaria',
//             header: 'Diária',

//             size: 110,
//             Cell: ({ cell }) => {
//               return (
//                 <MrtRowWrapper>
//                   <TextField
//                     fullWidth
//                     label='R$'
//                     variant='standard'
//                     // error={!!fieldState.error}
//                     // helperText={fieldState.error?.message}
//                     // slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     slotProps={{
//                       inputLabel: { size: 'small', sx: { fontSize: 12 } },
//                     }}
//                     onChange={(e) => {
//                       // const formatted = f.formatOnlyNumber(e.target.value);
//                       // setValue('km', formatted); // FIXME: vou tratar como numero?
//                     }}
//                   />
//                 </MrtRowWrapper>
//               );
//             },
//           },
//         ],
//       },

//       {
//         header: 'Bônus por Parada',
//         grow: true,
//         columns: [
//           {
//             accessorKey: 'ate49',
//             header: '1 até 49',
//             Cell: ({ cell }) => {
//               return (
//                 <MrtRowWrapper>
//                   <TextField
//                     fullWidth
//                     label='R$'
//                     variant='standard'
//                     // error={!!fieldState.error}
//                     // helperText={fieldState.error?.message}
//                     // slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     slotProps={{
//                       inputLabel: { size: 'small', sx: { fontSize: 12 } },
//                     }}
//                     onChange={(e) => {
//                       // const formatted = f.formatOnlyNumber(e.target.value);
//                       // setValue('km', formatted); // FIXME: vou tratar como numero?
//                     }}
//                   />
//                 </MrtRowWrapper>
//               );
//             },
//             size: 110,
//           },
//           {
//             accessorKey: 'ate70',
//             header: '50 até 70',
//             Cell: ({ cell }) => {
//               return (
//                 <Box pt={1}>
//                   <MrtRowWrapper>
//                     <TextField
//                       fullWidth
//                       label='R$'
//                       variant='standard'
//                       // error={!!fieldState.error}
//                       // helperText={fieldState.error?.message}
//                       // slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                       slotProps={{
//                         inputLabel: { size: 'small', sx: { fontSize: 12 } },
//                       }}
//                       onChange={(e) => {
//                         // const formatted = f.formatOnlyNumber(e.target.value);
//                         // setValue('km', formatted); // FIXME: vou tratar como numero?
//                       }}
//                     />
//                   </MrtRowWrapper>
//                 </Box>
//               );
//             },
//             size: 110,
//           },
//           {
//             accessorKey: 'ate80',
//             header: '71 até 80',
//             Cell: ({ cell }) => {
//               return (
//                 <MrtRowWrapper>
//                   <TextField
//                     fullWidth
//                     label='R$'
//                     variant='standard'
//                     // error={!!fieldState.error}
//                     // helperText={fieldState.error?.message}
//                     // slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     slotProps={{
//                       inputLabel: { size: 'small', sx: { fontSize: 12 } },
//                     }}
//                     onChange={(e) => {
//                       // const formatted = f.formatOnlyNumber(e.target.value);
//                       // setValue('km', formatted); // FIXME: vou tratar como numero?
//                     }}
//                   />
//                 </MrtRowWrapper>
//               );
//             },
//             size: 110,
//           },
//           {
//             accessorKey: 'ate100',
//             header: '81 até 100',
//             Cell: ({ cell }) => {
//               return (
//                 <MrtRowWrapper>
//                   <TextField
//                     fullWidth
//                     label='R$'
//                     variant='standard'
//                     // error={!!fieldState.error}
//                     // helperText={fieldState.error?.message}
//                     // slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     slotProps={{
//                       inputLabel: { size: 'small', sx: { fontSize: 12 } },
//                     }}
//                     onChange={(e) => {
//                       // const formatted = f.formatOnlyNumber(e.target.value);
//                       // setValue('km', formatted); // FIXME: vou tratar como numero?
//                     }}
//                   />
//                 </MrtRowWrapper>
//               );
//             },
//             size: 110,
//           },
//           {
//             accessorKey: 'acima100',
//             header: '>100',
//             Cell: ({ cell }) => {
//               return (
//                 <MrtRowWrapper>
//                   <TextField
//                     fullWidth
//                     label='R$'
//                     variant='standard'
//                     // error={!!fieldState.error}
//                     // helperText={fieldState.error?.message}
//                     // slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     slotProps={{
//                       inputLabel: { size: 'small', sx: { fontSize: 12 } },
//                     }}
//                     onChange={(e) => {
//                       // const formatted = f.formatOnlyNumber(e.target.value);
//                       // setValue('km', formatted); // FIXME: vou tratar como numero?
//                     }}
//                   />
//                 </MrtRowWrapper>
//               );
//             },
//             size: 110,
//           },
//         ],
//       },
//     ],
//     [dataGridRules, props.shouldDisable]
//   );

//   const handleCidade = useCallback(
//     (val: boolean) => {
//       setMostrarCidade(val);
//       setValue('cidade', undefined);
//     },
//     [setValue]
//   );

//   const renderRuleContent = useCallback(() => {
//     const isClienteAgregado =
//       tipoServico?.toLowerCase() === ETipoServico.Cliente &&
//       tipoVinculo?.toLowerCase() === ETipoVinculo.Agregado &&
//       tipoVeiculo !== undefined;

//     const isClienteOrFlex =
//       (tipoServico?.toLowerCase() === ETipoServico.Cliente ||
//         tipoServico?.toLowerCase() === ETipoServico.Flex) &&
//       tipoVinculo !== undefined;

//     if (isClienteAgregado) {
//       return (
//         <Grid size={{ xs: 12 }}>
//           <Stack spacing={2}>
//             <GenericMRT
//               columns={columns}
//               data={dataGridRules}
//               enableFullScreenToggle={false}
//               // enableColumnResizing={false}
//               enableFilters={false}
//               enableHiding={false}
//               // enableTopToolbar={false}
//               muiTableHeadRowProps={{ sx: { ...tableHeadRowStyle } }}
//               muiTableHeadCellProps={{ sx: { ...tableHeadCellStyle } }}
//               renderTopToolbarCustomActions={() => (
//                 <>
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       width: '100%',
//                     }}
//                   >
//                     <FormGroup
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       <Controller
//                         name='domingoOuFeriado'
//                         control={control}
//                         render={({ field }) => (
//                           <FormControlLabel
//                             control={
//                               <Checkbox
//                                 checked={field.value || false}
//                                 onChange={(e) =>
//                                   field.onChange(e.target.checked)
//                                 }
//                               />
//                             }
//                             label='Domingo ou Feriado'
//                           />
//                         )}
//                       />
//                     </FormGroup>
//                     <FabButton
//                       onClick={handleAddRuleRow}
//                       size='large'
//                       icon='ADD'
//                       title='Adicionar'
//                       scale={0.8}
//                     />
//                   </Box>
//                 </>
//               )}
//             />
//           </Stack>
//         </Grid>
//       );
//     }

//     if (isClienteOrFlex) {
//       return (
//         <>
//           <Grid size={{ xs: 3 }}>
//             <Controller
//               name='diariaMotorista'
//               control={control}
//               render={({ field, fieldState }) => (
//                 <FormControl fullWidth error={!!fieldState.error}>
//                   <InputLabel htmlFor='outlined-adornment-amount'>
//                     Diária Motorista
//                   </InputLabel>
//                   <OutlinedInput
//                     {...field}
//                     disabled={props.shouldDisable}
//                     id='outlined-adornment-amount'
//                     startAdornment={
//                       <InputAdornment position='start'>R$</InputAdornment>
//                     }
//                     label='Diária Motorista'
//                     onChange={(e) => {
//                       const formatted = f.formatMoney(e.target.value);
//                       setValue('diariaMotorista', formatted);
//                     }}
//                   />
//                 </FormControl>
//               )}
//             />
//           </Grid>
//           <Grid size={{ xs: 3 }}>
//             <Controller
//               name='diariaMotoristaDomFer'
//               control={control}
//               render={({ field, fieldState }) => (
//                 <FormControl fullWidth error={!!fieldState.error}>
//                   <InputLabel htmlFor='outlined-adornment-amount'>
//                     Diária Motorista Domingo e Feriado
//                   </InputLabel>
//                   <OutlinedInput
//                     {...field}
//                     disabled={props.shouldDisable}
//                     id='outlined-adornment-amount'
//                     startAdornment={
//                       <InputAdornment position='start'>R$</InputAdornment>
//                     }
//                     label='Diária Motorista Domingo e Feriado'
//                     onChange={(e) => {
//                       const formatted = f.formatMoney(e.target.value);
//                       setValue('diariaMotoristaDomFer', formatted);
//                     }}
//                   />
//                 </FormControl>
//               )}
//             />
//           </Grid>
//           <Grid size={{ xs: 3 }}>
//             <Controller
//               name='diariaAjudante'
//               control={control}
//               render={({ field, fieldState }) => (
//                 <FormControl fullWidth error={!!fieldState.error}>
//                   <InputLabel htmlFor='outlined-adornment-amount'>
//                     Diária Ajudante
//                   </InputLabel>
//                   <OutlinedInput
//                     {...field}
//                     disabled={props.shouldDisable}
//                     id='outlined-adornment-amount'
//                     startAdornment={
//                       <InputAdornment position='start'>R$</InputAdornment>
//                     }
//                     label='Diária Ajudante'
//                     onChange={(e) => {
//                       const formatted = f.formatMoney(e.target.value);
//                       setValue('diariaAjudante', formatted);
//                     }}
//                   />
//                 </FormControl>
//               )}
//             />
//           </Grid>
//           <Grid size={{ xs: 3 }}>
//             <Controller
//               name='diariaAjudanteDomFer'
//               control={control}
//               render={({ field, fieldState }) => (
//                 <FormControl fullWidth error={!!fieldState.error}>
//                   <InputLabel htmlFor='outlined-adornment-amount'>
//                     Diária Ajudante Domingo e Feriado
//                   </InputLabel>
//                   <OutlinedInput
//                     {...field}
//                     disabled={props.shouldDisable}
//                     id='outlined-adornment-amount'
//                     startAdornment={
//                       <InputAdornment position='start'>R$</InputAdornment>
//                     }
//                     label='Diária Ajudante Domingo e Feriado'
//                     onChange={(e) => {
//                       const formatted = f.formatMoney(e.target.value);
//                       setValue('diariaAjudanteDomFer', formatted);
//                     }}
//                   />
//                 </FormControl>
//               )}
//             />
//           </Grid>
//         </>
//       );
//     }

//     return <></>;
//   }, [
//     tipoServico,
//     tipoVeiculo,
//     tipoVinculo,
//     dataGridRules,
//     columns,
//     control,
//     props.shouldDisable,
//     setValue,
//   ]);

//   if (props.isLoading) return <TabsLoading />; // TODO: PASSAR VALOR OPCIONAL PARA NAO RENDERIZAR MUITAS TABS, SOMENTE O NECESSARIO PARA DAR MATCH NA UI

//   return (
//     <Stack spacing={6}>
//       <Paper
//         component='form'
//         noValidate
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ py: 2, pb: 2 }}
//       >
//         <CustomTabs
//           value={tabValue}
//           handleChange={handleChangeTab}
//           tabLabels={TABS_VALUES}
//         />

//         <CustomTabPanel value={tabValue} index={0}>
//           <Grid container p={2} spacing={6}>
//             <Grid size={{ xs: 12, md: 3 }}>
//               {isLoadingClientes ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.cliente}>
//                   <InputLabel>Cliente</InputLabel>
//                   <Controller
//                     name='cliente'
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ''}
//                         label='Cliente'
//                         disabled={props.shouldDisable}
//                       >
//                         {CLIENTES?.map(({ id, nome }) => (
//                           <MenuItem key={nome} value={id}>
//                             {nome}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                 </FormControl>
//               )}
//             </Grid>

//             <Grid size={{ xs: 12, md: 3 }}>
//               {props.shouldDisable || isLoadingRegioes ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.regiaoBase}>
//                   <InputLabel>Região/Base</InputLabel>
//                   <Controller
//                     name='regiaoBase'
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ''}
//                         label='Região/Base'
//                       >
//                         {REGIOES?.map(({ nome, id }) => (
//                           <MenuItem key={nome} value={id}>
//                             {nome}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                 </FormControl>
//               )}
//             </Grid>

//             {/* <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.tipoVeiculo}>
//                 <InputLabel>Tipo Veículo Faz sentido aqui?</InputLabel>
//                 <Controller
//                   name='tipoVeiculo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Veículo Faz sentido aqui?'
//                       disabled={props.shouldDisable}
//                     >
//                       {TIPOS_VEICULO.map(({ id, nome }) => (
//                         <MenuItem key={nome} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid> */}

//             {/* <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.sdd}>
//                 <InputLabel>Super Dedicado</InputLabel>
//                 <Controller
//                   name='sdd'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Super Dedicado'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
//                         <MenuItem key={nome} value={JSON.stringify(value)}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid> */}

//             {/* TODO: período virar flag em regra */}

//             {/* <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.periodo}>
//                 <InputLabel>
//                   Período faz sentido? Seria no menu recebivel
//                 </InputLabel>
//                 <Controller
//                   name='periodo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Período faz sentido?  Seria no menu recebivel'
//                       disabled={props.shouldDisable}
//                     >
//                       {PERIODO_TARIFARIO.map(({ id, periodo }) => (
//                         <MenuItem key={periodo} value={id}>
//                           {periodo}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid> */}

//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.tipoViagem}>
//                 <InputLabel>Tipo Viagem</InputLabel>
//                 <Controller
//                   name='tipoViagem'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Viagem'
//                       disabled={props.shouldDisable}
//                     >
//                       {TIPOS_VIAGEM_TARIFARIO.map(({ id, nome }) => (
//                         <MenuItem key={nome} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.tipoOperacao}>
//                 <InputLabel>Tipo Operação</InputLabel>
//                 <Controller
//                   name='tipoOperacao'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Operação'
//                       disabled={props.shouldDisable}
//                     >
//                       {TIPOS_OPERACAO_TARIFARIO.map(({ id, nome }) => (
//                         <MenuItem key={nome} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CustomTabPanel>

//         <CustomTabPanel value={tabValue} index={1}>
//           <Grid container p={2} spacing={6}>
//             <Grid size={{ xs: 12 }}>
//               <Stack width='100%'>
//                 <FormGroup>
//                   <Grid size={{ xs: 5 }}>
//                     <Controller
//                       name='somenteDomFeriado'
//                       control={control}
//                       render={({ field }) => (
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={field.value || false}
//                               onChange={(e) => field.onChange(e.target.checked)}
//                             />
//                           }
//                           label='Somente domingo e feriado'
//                         />
//                       )}
//                     />
//                   </Grid>
//                   <Grid size={{ xs: 6 }}>
//                     <Controller
//                       name='naoAplicaDomFeriado'
//                       control={control}
//                       render={({ field }) => (
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={field.value || false}
//                               onChange={(e) => field.onChange(e.target.checked)}
//                             />
//                           }
//                           label='Não aplica domingo e feriado'
//                         />
//                       )}
//                     />
//                   </Grid>
//                   <Grid size={{ xs: 6 }}>
//                     <Controller
//                       name='naoSeAplicaFeriado'
//                       control={control}
//                       render={({ field }) => (
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={field.value || false}
//                               onChange={(e) => field.onChange(e.target.checked)}
//                             />
//                           }
//                           label='Não se aplica feriado'
//                         />
//                       )}
//                     />
//                   </Grid>
//                   <Grid container spacing={6}>
//                     <Grid size={{ xs: 4 }}>
//                       <Controller
//                         name='aplicaseOnde'
//                         control={control}
//                         render={({ field }) => (
//                           <FormControlLabel
//                             control={
//                               <Checkbox
//                                 checked={field.value || false}
//                                 onChange={(e) =>
//                                   field.onChange(e.target.checked)
//                                 }
//                               />
//                             }
//                             label='Aplica-se onde'
//                           />
//                         )}
//                       />
//                     </Grid>
//                     <Grid size={{ xs: 3 }}>
//                       <FormControl fullWidth error={!!errors?.cliente}>
//                         <InputLabel>Parâmetro</InputLabel>
//                         <Controller
//                           name='cliente' // FIXME: corrigir, tem que ir para o tipo....
//                           control={control}
//                           render={({ field }) => (
//                             <Select
//                               {...field}
//                               value={field.value || ''}
//                               label='Parâmetro'
//                               disabled={props.shouldDisable}
//                             >
//                               {['KM'].map((val) => (
//                                 <MenuItem key={val} value={val}>
//                                   {val}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           )}
//                         />
//                       </FormControl>
//                     </Grid>

//                     <Grid size={{ xs: 2 }}>
//                       <FormControl fullWidth error={!!errors?.cliente}>
//                         <InputLabel>Regra</InputLabel>
//                         <Controller
//                           name='cliente' // FIXME: corrigir, tem que ir para o tipo...
//                           control={control}
//                           render={({ field }) => (
//                             <Select
//                               {...field}
//                               value={field.value || ''}
//                               label='Regra'
//                               disabled={props.shouldDisable}
//                             >
//                               {[{ regra: 'Maior que', id: 1 }].map(
//                                 ({ id, regra }) => (
//                                   <MenuItem key={regra} value={id}>
//                                     {regra}
//                                   </MenuItem>
//                                 )
//                               )}
//                             </Select>
//                           )}
//                         />
//                       </FormControl>
//                     </Grid>

//                     <Grid size={{ xs: 3 }}>
//                       <Controller
//                         name='cliente' // FIXME: corrigir, tem que ir para o tipo...
//                         control={control}
//                         render={({ field, fieldState }) => (
//                           <FormControl fullWidth error={!!fieldState.error}>
//                             <InputLabel>Valor</InputLabel>
//                             <OutlinedInput
//                               {...field}
//                               disabled={props.shouldDisable}
//                               startAdornment={
//                                 <InputAdornment position='start'>
//                                   R$
//                                 </InputAdornment>
//                               }
//                               label='Valor'
//                               onChange={(e) => {
//                                 // const formatted = f.formatMoney(e.target.value);
//                                 // setValue('valorDiaria', formatted);
//                               }}
//                             />
//                           </FormControl>
//                         )}
//                       />
//                     </Grid>
//                   </Grid>
//                 </FormGroup>
//               </Stack>
//             </Grid>
//           </Grid>
//         </CustomTabPanel>

//         {/* REGRAS */}
//         <CustomTabPanel value={tabValue} index={2}>
//           <Grid container p={2} spacing={6}>
//             <Grid size={{ xs: 3 }}>
//               <FormControl fullWidth error={!!errors?.tipoServico}>
//                 <InputLabel>Tipo Serviço</InputLabel>
//                 <Controller
//                   name='tipoServico'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Serviço'
//                       disabled={props.shouldDisable}
//                       onChange={(e) => {
//                         // field.onChange(e); // ✅ notify RHF of change
//                         // const value = e.target.value;

//                         // setValue('tipoServico', value);
//                         // setValue('tipoVeiculo', undefined);
//                         // setValue('tipoVinculo', undefined);
//                         // setValue('cidade', undefined);

//                         field.onChange(e); // handles tipoServico
//                         FIELDS_TO_CLEAN.forEach((name) =>
//                           setValue(name as TTariffSchemaKey, undefined, {
//                             shouldValidate: true,
//                           })
//                         );
//                       }}
//                     >
//                       {[
//                         { servico: 'Cliente', id: 1 },
//                         { servico: 'Flex', id: 2 },
//                       ].map(({ servico }) => (
//                         <MenuItem key={servico} value={servico}>
//                           {servico}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.tipoVeiculo}>
//                 <InputLabel>Tipo Veículo</InputLabel>
//                 <Controller
//                   name='tipoVeiculo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Veículo'
//                       disabled={props.shouldDisable}
//                     >
//                       {TIPOS_VEICULO.map(({ id, nome }) => (
//                         <MenuItem key={nome} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.tipoVinculo}>
//                 <InputLabel>Tipo Vínculo</InputLabel>
//                 <Controller
//                   name='tipoVinculo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Vínculo'
//                       disabled={props.shouldDisable}
//                       onChange={(e) => {
//                         setValue('tipoVinculo', e.target.value);
//                         setDataGridRules([]);
//                       }}
//                     >
//                       {TIPOS_VINCULO.map((tipo) => (
//                         <MenuItem key={tipo} value={tipo}>
//                           {tipo}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormGroup
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={mostrarCidade}
//                       onChange={(e) => handleCidade(e.target.checked)}
//                       disabled={props.shouldDisable || disableCidade}
//                     />
//                   }
//                   label='Aplica-se Cidade'
//                 />
//               </FormGroup>
//             </Grid>

//             {mostrarCidade && (
//               <Grid size={{ xs: 12, md: 3 }}>
//                 <FormControl fullWidth error={!!errors?.cidade}>
//                   <InputLabel>Cidade</InputLabel>
//                   <Controller
//                     name='cidade'
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ''}
//                         label='Cidade'
//                         disabled={props.shouldDisable}
//                       >
//                         {CIDADES_TARIFARIO.map(({ nome }) => (
//                           <MenuItem key={nome} value={nome}>
//                             {nome}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                 </FormControl>
//               </Grid>
//             )}
//           </Grid>
//           <Grid container p={2} spacing={6} pt={4}>
//             <>{renderRuleContent()}</>
//           </Grid>
//         </CustomTabPanel>

//         <CustomTabPanel value={tabValue} index={3}>
//           <Grid container p={2} spacing={6}>
//             <Grid size={{ xs: 12 }}>
//               <FormControl>
//                 <Controller
//                   name='versionamento' // FIXME: terá que ir par ao tipo
//                   control={control}
//                   render={({ field }) => (
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={field.value}
//                           onChange={(e) => field.onChange(e.target.checked)}
//                         />
//                       }
//                       label='Versionamento'
//                     />
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='inicio'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Início'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.inicio}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('inicio', formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='fim'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Fim'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.inicio}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('fim', formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </CustomTabPanel>

//         {tabValue === TABS_VALUES.length - 1 && (
//           <Stack
//             direction='row'
//             spacing={2}
//             justifyContent='flex-end'
//             pr={2}
//             pt={2}
//             pb={2}
//           >
//             <Button
//               variant='contained'
//               color='error'
//               type='button'
//               onClick={() => navigate(-1)}
//               //  disabled={!formState.isValid}
//             >
//               Cancelar
//             </Button>
//             <Button
//               variant='contained'
//               color='primary'
//               type='submit'
//               // disabled={!formState.isValid}
//             >
//               Salvar
//             </Button>
//           </Stack>
//         )}
//       </Paper>
//     </Stack>
//   );
// };
