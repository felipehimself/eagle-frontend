// import { useGetClients } from "@/api/get-clients";
// import { useGetRegions } from "@/api/get-regions";
// import { PageHeader } from "@/components/elements/page-header";
// import {
//   Autocomplete,
//   Box,
//   Button,
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Skeleton,
//   Stack,
//   TextField,
// } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { linkRegionSchema, TLinkRegionSchema } from "../types/link-region.type";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMemo } from "react";
// import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import { useSearchParams } from "react-router-dom";

// export const LinkRegion = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const clientId = searchParams.get("idDoCliente");
//   const regionsId = searchParams.get("idsDasRegioes"); // string[]
//   console.log({ regionsId });

//   const { data: CLIENTS, isLoading: isLoadingCLients } = useGetClients({});
//   const { data: REGIONS, isLoading: isLoadingRegions } = useGetRegions({});

//   const disabled = useMemo(() => {
//     return isLoadingCLients || isLoadingRegions;
//   }, [isLoadingCLients, isLoadingRegions]);

//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//     getValues,
//     reset,
//   } = useForm<TLinkRegionSchema>({
//     resolver: zodResolver(linkRegionSchema),
//     defaultValues: {
//       idCliente: Number(clientId),
//       idRegiao: regionsId?.split(",")?.map((id) => Number(id)) || [],
//     },
//   });

//   const onSubmit = (data: TLinkRegionSchema) => {
//     console.log(data);
//   };

//   return (
//     <Stack spacing={6}>
//       <PageHeader
//         showBackButton
//         title="Clientes"
//         subtitle="Vincular região/base"
//       />
//       <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
//         <Grid container spacing={2}>
//           <Grid size={{ xs: 12, md: 5.5 }}>
//             {disabled ? (
//               <Skeleton />
//             ) : (
//               <FormControl fullWidth error={!!errors?.idCliente}>
//                 <InputLabel>Cliente</InputLabel>
//                 <Controller
//                   name="idCliente"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       value={field.value}
//                       label="Cliente"
//                       disabled
//                     >
//                       {CLIENTS?.map(({ nome, id }) => (
//                         <MenuItem key={id} value={id}>
//                           {nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             )}
//           </Grid>
//           <Grid size={{ xs: 12, md: 1 }}>
//             <Stack
//               direction="row"
//               justifyContent="center"
//               alignItems="center"
//               sx={{ height: "100%" }}
//             >
//               <CompareArrowsIcon fontSize="small" />
//             </Stack>
//           </Grid>
//           <Grid size={{ xs: 12, md: 5.5 }}>
//             {disabled ? (
//               <Skeleton />
//             ) : (
//               <FormControl fullWidth error={!!errors?.idRegiao}>
//                 <Controller
//                   name="idRegiao"
//                   control={control}
//                   render={({ field }) => (
//                     <Autocomplete
//                       {...field}
//                       multiple
//                       options={REGIONS || []}
//                       getOptionLabel={(option) => option.nome}
//                       isOptionEqualToValue={(option, value) =>
//                         option.id === value.id
//                       }
//                       value={
//                         REGIONS!.filter((r) => field.value?.includes(r.id!)) ||
//                         []
//                       }
//                       onChange={(_, newValue) => {
//                         // Store only IDs in form state
//                         field.onChange(newValue.map((v) => v.id));
//                       }}
//                       disabled={disabled}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Região / Base"
//                           error={!!errors?.idRegiao}
//                           // helperText={
//                           //   errors?.nomeBanco?.message
//                           // }
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               </FormControl>
//             )}
//           </Grid>

//           <Grid size={{ xs: 12, md: 12 }}>
//             <Stack direction="row" justifyContent="flex-end" spacing={2} pt={4}>
//               <Button
//                 disabled={disabled}
//                 type="button"
//                 variant="contained"
//                 color="error"
//               >
//                 Cancelar
//               </Button>
//               <Button disabled={disabled} type="submit" variant="contained">
//                 Salvar
//               </Button>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Stack>
//   );
// };
