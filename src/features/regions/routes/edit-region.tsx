import { useGetRegionById } from '@/api/get-region-by-id';
import { PageHeader } from '@/components/elements/page-header';
import { TFormRef } from '@/types';
import { Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePutRegion } from '../api/put-region';
import { RegionFormComponent } from '../components/region-form-component';
import { TRegionSchema } from '../types/regions.type';

export const EditRegion = () => {
  const { id } = useParams();
  const [shouldDisable, setShouldDisable] = useState(true);

  const formRef = useRef<TFormRef>(null);

  const { data, isLoading } = useGetRegionById({
    config: {
      enabled: Boolean(id),
    },
    id: Number(id!),
  });

  const { mutate: putRegion, isLoading: isLoadingPut } = usePutRegion();

  const handleSubmit = (data: TRegionSchema) => {
    setShouldDisable(true);
    putRegion(data);
  };

  const handleToggleEditBtn = () => {
    setShouldDisable((prev) => {
      const next = !prev;

      if (prev === false && next === true) {
        formRef.current?.resetForm();
      }

      return next;
    });
  };

  return (
    <Stack spacing={6}>
      <PageHeader
        handleEdit={handleToggleEditBtn}
        subtitle={shouldDisable ? 'Dados do cadastro' : 'Editando cadastro'}
        title='Região / Base'
        showBackButton
        disableBackButton={isLoadingPut}
        disableEditButton={isLoading || isLoadingPut}
      />
      <RegionFormComponent
        ref={formRef}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        shouldDisable={shouldDisable}
        initialData={data}
        isSubmitting={isLoadingPut}
      />
    </Stack>
  );
};
