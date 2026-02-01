import { useGetRegions } from '@/api/get-regions';
import { useGetVehicles } from '@/api/get-vehicle-vehicles';
import { ChipStatus } from '@/components/elements';
import { FabButton } from '@/components/elements/fab-button';
import { GenericMRT } from '@/components/elements/generic-mrt';
import { PageHeader } from '@/components/elements/page-header';
import { Formatter } from '@/utils';
import { Box, Stack } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TVehicleSchema } from '../types/vehicle.type';

const f = new Formatter();

export const RegisteredVehicles = () => {
  const { data: vehicles, isLoading: isLoadingVehicles } = useGetVehicles({});

  const { data: regions, isLoading: isLoadingRegions } = useGetRegions({});

  const navigate = useNavigate();

  const handleNavigateEdit = useCallback(
    (id: string) => {
      navigate(`/app/veiculos/editar/${id}`);
    },
    [navigate],
  );

  const handleAdd = () => navigate('/app/veiculos/cadastrar');

  const cols = useMemo<MRT_ColumnDef<TVehicleSchema>[]>(() => {
    return [
      {
        header: 'Cadastro',
        size: 110,
        align: 'center',
        enableResizing: false,
        Cell: (cell) => (
          <FabButton
            onClick={() => {
              handleNavigateEdit(String(cell.row.original.id));
            }}
            icon='VIEW'
            title='Visualizar cadastro'
          />
        ),
      },
      {
        header: 'Placa',
        accessorKey: 'placa',
        accessorFn: (row) => f.parsePlaca(row.placa),
        size: 125,
      },
      {
        header: 'Proprietário',
        accessorKey: 'nome',
      },
      {
        header: 'Região Base',
        accessorKey: 'regiaoBase',
        accessorFn: (row) => {
          const region = regions?.find((r) => r.id === row.regiaoBaseId);
          return region?.nome;
        },
      },
      {
        header: 'Exercício CRLV',
        accessorKey: 'exercicioCrlv',
        size: 186,
      },
      {
        header: 'Vencimento CRLV',
        accessorKey: 'vencimentoCrlv',
        accessorFn: (row) =>
          row.vencimentoCrlv
            ? new Date(row.vencimentoCrlv).toLocaleDateString('pt-BR')
            : '',
        grow: true,
        size: 204,
      },
      {
        header: 'Gravame',
        accessorKey: 'gravame',
        accessorFn: (row) => {
          return <ChipStatus status={row.gravame} />;
        },
      },

      {
        header: 'Ativo',
        accessorKey: 'ativo',
        accessorFn: (row) => {
          return <ChipStatus status={row.ativo} />;
        },
      },
    ];
  }, [handleNavigateEdit, regions]);

  return (
    <Stack spacing={6}>
      <PageHeader
        handleAdd={handleAdd}
        subtitle='Gerencie os veículos prestadores de serviço'
        title='Veículos e Placas'
      />

      <Box sx={{ maxHeight: '70vh' }}>
        <GenericMRT
          enableStickyFooter
          columns={cols}
          data={vehicles || []}
          state={{ isLoading: isLoadingVehicles || isLoadingRegions }}
        />
      </Box>
    </Stack>
  );
};
