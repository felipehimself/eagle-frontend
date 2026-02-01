// import { useGetBanks } from '@/api/get-banks';
// import { useGetClients } from '@/api/get-clients';
// import { useGetLogradouroPorCEP } from '@/api/get-logradouro-por-cep';
// import { useGetMunicipiosByUFId } from '@/api/get-municipios-by-uf-id';
// import { useGetUFs } from '@/api/get-ufs';
// import { CustomTabPanel } from '@/components/elements/custom-tab-panel';
// import { CustomTabs } from '@/components/elements/custom-tabs';
// import { VisuallyHiddenInput } from '@/components/elements/visually-hidden-input';
// import {
//   ATIVO_INATIVO,
//   CATEGORIAS_CNH,
//   CEP_LENGTH_COM_SEPARADOR,
//   SITUACOES_CADASTRAIS,
//   TIPOS_CHAVE_PIX,
//   TIPOS_CONTA_BANCARIA,
//   TIPOS_DE_CADASTRO,
//   TRUE_OU_FALSE,
// } from '@/constants';
// import { Formatter } from '@/utils/common';
// import { zodResolver } from '@hookform/resolvers/zod';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import {
//   Autocomplete,
//   Button,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Skeleton,
//   Stack,
//   TextField,
// } from '@mui/material';
// import { useEffect, useMemo, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { TABS_VALUES } from '../constants';
// import { driverSchema, TDriverSchema } from '../types/driver.type';

// import { useGetTiposVinculo } from '@/api/get-tipos-vinculo';
// import { TabsLoading } from '@/components/elements/tabs-loading';

// interface IDriverFormComponentProps {
//   isLoading: boolean;
//   onSubmit: (data: TDriverSchema) => void;
//   shouldDisable: boolean;
//   initialData?: TDriverSchema;
//   isSubmitting?: boolean;
// }
// const f = new Formatter();

// export const DriverFormComponent = (props: IDriverFormComponentProps) => {
//   const navigate = useNavigate();

//   const [tabValue, setTabValue] = useState(0);

//   const { data: clients, isLoading: _isLoadingClients } = useGetClients({});
//   const { data: UFS_RESP, isLoading: isLoadingUFs } = useGetUFs({});
//   const { data: BANKS, isLoading: isLoadingBanks } = useGetBanks({
//     config: {
//       select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
//     },
//   });

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
//   } = useForm<TDriverSchema>({
//     resolver: zodResolver(driverSchema),
//     defaultValues: props.initialData || {},
//   });

//   const prestaServicoTerceiros = watch('prestaServicoTerceiros');
//   const enderecoCEP = watch('cep');
//   const habilitacaoFieldUF = watch('ufCnh');
//   const nomeBancoField = watch('nomeBanco');

//   const tipoCadastroSelecionado = watch('tipoDeCadastro');

//   const eAjudante =
//     tipoCadastroSelecionado == undefined ||
//     tipoCadastroSelecionado?.toLowerCase() === 'ajudante';

//   const habilitacaoUfId = useMemo(() => {
//     if (UFS_RESP === undefined || isLoadingUFs) return null;
//     if (!habilitacaoFieldUF) return null;

//     return UFS_RESP.find((uf) => uf.sigla === habilitacaoFieldUF)?.id;
//   }, [habilitacaoFieldUF, UFS_RESP, isLoadingUFs]);

//   const { data: MUNICIPIOS_POR_UF, isLoading: isLoadingMunicipiosPorUF } =
//     useGetMunicipiosByUFId({
//       config: {
//         enabled: Boolean(habilitacaoUfId),
//       },
//       id: habilitacaoUfId!,
//     });

//   const { data: _logradouroData, isLoading: isLoadingLogradouroData } =
//     useGetLogradouroPorCEP({
//       config: {
//         enabled:
//           Boolean(enderecoCEP) &&
//           enderecoCEP.length === CEP_LENGTH_COM_SEPARADOR,
//         onSuccess: (data) => {
//           setValue('logradouro', data.logradouro);
//           setValue('complemento', data.complemento);
//           setValue('uf', data.uf);
//           setValue('bairro', data.bairro);
//           setValue('municipio', data.localidade);
//         },
//       },
//       cep: enderecoCEP ? enderecoCEP.replace('-', '') : '',
//     });

