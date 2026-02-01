// import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
// import { CustomTabs } from '@/components/elements/custom-tabs';
// import {
//   CIDADES_TARIFARIO,
//   EChaveRegrasTarifario,
//   PERIODO_TARIFARIO,
//   REGRAS_TARIFARIO,
//   TIPO_VEICULO,
//   TIPOS_OPERACAO_TARIFARIO,
//   TIPOS_VIAGEM_TARIFARIO,
//   TIPOS_VINCULO,
//   TRUE_OU_FALSE,
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
// import { useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { TABS_VALUES } from '../constants';
// import { tariffSchema, TTariffSchema } from '../types/tariff.type';

// import { useGetClients } from '@/api/get-clients';
// import { useNavigate } from 'react-router-dom';

// import { useGetRegions } from '@/api/get-regions';
// import { FabButton } from '@/components/elements/fab-button';
// import { TabsLoading } from '@/components/elements/tabs-loading';
// import { ETipoVinculo } from '@/enums';
// // import { useNotification } from '@/hooks/use-notification';
// import { Formatter } from '@/utils/common';
// // import { MRT_ColumnDef } from 'material-react-table';

// interface ITariffFormComponentProps {
//   isLoading: boolean;
//   onSubmit: (data: TTariffSchema) => void;
//   shouldDisable: boolean;
//   initialData?: TTariffSchema;
//   isSubmitting?: boolean;
// }

// // type TDataItem = {
// //   modelo: string;
// //   km: string;
// //   diaria: number;
// //   ate49: number;
// //   ate70: number;
// //   ate80: number;
// //   ate100: number;
// //   acima100: number;
// // };

// // type TColumn = MRT_ColumnDef<TDataItem> & {
// //   columns?: MRT_ColumnDef<TDataItem>[];
// // };

// // const data = [
// //   {
// //     modelo: 'Utilitário',
// //     km: '0-100',
// //     diaria: 260,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     modelo: 'Utilitário',
// //     km: '101-150',
// //     diaria: 290,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     modelo: 'Utilitário',
// //     km: '151-200',
// //     diaria: 340,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     modelo: 'Utilitário',
// //     km: '201-300',
// //     diaria: 390,
// //     ate49: 10,
// //     ate70: 20,
// //     ate80: 30,
// //     ate100: 70,
// //     acima100: 90,
// //   },
// //   {
// //     modelo: 'Utilitário',
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

// export const TariffFormComponent = (props: ITariffFormComponentProps) => {
//   const navigate = useNavigate();
//   // const { addNotification } = useNotification();

//   const [tabValue, setTabValue] = useState(0);

//   const { data: CLIENTS, isLoading: isLoadingClients } = useGetClients({});

//   const { data: REGIONS, isLoading: isLoadingRegions } = useGetRegions({});

//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//     watch,
//     setValue,
//     // getValues,
//     // setError,
//     // clearErrors,
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

//   const onSubmit = (data: TTariffSchema) => {
//     props.onSubmit(data);
//     console.log(data);
//   };

//   const TIPO_VINCULO = watch('tipoVinculo');
//   const RULE = watch('regraVariavel');

//   // const columns = useMemo<TColumn[]>(
//   //   () => [
//   //     {
//   //       header: 'Veículo',
//   //       columns: [
//   //         {
//   //           accessorKey: 'modelo',
//   //           header: 'Modelo',
//   //           size: 110,
//   //         },
//   //       ],
//   //     },

//   //     {
//   //       header: 'Tarifa',
//   //       columns: [
//   //         {
//   //           accessorKey: 'km',
//   //           header: 'Km',
//   //           size: 110,
//   //         },
//   //         {
//   //           accessorKey: 'diaria',
//   //           header: 'Diária',
//   //           Cell: ({ cell }) => format.format(cell.getValue() as number),
//   //           size: 110,
//   //         },
//   //       ],
//   //     },

//   //     {
//   //       header: 'Bônus por Parada',

//   //       columns: [
//   //         {
//   //           accessorKey: 'ate49',
//   //           header: '1 até 49',
//   //           Cell: ({ cell }) => format.format(cell.getValue() as number),
//   //           size: 110,
//   //         },
//   //         {
//   //           accessorKey: 'ate70',
//   //           header: '50 até 70',
//   //           Cell: ({ cell }) => format.format(cell.getValue() as number),
//   //           size: 110,
//   //         },
//   //         {
//   //           accessorKey: 'ate80',
//   //           header: '71 até 80',
//   //           Cell: ({ cell }) => format.format(cell.getValue() as number),
//   //           size: 110,
//   //         },
//   //         {
//   //           accessorKey: 'ate100',
//   //           header: '81 até 100',
//   //           Cell: ({ cell }) => format.format(cell.getValue() as number),
//   //           size: 110,
//   //         },
//   //         {
//   //           accessorKey: 'acima100',
//   //           header: '>100',
//   //           Cell: ({ cell }) => format.format(cell.getValue() as number),
//   //           size: 110,
//   //         },
//   //       ],
//   //     },
//   //   ],
//   //   []
//   // );

