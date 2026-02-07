import { PageHeader } from '@/components/elements/page-header';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { usePostRegion } from '../api/post-region';
import { RegionFormComponent } from '../components/region-form-component';
import { TRegionSchema } from '../types/regions.type';

export const AddRegion = () => {
  const [formKey, setFormKey] = useState(1);
  const { mutateAsync: postRegionAsync, isLoading: isPostRegionLoading } =
    usePostRegion();

  const handleSubmit = async (data: TRegionSchema) => {
    try {
      await postRegionAsync(data);
      setFormKey((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack spacing={6}>
      <PageHeader
        disableBackButton={isPostRegionLoading}
        showBackButton
        subtitle='Cadastrar'
        title='Região / Base'
      />

      <RegionFormComponent
        key={formKey}
        isLoading={false}
        onSubmit={handleSubmit}
        shouldDisable={false}
        isSubmitting={isPostRegionLoading}
      />
    </Stack>
  );
};