//   const { data: tiposVinculo, isLoading: isLoadingTiposVinculo } =
//     useGetTiposVinculo({
//       config: {
//         select: (data) => {
//           return data.sort((a, b) => a.nome.localeCompare(b.nome));
//         },
//       },
//     });

//   const bankCodeToFillOut = useMemo(() => {
//     if (!nomeBancoField || BANKS === undefined) {
//       setValue('codigoBanco', '');
//       return undefined;
//     }

//     const codigo = BANKS.find((bank) => bank.name === nomeBancoField)?.code;
//     setValue('codigoBanco', String(codigo)!);
//     return codigo;
//   }, [nomeBancoField, BANKS, setValue]);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const onSubmit = (data: TDriverSchema) => {
//     if (prestaServicoTerceiros) {
//       const formValues = getValues();
//       let hasError = false;
//       if (!formValues?.cnpjTerceiros) {
//         setError('cnpjTerceiros', {
//           type: 'manual',
//           message: 'Inválido',
//         });
//         hasError = true;
//       }
//       if (!formValues?.nomeRazaoSocialTerceiros?.trim()) {
//         setError('nomeRazaoSocialTerceiros', {
//           type: 'manual',
//           message: 'Inválido',
//         });
//         hasError = true;
//       }

//       if (hasError) return;
//     }
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
//               <FormControl fullWidth error={!!errors?.apto}>
//                 <InputLabel
//                 // shrink={Boolean(control._formValues.apto?.length)}
//                 >
//                   Apto
//                 </InputLabel>
//                 <Controller
//                   name='apto'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Apto'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
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
//               <FormControl fullWidth error={!!errors?.possuiContratoAssinado}>
//                 <InputLabel
//                 // shrink={Boolean(
//                 //   control._formValues.possuiContratoAssinado?.length
//                 // )}
//                 >
//                   Possui Contrato Assinado
//                 </InputLabel>
//                 <Controller
//                   name='possuiContratoAssinado'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Possui Contrato Assinado'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
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
//               <FormControl fullWidth error={!!errors?.donoVeiculo}>
//                 <InputLabel>Dono Veículo</InputLabel>
//                 <Controller
//                   name='donoVeiculo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Dono Veículo'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
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
//               <FormControl fullWidth error={!!errors?.veiculoResponsabilidade}>
//                 <InputLabel>Mais de 1 Veículo Responsabilidade</InputLabel>
//                 <Controller
//                   name='veiculoResponsabilidade'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Mais de 1 Veículo Responsabilidade'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
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
//               <Controller
//                 name='nome'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Nome'
//                     error={!!errors?.nome}
//                     disabled={props.shouldDisable}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='dataNascimento'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Data de Nascimento'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.dataNascimento}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('dataNascimento', formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               {isLoadingUFs ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.ufNaturalidade}>
//                   <InputLabel>UF Naturalidade</InputLabel>
//                   <Controller
//                     name='ufNaturalidade'
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         value={field.value || ''}
//                         label='UF Naturalidade'
//                         disabled={props.shouldDisable}
//                       >
//                         {UFS_RESP!.map(({ sigla }) => (
//                           <MenuItem key={sigla} value={sigla}>
//                             {sigla}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                 </FormControl>
//               )}
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='celular' // TODO: mudar
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Celular'
//                     error={!!errors?.celular}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     // helperText={errors?.celular?.message}
//                     onChange={(e) => {
//                       const formatted = f.formatPhone(e.target.value);
//                       setValue('celular', formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='email'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='E-mail'
//                     error={!!errors?.email}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     // helperText={errors?.email?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.status}>
//                 <InputLabel>Status</InputLabel>
//                 <Controller
//                   name='status'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Status'
//                       disabled={props.shouldDisable}
//                     >
//                       {ATIVO_INATIVO.map((status) => (
//                         <MenuItem key={status} value={status}>
//                           {status}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipoDeCadastro}>
//                 <InputLabel>Tipo de Cadastro</InputLabel>
//                 <Controller
//                   name='tipoDeCadastro'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo de Cadastro'
//                       disabled={props.shouldDisable}
//                       onChange={(e) => {
//                         setValue('tipoDeCadastro', e.target.value);
//                         const ajudante =
//                           e?.target?.value?.toLowerCase() === 'ajudante';
//                         if (ajudante) {
//                           setValue('numeroCnh', '');
//                           setValue('categoriaCnh', undefined);
//                           setValue('dataEmissaoCnh', '');
//                           setValue('dataVencimentoCnh', '');
//                           setValue('ufCnh', '');
//                           setValue('municipioCnh', '');
//                           setValue('renach', '');
//                           setValue('espelho', '');
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
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipoDeVinculo}>
//                 <InputLabel>Tipo de Vínculo</InputLabel>
//                 <Controller
//                   name='tipoDeVinculo'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo de Vínculo'
//                       disabled={props.shouldDisable}
//                     >
//                       {tiposVinculo?.map(({ id, nome }) => (
//                         <MenuItem key={nome + '-' + id} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.cliente}>
//                 <InputLabel
//                 // shrink={Boolean(control._formValues.cliente?.length)}
//                 >
//                   Cliente
//                 </InputLabel>
//                 <Controller
//                   name='cliente'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || []}
//                       multiple
//                       label='Cliente'
//                       disabled={props.shouldDisable}
//                     >
//                       {/* // TODO: ver como aparecer o nome mais eu receber o valor, id */}
//                       {clients?.map(({ nome, id }) => (
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
//                 name='dataInicio'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Data Início'
//                     error={!!errors?.dataInicio}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     // helperText={errors?.dataInicio?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='placa'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Placa'
//                     error={!!errors?.placa}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatLicensePlate(e.target.value);
//                       setValue('placa', formatted);
//                     }}
//                     // helperText={errors?.placa?.message}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 2 }}>
//               <Controller
//                 name='numeroIdMeli'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='ID Meli'
//                     error={!!errors?.numeroIdMeli}
//                     disabled={props.shouldDisable}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}

