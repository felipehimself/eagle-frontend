// import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
// import { CustomTabs } from '@/components/elements/custom-tabs';
// import {
//   CIDADES_TARIFARIO,
//   PERIODO_TARIFARIO,
//   REGRAS_TARIFARIO,
//   TIPO_DA_FROTA,
//   TIPO_VEICULO,
//   TIPOS_TARIFARIO,
//   TIPOS_OPERACAO_TARIFARIO,
//   TRUE_OU_FALSE,
// } from '@/constants';
// import { Formatter } from '@/utils/common';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   Autocomplete,
//   Button,
//   FormControl,
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
// import { TabsLoading } from '@/components/elements/tabs-loading';

// interface ITariffFormComponentProps {
//   isLoading: boolean;
//   onSubmit: (data: TTariffSchema) => void;
//   shouldDisable: boolean;
//   initialData?: TTariffSchema;
//   isSubmitting?: boolean;
// }

// export const TariffFormComponent = (props: ITariffFormComponentProps) => {
//   const navigate = useNavigate();

//   const [tabValue, setTabValue] = useState(0);

//   const f = new Formatter();

//   const { data: CLIENTS, isLoading: isLoadingClients } = useGetClients({});

//   const { data: REGIONS, isLoading: isLoadingRegions } = useGetRegions({});

//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//     watch,
//     setValue,
//     getValues,
//     setError,
//     clearErrors,
//     reset,
//   } = useForm<TTariffSchema>({
//     resolver: zodResolver(tariffSchema),
//     defaultValues: props.initialData || {},
//   });

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const onSubmit = (data: TTariffSchema) => {
//     props.onSubmit(data);
//     console.log(data);
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
//     <Stack spacing={6}>
//       <Paper
//         component='form'
//         noValidate
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ py: 2, pb: 2 }}
//       >
//         <CustomTabs
//           value={tabValue}
//           handleChange={handleChange}
//           tabLabels={TABS_VALUES}
//         />

//         <CustomTabPanel value={tabValue} index={0}>
//           <Grid container p={2} spacing={6}>
//             <Grid size={{ xs: 12, md: 4 }}>
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

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipoDeVeiculo}>
//                 <InputLabel
//                 // shrink={Boolean(
//                 //   control._formValues.possuiContratoAssinado?.length
//                 // )}
//                 >
//                   Tipo Veículo
//                 </InputLabel>
//                 <Controller
//                   name='tipoDeVeiculo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Veículo'
//                       disabled={props.shouldDisable}
//                     >
//                       {/* TODO: VAI TER API? */}
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

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.cidade}>
//                 <Controller
//                   name='cidade'
//                   control={control}
//                   render={({ field }) => (
//                     <Autocomplete
//                       {...field}
//                       options={CIDADES_TARIFARIO}
//                       getOptionLabel={(option) => option.nome}
//                       isOptionEqualToValue={(option, value) =>
//                         option.id === value.id
//                       }
//                       value={
//                         CIDADES_TARIFARIO.find(
//                           (r) => field.value?.id === r.id
//                         ) || null
//                       }
//                       onChange={(_, newValue) => {
//                         field.onChange(newValue);
//                       }}
//                       // disabled={disabled}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label='Cidade'
//                           error={!!errors?.cidade}
//                           // helperText={
//                           //   errors?.nomeBanco?.message
//                           // }
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipoDeViagem}>
//                 <InputLabel
//                 // shrink={Boolean(
//                 //   control._formValues.possuiContratoAssinado?.length
//                 // )}
//                 >
//                   Tipo Viagem
//                 </InputLabel>
//                 <Controller
//                   name='tipoDeViagem'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Viagem'
//                       disabled={props.shouldDisable}
//                     >
//                       {/* TODO: VAI TER API? */}
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

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipo}>
//                 <InputLabel
//                 // shrink={Boolean(
//                 //   control._formValues.possuiContratoAssinado?.length
//                 // )}
//                 >
//                   Tipo Tarifário
//                 </InputLabel>
//                 <Controller
//                   name='tipo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Tarifário'
//                       disabled={props.shouldDisable}
//                     >
//                       {/* TODO: VAI TER API? */}
//                       {TIPOS_TARIFARIO.map(({ id, nome }) => (
//                         <MenuItem key={nome} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.periodo}>
//                 <InputLabel
//                 // shrink={Boolean(
//                 //   control._formValues.possuiContratoAssinado?.length
//                 // )}
//                 >
//                   Período
//                 </InputLabel>
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
//                       {/* TODO: VAI TER API? */}
//                       {PERIODO_TARIFARIO.map(({ id, nome }) => (
//                         <MenuItem key={nome} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='bonusPorNf'
//                 control={control}
//                 render={({ field, fieldState }) => (
//                   <FormControl fullWidth error={!!fieldState.error}>
//                     <InputLabel htmlFor='outlined-adornment-amount'>
//                       Bônus por NF
//                     </InputLabel>
//                     <OutlinedInput
//                       {...field}
//                       // disabled={shouldDisable}
//                       id='outlined-adornment-amount'
//                       startAdornment={
//                         <InputAdornment position='start'>R$</InputAdornment>
//                       }
//                       label='Bônus por NF'
//                       onChange={(e) => {
//                         const formatted = f.formatMoney(e.target.value);
//                         setValue('bonusPorNf', formatted);
//                       }}
//                     />
//                     {/* {fieldState.error && (
//                       <FormHelperText error>
//                         {fieldState.error.message}
//                       </FormHelperText>
//                     )} */}
//                   </FormControl>
//                 )}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               {isLoadingRegions ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.regiaoBase}>
//                   <InputLabel>Região Base</InputLabel>
//                   <Controller
//                     name='regiaoBase'
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ''}
//                         label='Região Base'
//                         disabled={props.shouldDisable}
//                       >
//                         {REGIONS?.map(({ id, nome }) => (
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

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipoFrota}>
//                 <InputLabel
//                 // shrink={Boolean(control._formValues.apto?.length)}
//                 >
//                   Tipo Frota
//                 </InputLabel>
//                 <Controller
//                   name='tipoFrota'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='tipoFrota'
//                       disabled={props.shouldDisable}
//                     >
//                       {TIPO_DA_FROTA?.map(({ id, nome }) => (
//                         <MenuItem key={nome} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.sdd}>
//                 <InputLabel
//                 // shrink={Boolean(control._formValues.apto?.length)}
//                 >
//                   Super Dedicado
//                 </InputLabel>
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
//                       {TRUE_OU_FALSE.map(({ value, nome }) => (
//                         <MenuItem key={nome} value={String(value)}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               {/* <FormControl fullWidth error={!!errors?.tipoDeCadastro}>
//                 <InputLabel>Tipo de Cadastro</InputLabel>
//                 <Controller
//                   name="tipoDeCadastro"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ""}
//                       label="Tipo de Cadastro"
//                       disabled={props.shouldDisable}
//                       onChange={(e) => {
//                         setValue("tipoDeCadastro", e.target.value);
//                         const ajudante =
//                           e?.target?.value?.toLowerCase() === "ajudante";
//                         if (ajudante) {
//                           setValue("numeroCnh", "");
//                           setValue("categoriaCnh", undefined);
//                           setValue("dataEmissaoCnh", "");
//                           setValue("dataVencimentoCnh", "");
//                           setValue("ufCnh", "");
//                           setValue("municipioCnh", "");
//                           setValue("renach", "");
//                           setValue("espelho", "");
//                         }
//                       }}
//                     >
//                       {TIPOS_DE_CADASTRO.map((tipo) => (
//                         <MenuItem key={tipo} value={tipo}>
//                           {tipo}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl> */}
//             </Grid>
//           </Grid>
//         </CustomTabPanel>

