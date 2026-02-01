import { useGetRegions } from '@/api/get-regions';
import { ChipStatus } from '@/components/elements';
import { FabButton } from '@/components/elements/fab-button';
import { GenericMRT } from '@/components/elements/generic-mrt';
import { PageHeader } from '@/components/elements/page-header';
import { Box, Stack } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRegionSchema } from '../types/regions.type';

export const RegisteredRegions = () => {
  const navigate = useNavigate();

  const handleNavigateEdit = useCallback(
    (id: string) => {
      navigate(`/app/regioes/editar/${id}`);
    },
    [navigate],
  );

  const handleAdd = () => navigate('/app/regioes/cadastrar');

  const { data: regions, isLoading: isLoadingRegions } = useGetRegions();

  const cols = useMemo<MRT_ColumnDef<TRegionSchema>[]>(() => {
    return [
      {
        header: 'Cadastro',
        size: 120,
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
        header: 'Nome',
        accessorKey: 'nome',
      },
      {
        header: 'Ativo',
        accessorKey: 'ativo',
        accessorFn: (row) => {
          return <ChipStatus status={row.ativo} />;
        },
      },
    ];
  }, [handleNavigateEdit]);

  return (
    <Stack spacing={6}>
      <PageHeader
        handleAdd={handleAdd}
        title='Regiões / Bases'
        subtitle='Gerencie suas regiões e bases'
      />

      <Box sx={{ maxHeight: '70vh' }}>
        <GenericMRT
          state={{ isLoading: isLoadingRegions }}
          enableStickyFooter
          columns={cols}
          data={regions || []}
        />
      </Box>
    </Stack>
  );
};
