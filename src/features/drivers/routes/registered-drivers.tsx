// import { FabButton } from '@/components/elements/fab-button';
// import { GenericMRT } from '@/components/elements/generic-mrt';
// import { PageHeader } from '@/components/elements/page-header';
// import { Box, Stack } from '@mui/material';
// import { MRT_ColumnDef } from 'material-react-table';
// import { useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TDriverSchema } from '../types/driver.type';

// const mockDrivers: TDriverSchema[] = [
//   {
//     id: 1,

//     apto: true,
//     cliente: ['Cliente A', 'Cliente B'],
//     status: 'Ativo',
//     tipoDeCadastro: 'Completo',
//     tipoDeVinculo: 'PJ',
//     dataInicio: '2023/01/15',
//     nome: 'João Silva Santos',
//     dataNascimento: '1985/05/20',
//     celular: '(11) 99999-1234',
//     email: 'joao.silva@email.com',
//     ufNaturalidade: 'SP',
//     possuiContratoAssinado: true,
//     donoVeiculo: true,
//     placa: 'ABC1D23',
//     veiculoResponsabilidade: true,
//     numeroIdMeli: 'ML123456',
//     numeroIdShopee: 'SP123456',

//     rg: '12.345.678-9',
//     dataEmissaoRg: '15/03/2010',
//     orgaoEmissorRg: 'SSP-SP',
//     cpf: '123.456.789-00',
//     cnpjMei: '12.345.678/0001-90',
//     razaoSocial: 'João Silva Santos MEI',
//     situacaoCadastralRfb: 'Regular',
//     grMotoristaValidade: '15/03/2025',
//     dataEmissaoGr: '15/03/2020',
//     numeroCcm: '123456',
//     numeroInscricaoInss: '12345678901',

//     numeroCnh: '12345678901',
//     categoriaCnh: ['C'],
//     dataEmissaoCnh: '10/05/2020',
//     dataVencimentoCnh: '10/05/2025',
//     uf: 'SP',
//     municipio: 'São Paulo',
//     renach: '123456789',
//     espelho: 'ABCD1234',
//     uploadCnhRg: '/documents/cnh_joao.jpg',

//     rntrc: '123456789',
//     dataCadastro: '20/01/2023',
//     dataValidade: '20/01/2026',
//     situacao: 'Ativo',

//     cep: '01234-567',
//     logradouro: 'Rua das Flores',
//     numero: '123',
//     complemento: 'Apto 45',
//     bairro: 'Centro',
//     ufCnh: 'SP',
//     municipioCnh: 'São Paulo',

//     titularPjEmitente: true,
//     prestaServicoTerceiros: false,
//     nomeRazaoSocialTerceiros: '',
//     cnpjTerceiros: '',
//     contaBancariaTitularidadeCnpj: true,
//     nomeBanco: 'Banco do Brasil',
//     codigoBanco: '001',
//     codigoAgencia: '1234',
//     digitoAgencia: '1',
//     tipoConta: 'Corrente',
//     numeroConta: '12345-6',
//     digitoConta: '7',
//     chavePix: '123.456.789-00',
//     tipoChavePix: 'CPF/CNPJ',
//     observacao: 'Conta principal',
//   },
// ];

// export const RegisteredDrivers = () => {
//   const navigate = useNavigate();

//   const handleNavigateEdit = useCallback(
//     (id: string) => {
//       navigate(`/app/motoristas/editar/${id}`);
//     },
//     [navigate]
//   );

//   const handleAdd = () => navigate('/app/motoristas/cadastrar');

//   const cols = useMemo<MRT_ColumnDef<TDriverSchema>[]>(() => {
//     return [
//       {
//         header: 'Cadastro',
//         size: 110,
//         align: 'center',
//         enableResizing: false,
//         Cell: (cell) => (
//           <FabButton
//             onClick={() => {
//               handleNavigateEdit(String(cell.row.original.id));
//             }}
//             icon='VIEW'
//             title='Visualizar cadastro'
//           />
//         ),
//       },

//       {
//         accessorKey: 'nome',
//         header: 'Nome',
//         grow: true,
//       },
//       {
//         accessorKey: 'celular',
//         header: 'Celular',
//       },
//       {
//         accessorKey: 'email',
//         header: 'E-mail',
//       },
//       {
//         accessorKey: 'ufNaturalidade',
//         header: 'UF',
//       },
//       {
//         accessorKey: 'placa',
//         header: 'Placa',
//       },
//       {
//         accessorKey: 'rg',
//         header: 'RG',
//       },
//       {
//         accessorKey: 'cpf',
//         header: 'CPF',
//       },
//       {
//         accessorKey: 'razaoSocial',
//         header: 'Razão Social',
//       },
//       {
//         accessorKey: 'numeroCnh',
//         header: 'CNH',
//       },
//     ];
//   }, [handleNavigateEdit]);

//   return (
//     <Stack spacing={6}>
//       <PageHeader
//         handleAdd={handleAdd}
//         subtitle='Gerencie seus motoristas e ajudantes'
//         title='Motoristas e Ajudantes'
//       />

//       <Box sx={{ maxHeight: '70vh' }}>
//         <GenericMRT enableStickyFooter columns={cols} data={mockDrivers} />
//       </Box>
//     </Stack>
//   );
// };
