import { useGetClients } from '@/api/get-clients';
import { FabButton } from '@/components/elements/fab-button';
import { GenericMRT } from '@/components/elements/generic-mrt';
import { PageHeader } from '@/components/elements/page-header';
import { truncCell } from '@/styles';
import { TClientResponseGrid } from '@/types';
import { Box, Stack, Tooltip } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisteredClients = () => {
  const { data: CLIENTS, isLoading: isLoadingCLients } = useGetClients({});

  const navigate = useNavigate();

  const handleNavigateEdit = useCallback(
    (id: number) => {
      navigate(`/app/clientes/editar/${id}`);
    },
    [navigate],
  );

  const cols = useMemo<MRT_ColumnDef<TClientResponseGrid>[]>(() => {
    return [
      {
        header: 'Ações',
        size: 100,
        Cell: (cell) => (
          <Stack direction='row'>
            <FabButton
              onClick={() => {
                handleNavigateEdit(cell.row.original.id!);
              }}
              icon='VIEW'
              title='Visualizar Cadastro'
            />
          </Stack>
        ),
        grow: false,
        enableResizing: false,
      },
      {
        header: 'Flex',
        accessorKey: 'flex',
        accessorFn: (row) => (row.flex ? 'Sim' : 'Não'),
      },
      {
        header: 'Nome',
        accessorKey: 'nome',
        grow: true,
      },
      {
        header: 'Regiões/Bases',
        accessorFn: (row) => row.regioesBase?.map((r) => r?.nome).join(', '),
        Cell: ({ row }) => {
          const isFlex = row.original.flex;
          const value = !isFlex
            ? row.original.regioesBase.map((r) => r.nome).join(', ')
            : '';

          return (
            <Tooltip title={value} placement='top-start'>
              <div style={truncCell}>{value}</div>
            </Tooltip>
          );
        },
        grow: true,
      },
      {
        header: 'Bairro',
        accessorFn: (row) => row.bairro || '',
        grow: true,
      },
      {
        header: 'Endereço',
        accessorKey: 'logradouro',
        accessorFn: (row) => {
          const isFlex = row.flex;
          return isFlex
            ? `${row?.logradouro}, ${row?.numero} ${
                row?.complemento ? `(${row?.complemento})` : ''
              }, ${row.bairro}, ${row.municipio}, ${row.cep}`
            : '';
        },
        Cell: ({ row }) => {
          const isFlex = row.original.flex;
          const value = isFlex
            ? `${row?.original.logradouro}, ${row?.original.numero} ${
                row?.original.complemento
                  ? `(${row?.original.complemento})`
                  : ''
              }, ${row.original.bairro}, ${row.original.municipio}, ${
                row.original.cep
              }`
            : '';
          return (
            <Tooltip title={value} placement='top-start'>
              <div style={truncCell}>{value}</div>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'cnpj',
        header: 'CNPJ',
        grow: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        grow: true,
      },
      {
        accessorKey: 'telefone',
        header: 'Telefone',
        grow: true,
      },
    ];
  }, [handleNavigateEdit]);

  const handleAdd = () => navigate('/app/clientes/cadastrar');

  return (
    <Stack spacing={6}>
      <PageHeader
        handleAdd={handleAdd}
        subtitle='Gerencie seus clientes e parceiros'
        title='Clientes'
      />

      <Box>
        <GenericMRT
          columns={cols}
          data={CLIENTS || []}
          state={{ isLoading: isLoadingCLients }}
          initialState={{
            columnVisibility: {
              cnpj: false,
              email: false,
              telefone: false,
              logradouro: false,
            },
          }}
        />
      </Box>
    </Stack>
  );
};