//                     // helperText={errors?.numeroIdMeli?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 2 }}>
//               <Controller
//                 name='numeroIdShopee'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='ID Shopee'
//                     error={!!errors?.numeroIdShopee}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     // helperText={errors?.numeroIdShopee?.message}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </CustomTabPanel>
//         <CustomTabPanel value={tabValue} index={1}>
//           <Grid container p={2} mt={4} spacing={6}>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='rg'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='RG'
//                     error={!!errors?.rg}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     // helperText={errors?.rg?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='dataEmissaoRg'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Data Emissão RG'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.dataEmissaoRg}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('dataEmissaoRg', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='orgaoEmissorRg'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Órgão Emissor RG'
//                     error={!!errors?.orgaoEmissorRg}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='cpf'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='CPF'
//                     error={!!errors?.cpf}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatCPF(e.target.value);
//                       setValue('cpf', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='cnpjMei'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='CNPJ MEI'
//                     placeholder='XX.XXX.XXX/XXXX-XX'
//                     error={!!errors?.cnpjMei}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatCNPJ(e.target.value);
//                       setValue('cnpjMei', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='razaoSocial'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Razão Social'
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.situacaoCadastralRfb}>
//                 <InputLabel>Situação Cadastral RFB</InputLabel>
//                 <Controller
//                   name='situacaoCadastralRfb'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Situação Cadastral RFB'
//                       disabled={props.shouldDisable}
//                     >
//                       {SITUACOES_CADASTRAIS.map((opt) => (
//                         <MenuItem key={opt} value={opt}>
//                           {opt}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='grMotoristaValidade'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='GRM Motorista - Validade'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.grMotoristaValidade}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('grMotoristaValidade', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='dataEmissaoGr'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Data Emissão GR'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.dataEmissaoGr}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('dataEmissaoGr', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='numeroCcm'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Número do CCM'
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='numeroInscricaoInss'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Número (NIS/PIS)'
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatPIS(e.target.value);
//                       setValue('numeroInscricaoInss', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Button
//                 component='label'
//                 role={undefined}
//                 variant='contained'
//                 tabIndex={-1}
//                 startIcon={<CloudUploadIcon />}
//                 fullWidth
//                 sx={{ mt: 1 }}
//                 disabled={props.shouldDisable}
//               >
//                 Upload RG/CNH
//                 <VisuallyHiddenInput
//                   type='file'
//                   onChange={(event) => console.log(event.target.files)}
//                 />
//               </Button>
//             </Grid>
//           </Grid>
//         </CustomTabPanel>
//         <CustomTabPanel value={tabValue} index={2}>
//           <Grid container p={2} mt={4} spacing={6}>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='numeroCnh'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     disabled={
//                       eAjudante || props.isLoading || props.shouldDisable
//                     }
//                     fullWidth
//                     label='Número CNH'
//                     error={!!errors?.numeroCnh}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     onChange={(e) => {
//                       const formatted = f.formatOnlyNumber(e.target.value);
//                       setValue('numeroCnh', String(formatted));
//                       // field.onChange(String(formatted));
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <FormControl fullWidth error={!!errors?.categoriaCnh}>
//                 <InputLabel>Categoria CNH</InputLabel>
//                 <Controller
//                   name='categoriaCnh'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       multiple
//                       {...field}
//                       value={field.value || []}
//                       label='Categoria CNH'
//                       disabled={
//                         eAjudante || props.isLoading || props.shouldDisable
//                       }
//                     >
//                       {CATEGORIAS_CNH.map((cat) => (
//                         <MenuItem key={cat} value={cat}>
//                           {cat}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='dataEmissaoCnh'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     disabled={
//                       eAjudante || props.isLoading || props.shouldDisable
//                     }
//                     fullWidth
//                     label='Data Emissão CNH'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.dataEmissaoCnh}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('dataEmissaoCnh', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='dataVencimentoCnh'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     disabled={
//                       eAjudante || props.isLoading || props.shouldDisable
//                     }
//                     fullWidth
//                     label='Data Vencimento CNH'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.dataVencimentoCnh}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('dataVencimentoCnh', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               {isLoadingUFs ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.ufCnh}>
//                   <InputLabel>UF CNH</InputLabel>
//                   <Controller
//                     name='ufCnh'
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         disabled={
//                           eAjudante || props.isLoading || props.shouldDisable
//                         }
//                         {...field}
//                         value={field.value || ''}
//                         label='UF CNH'
//                       >
//                         {UFS_RESP!.map(({ sigla }) => (
//                           <MenuItem key={sigla} value={sigla}>
//                             {sigla}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                 </FormControl>
//               )}
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               {isLoadingMunicipiosPorUF ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.municipioCnh}>
//                   <InputLabel>Município CNH</InputLabel>
//                   <Controller
//                     name='municipioCnh'
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         disabled={
//                           isLoadingMunicipiosPorUF ||
//                           !habilitacaoUfId ||
//                           eAjudante ||
//                           props.isLoading ||
//                           props.shouldDisable
//                         }
//                         {...field}
//                         label='Município CNH'
//                         value={field.value || ''}
//                       >
//                         {MUNICIPIOS_POR_UF?.map(({ nome }) => (
//                           <MenuItem key={nome} value={nome}>
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
//               <Controller
//                 name='renach'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     disabled={
//                       eAjudante || props.isLoading || props.shouldDisable
//                     }
//                     fullWidth
//                     label='Renach'
//                     error={!!errors?.renach}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 3 }}>
//               <Controller
//                 name='espelho'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     disabled={
//                       eAjudante || props.isLoading || props.shouldDisable
//                     }
//                     fullWidth
//                     label='Espelho'
//                     error={!!errors?.espelho}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </CustomTabPanel>
//         <CustomTabPanel value={tabValue} index={3}>
//           <Grid container p={2} mt={4} spacing={6}>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <Controller
//                 name='rntrc'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='RNTRC'
//                     error={!!errors?.rntrc}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <Controller
//                 name='dataCadastro'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Data Cadastro'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.dataCadastro}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('dataCadastro', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <Controller
//                 name='dataValidade'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Data Validade'
//                     placeholder='DD/MM/AAAA'
//                     error={!!errors?.dataValidade}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatDate(e.target.value);
//                       setValue('dataValidade', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <FormControl fullWidth error={!!errors?.situacao}>
//                 <InputLabel>Situação ANTT</InputLabel>
//                 <Controller
//                   name='situacao'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Situação ANTT'
//                       disabled={props.shouldDisable}
//                     >
//                       {/* FIXME: olocar as infos corretas */}
//                       {['Ativo', 'Inativo'].map((sit) => (
//                         <MenuItem key={sit} value={sit}>
//                           {sit}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CustomTabPanel>
//         <CustomTabPanel value={tabValue} index={4}>
//           <Grid container p={2} mt={4} spacing={6}>
//             <Grid size={{ xs: 12, md: 2 }}>
//               <Controller
//                 name='cep'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='CEP'
//                     error={!!errors?.cep}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                     onChange={(e) => {
//                       const formatted = f.formatCEP(e.target.value);
//                       setValue('cep', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='logradouro'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label='Logradouro'
//                     fullWidth
//                     disabled={isLoadingLogradouroData || props.shouldDisable}
//                     error={!!errors?.logradouro}
//                     // helperText={errors?.logradouro?.message}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 2 }}>
//               <Controller
//                 name='numero'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Número'
//                     error={!!errors?.numero}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='complemento'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label='Complemento'
//                     fullWidth
//                     disabled={isLoadingLogradouroData || props.shouldDisable}
//                     error={!!errors?.complemento}
//                     // helperText={errors?.complemento?.message}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 2 }}>
//               <FormControl fullWidth error={!!errors?.uf}>
//                 <InputLabel>UF</InputLabel>
//                 <Controller
//                   name='uf'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='UF'
//                       disabled={isLoadingLogradouroData || props.shouldDisable}
//                     >
//                       {UFS_RESP?.map(
//                         (
//                           { sigla } // API DE UFS
//                         ) => (
//                           <MenuItem key={sigla} value={sigla}>
//                             {sigla}
//                           </MenuItem>
//                         )
//                       )}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='bairro'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label='Bairro'
//                     fullWidth
//                     disabled={isLoadingLogradouroData || props.shouldDisable}
//                     error={!!errors?.bairro}
//                     // helperText={errors?.bairro?.message}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <Controller
//                 name='municipio'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label='Município'
//                     fullWidth
//                     disabled={isLoadingLogradouroData || props.shouldDisable}
//                     error={!!errors?.municipio}
//                     // helperText={errors?.municipio?.message}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </CustomTabPanel>
//         <CustomTabPanel value={tabValue} index={5}>
//           <Grid container p={2} mt={4} spacing={6}>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.titularPjEmitente}>
//                 <InputLabel>Titular PJ Emitente na NF</InputLabel>
//                 <Controller
//                   name='titularPjEmitente'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Titular PJ Emitente na NF'
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
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
//               <FormControl fullWidth error={!!errors?.prestaServicoTerceiros}>
//                 <InputLabel>Presta Serviço Terceiros</InputLabel>
//                 <Controller
//                   name='prestaServicoTerceiros'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Presta Serviço Terceiros'
//                       disabled={props.shouldDisable}
//                       onChange={(e) => {
//                         const value = e.target.value as string;

//                         setValue('prestaServicoTerceiros', JSON.parse(value));

//                         if (!value) {
//                           setValue('nomeRazaoSocialTerceiros', undefined);
//                           setValue('cnpjTerceiros', undefined);
//                           clearErrors('nomeRazaoSocialTerceiros');
//                           clearErrors('cnpjTerceiros');
//                         }
//                       }}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
//                         <MenuItem key={nome} value={String(value)}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>

//             {/* <Grid size={{ xs: 12, md: 4 }}></Grid> */}
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='nomeRazaoSocialTerceiros'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     // fullWidth={prestaServicoTerceiros == "Sim"}
//                     label='Razão Social Terceiro'
//                     error={!!errors?.nomeRazaoSocialTerceiros}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='cnpjTerceiros'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     disabled={!prestaServicoTerceiros || props.shouldDisable}
//                     fullWidth
//                     label='CNPJ Terceiro'
//                     placeholder='XX.XXX.XXX/XXXX-XX'
//                     error={!!errors?.cnpjTerceiros}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     onChange={(e) => {
//                       const formatted = f.formatCNPJ(e.target.value);
//                       setValue('cnpjTerceiros', formatted);
//                       // field.onChange(formatted);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               {isLoadingBanks ? (
//                 <Skeleton />
//               ) : (
//                 <FormControl fullWidth error={!!errors?.nomeBanco}>
//                   <Controller
//                     name='nomeBanco'
//                     control={control}
//                     render={({ field }) => (
//                       <Autocomplete
//                         {...field}
//                         value={field.value || ''}
//                         onChange={(_, newValue) => {
//                           field.onChange(newValue);
//                         }}
//                         options={BANKS!.map(({ name }) => name)}
//                         disabled={isLoadingBanks || props.shouldDisable}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label='Nome do Banco'
//                             error={!!errors?.nomeBanco}
//                             // helperText={
//                             //   errors?.nomeBanco?.message
//                             // }
//                           />
//                         )}
//                       />
//                     )}
//                   />
//                 </FormControl>
//               )}
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl
//                 fullWidth
//                 error={!!errors?.contaBancariaTitularidadeCnpj}
//               >
//                 <InputLabel>
//                   Conta Bancária Titularidade CNPJ Emitente
//                 </InputLabel>
//                 <Controller
//                   name='contaBancariaTitularidadeCnpj'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       label='Conta Bancária Titularidade CNPJ Emitente'
//                       value={field.value || ''}
//                       disabled={props.shouldDisable}
//                     >
//                       {TRUE_OU_FALSE.map(({ nome, value }) => (
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
//               <Controller
//                 name='codigoBanco'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Código do Banco'
//                     error={!!errors?.codigoBanco}
//                     disabled
//                     value={bankCodeToFillOut || field.value || ''}
//                     slotProps={{
//                       inputLabel: {
//                         shrink: Boolean(bankCodeToFillOut || field.value),
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='numeroConta'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Número da Conta'
//                     error={!!errors?.numeroConta}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 2 }}>
//               <FormControl fullWidth error={!!errors?.tipoConta}>
//                 <InputLabel>Tipo Conta</InputLabel>
//                 <Controller
//                   name='tipoConta'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Conta'
//                       disabled={props.shouldDisable}
//                     >
//                       {TIPOS_CONTA_BANCARIA.map((opt) => (
//                         <MenuItem key={opt} value={opt}>
//                           {opt}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 2 }}>
//               <Controller
//                 name='codigoAgencia'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Código Agência'
//                     error={!!errors?.codigoAgencia}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 2 }}>
//               <Controller
//                 name='digitoAgencia'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Dígito Agência'
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 2 }}>
//               <Controller
//                 name='digitoConta'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Dígito da Conta'
//                     error={!!errors?.digitoConta}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <FormControl fullWidth error={!!errors?.tipoChavePix}>
//                 <InputLabel>Tipo Chave Pix</InputLabel>
//                 <Controller
//                   name='tipoChavePix'
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value || ''}
//                       label='Tipo Chave Pix'
//                       disabled={props.shouldDisable}
//                     >
//                       {TIPOS_CHAVE_PIX.map((opt) => (
//                         <MenuItem key={opt} value={opt}>
//                           {opt}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Controller
//                 name='chavePix'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Chave PIX'
//                     error={!!errors?.chavePix}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={12}>
//               <Controller
//                 name='observacao'
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label='Observação'
//                     multiline
//                     rows={3}
//                     slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
//                     disabled={props.shouldDisable}
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
