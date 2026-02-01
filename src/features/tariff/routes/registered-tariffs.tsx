// import { GenericMRT } from '@/components/elements/generic-mrt';
// import { PageHeader } from '@/components/elements/page-header';
// import { Box, Stack } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// export const RegisteredTariffs = () => {
//   const navigate = useNavigate();

//   // const handleNavigateEdit = (id: string) => {
//   //   navigate(`/app/motoristas/editar/${id}`);
//   // };

//   const handleAdd = () => navigate('/app/tarifario/cadastrar');

//   // const cols = useMemo<MRT_ColumnDef<TDriverSchema>[]>(() => {
//   //   return [
//   //     {
//   //       header: "Cadastro",
//   //       size: 110,
//   //       align: "center",
//   //       enableResizing: false,
//   //       Cell: (cell) => (
//   //         <FabButton
//   //           onClick={() => {
//   //             handleNavigateEdit(String(cell.row.original.id));
//   //           }}
//   //           icon="VIEW"
//   //           title="Visualizar cadastro"
//   //         />
//   //       ),
//   //     },

//   //     {
//   //       accessorKey: "nome",
//   //       header: "Nome",
//   //       grow: true,
//   //     },
//   //     {
//   //       accessorKey: "celular",
//   //       header: "Celular",
//   //     },
//   //     {
//   //       accessorKey: "email",
//   //       header: "E-mail",
//   //     },
//   //     {
//   //       accessorKey: "ufNaturalidade",
//   //       header: "UF",
//   //     },
//   //     {
//   //       accessorKey: "placa",
//   //       header: "Placa",
//   //     },
//   //     {
//   //       accessorKey: "rg",
//   //       header: "RG",
//   //     },
//   //     {
//   //       accessorKey: "cpf",
//   //       header: "CPF",
//   //     },
//   //     {
//   //       accessorKey: "razaoSocial",
//   //       header: "Razão Social",
//   //     },
//   //     {
//   //       accessorKey: "numeroCnh",
//   //       header: "CNH",
//   //     },
//   //   ];
//   // }, []);

//   return (
//     <Stack spacing={6}>
//       <PageHeader
//         handleAdd={handleAdd}
//         title='Tarifário'
//         subtitle='Cadastrados de tarifário'
//       />

//       <Box sx={{ maxHeight: '70vh' }}>
//         <GenericMRT enableStickyFooter columns={[]} data={[]} />
//       </Box>
//     </Stack>
//   );
// };