//         <CustomTabPanel value={tabValue} index={1}>
//           <Grid container p={2} mt={4} spacing={6}>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.somenteDomingoFeriado}>
//                 <InputLabel>Somente Domingo/Feriado</InputLabel>
//                 <Controller
//                   name='somenteDomingoFeriado'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Somente Domingo/Feriado'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ value, nome }) => (
//                         <MenuItem key={nome} value={String(value)}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.naoAplicaDomingo}>
//                 <InputLabel>Não se aplica aos Domingos</InputLabel>
//                 <Controller
//                   name='naoAplicaDomingo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Não se aplica aos Domingos'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ value, nome }) => (
//                         <MenuItem key={nome} value={String(value)}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.naoAplicaFeriado}>
//                 <InputLabel>Não se aplica aos Feriados</InputLabel>
//                 <Controller
//                   name='naoAplicaFeriado'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Não se aplica aos Feriados'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ value, nome }) => (
//                         <MenuItem key={nome} value={String(value)}>
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

//         <CustomTabPanel value={tabValue} index={2}>
//           <Grid container p={2} mt={4} spacing={6}>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipoDeRegra}>
//                 <InputLabel
//                 // shrink={Boolean(control._formValues.apto?.length)}
//                 >
//                   Tipo de Regra
//                 </InputLabel>
//                 <Controller
//                   name='tipoDeRegra'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo de Regra'
//                       disabled={props.shouldDisable}
//                     >
//                       {REGRAS_TARIFARIO.map(({ regra, id }) => (
//                         <MenuItem key={regra} value={String(id)}>
//                           {regra}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CustomTabPanel>
//         <CustomTabPanel value={tabValue} index={3}>
//           <Grid container p={2} spacing={6}>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='versionamento'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Versionamento'
//                     error={!!errors?.versionamento}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     // helperText={errors?.rg?.message}
//                   />
//                 )}
//               />
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
//                     error={!!errors?.fim}
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
//               // disabled={!formState.isValid}
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