//   // const renderTabContent = useCallback(() => {
//   //   switch (tipoVinculo?.toUpperCase()) {
//   //     case ETipoVinculo.Frota:
//   //       return (
//   //         <Grid p={2} container spacing={6}>
//   //           <Grid size={{ xs: 12, md: 4 }}>
//   //             <Controller
//   //               name='diariaMotoristaFrota'
//   //               control={control}
//   //               render={({ field, fieldState }) => (
//   //                 <FormControl fullWidth error={!!fieldState.error}>
//   //                   <InputLabel htmlFor='outlined-adornment-amount'>
//   //                     Diária Motorista
//   //                   </InputLabel>
//   //                   <OutlinedInput
//   //                     {...field}
//   //                     disabled={props.shouldDisable}
//   //                     startAdornment={
//   //                       <InputAdornment position='start'>R$</InputAdornment>
//   //                     }
//   //                     label='Diária Motorista'
//   //                     onChange={(e) => {
//   //                       const formatted = f.formatMoney(e.target.value);
//   //                       setValue('diariaMotoristaFrota', formatted);
//   //                     }}
//   //                   />
//   //                 </FormControl>
//   //               )}
//   //             />
//   //           </Grid>
//   //           <Grid size={{ xs: 12, md: 4 }}>
//   //             <Controller
//   //               name='diariaMotoristaFrotaDomFeriado'
//   //               control={control}
//   //               render={({ field, fieldState }) => (
//   //                 <FormControl fullWidth error={!!fieldState.error}>
//   //                   <InputLabel htmlFor='outlined-adornment-amount'>
//   //                     Diária Motorista Domingo e Feriado
//   //                   </InputLabel>
//   //                   <OutlinedInput
//   //                     {...field}
//   //                     disabled={props.shouldDisable}
//   //                     startAdornment={
//   //                       <InputAdornment position='start'>R$</InputAdornment>
//   //                     }
//   //                     label='Diária Motorista Domingo e Feriado'
//   //                     onChange={(e) => {
//   //                       const formatted = f.formatMoney(e.target.value);
//   //                       setValue('diariaMotoristaFrotaDomFeriado', formatted);
//   //                     }}
//   //                   />
//   //                 </FormControl>
//   //               )}
//   //             />
//   //           </Grid>
//   //         </Grid>
//   //       );
//   //       break;

//   //     case ETipoVinculo.Agregado:
//   //       return (
//   //         <GenericMRT
//   //           columns={columns}
//   //           data={data}
//   //           enableFullScreenToggle={false}
//   //           enableColumnResizing={false}
//   //           enableFilters={false}
//   //           enableHiding={false}
//   //           enableTopToolbar={false}
//   //           muiTableHeadRowProps={{ sx: { ...tableHeadRowStyle } }}
//   //           muiTableHeadCellProps={{ sx: { ...tableHeadCellStyle } }}
//   //         />
//   //       );

//   //     default:
//   //       return <></>;
//   //   }
//   // }, [tipoVinculo, control, props.shouldDisable, setValue, columns]);

//   // const disableTabs = useMemo(() => {
//   //   return !tipoVinculo || !cliente || !tipoVeiculo;
//   // }, [tipoVinculo, cliente, tipoVeiculo]);

//   const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const RULES_CONTENT = {
//     [EChaveRegrasTarifario.POR_CIDADE]: (
//       <>
//         <Grid size={{ xs: 12, md: 4 }}>
//           <FormControl fullWidth error={!!errors?.regraDiariaCidade}>
//             <InputLabel>Cidade</InputLabel>
//             <Controller
//               name='regraDiariaCidade'
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   value={field.value || ''}
//                   label='Cidade'
//                   disabled={props.shouldDisable}
//                 >
//                   {CIDADES_TARIFARIO.map(({ id, nome }) => (
//                     <MenuItem key={nome} value={id}>
//                       {nome}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//           </FormControl>
//         </Grid>

//         <Grid size={{ xs: 12, md: 4 }}>
//           <Controller
//             name='diariaMotorista'
//             control={control}
//             render={({ field, fieldState }) => (
//               <FormControl fullWidth error={!!fieldState.error}>
//                 <InputLabel htmlFor='outlined-adornment-amount'>
//                   Diária Motorista
//                 </InputLabel>
//                 <OutlinedInput
//                   {...field}
//                   disabled={props.shouldDisable}
//                   id='outlined-adornment-amount'
//                   startAdornment={
//                     <InputAdornment position='start'>R$</InputAdornment>
//                   }
//                   label='Diária Motorista'
//                   onChange={(e) => {
//                     const formatted = f.formatMoney(e.target.value);
//                     setValue('diariaMotorista', formatted);
//                   }}
//                 />
//               </FormControl>
//             )}
//           />
//         </Grid>
//       </>
//     ),

//     [EChaveRegrasTarifario.CIDADE_E_VEICULO]: (
//       <>
//         <Grid size={{ xs: 12, md: 4 }}>
//           <FormControl fullWidth error={!!errors?.regraDiariaCidade}>
//             <InputLabel>Cidade</InputLabel>
//             <Controller
//               name='regraDiariaCidade'
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   value={field.value || ''}
//                   label='Cidade'
//                   disabled={props.shouldDisable}
//                 >
//                   {CIDADES_TARIFARIO.map(({ id, nome }) => (
//                     <MenuItem key={nome} value={id}>
//                       {nome}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//           </FormControl>
//         </Grid>

//         <Grid size={{ xs: 12, md: 4 }}>
//           <FormControl fullWidth error={!!errors?.tipoVeiculo}>
//             <InputLabel>Tipo Veículo</InputLabel>
//             <Controller
//               name='tipoVeiculo'
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   value={field.value || ''}
//                   label='Tipo Veículo'
//                   disabled={props.shouldDisable}
//                 >
//                   {TIPO_VEICULO.map(({ id, nome }) => (
//                     <MenuItem key={nome} value={id}>
//                       {nome}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//           </FormControl>
//         </Grid>

//         <Grid size={{ xs: 12, md: 4 }}>
//           <Controller
//             name='diariaMotorista'
//             control={control}
//             render={({ field, fieldState }) => (
//               <FormControl fullWidth error={!!fieldState.error}>
//                 <InputLabel htmlFor='outlined-adornment-amount'>
//                   Diária Motorista
//                 </InputLabel>
//                 <OutlinedInput
//                   {...field}
//                   disabled={props.shouldDisable}
//                   id='outlined-adornment-amount'
//                   startAdornment={
//                     <InputAdornment position='start'>R$</InputAdornment>
//                   }
//                   label='Diária Motorista'
//                   onChange={(e) => {
//                     const formatted = f.formatMoney(e.target.value);
//                     setValue('diariaMotorista', formatted);
//                   }}
//                 />
//               </FormControl>
//             )}
//           />
//         </Grid>
//       </>
//     ),
//   };

//   const renderRuleContent = (value: number | undefined) => {
//     if (!value) return <></>;
//     const key = REGRAS_TARIFARIO.find((r) => r.id === value)!.chave;

//     return RULES_CONTENT[key];
//   };

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
//               {isLoadingClients ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.cliente}>
//                   <InputLabel
//                   // shrink={Boolean(control._formValues.apto?.length)}
//                   >
//                     Cliente
//                   </InputLabel>
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
//                         {CLIENTS?.map(({ id, nome }) => (
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
//               {props.shouldDisable || isLoadingRegions ? (
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
//                         {REGIONS?.map(({ nome, id }) => (
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
//                       {TIPO_VEICULO.map(({ id, nome }) => (
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
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.periodo}>
//                 <InputLabel>Período</InputLabel>
//                 <Controller
//                   name='periodo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Período'
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
//             </Grid>

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
//                               checked={field.value}
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
//                               checked={field.value}
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
//                               checked={field.value}
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
//                                 checked={field.value}
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
//                             <InputLabel htmlFor='outlined-adornment-amount'>
//                               Valor
//                             </InputLabel>
//                             <OutlinedInput
//                               {...field}
//                               disabled={props.shouldDisable}
//                               id='outlined-adornment-amount'
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
//                 {/* </FormControl> */}
//               </Stack>
//             </Grid>
//           </Grid>
//         </CustomTabPanel>

//         {/* REGRAS */}
//         <CustomTabPanel value={tabValue} index={2}>
//           <Grid container p={2} spacing={6}>
//             <Grid size={{ xs: 4 }}>
//               <FormControl fullWidth error={!!errors?.regraVariavel}>
//                 {/* TODO: sempre que tiver on change, limpar os campos conficionais do renderRuleContent */}
//                 <InputLabel>Variável</InputLabel>
//                 <Controller
//                   name='regraVariavel'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Variável'
//                       disabled={props.shouldDisable}
//                     >
//                       {REGRAS_TARIFARIO.map(({ id, regra }) => (
//                         <MenuItem key={regra} value={id}>
//                           {regra}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 8 }}></Grid>
//             {renderRuleContent(RULE)}
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
//       {tabValue === 1 &&
//         TIPO_VINCULO?.toUpperCase() === ETipoVinculo.Agregado && (
//           <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
//             <FabButton
//               onClick={() => {}}
//               size='large'
//               icon='ADD'
//               title='Adicionar'
//               scale={1}
//             />
//           </Box>
//         )}
//     </Stack>
//   );
// };
