import { PageHeader } from '@/components/elements/page-header';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { usePostClient } from '../api/post-client';
import { ClientFormComponent } from '../components/client-form-component';
import { TClientSchema } from '../types/client.type';
import { createClientPayload } from '../utils';

export const AddClient = () => {
  const [formKey, setFormKey] = useState(0);

  const { mutateAsync: postClientAsync, isLoading: isPostClientLoading } =
    usePostClient();

  const onSubmit = async (data: TClientSchema) => {
    try {
      const payload = createClientPayload(data);
      await postClientAsync(payload);
      setFormKey((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={6}>
      <PageHeader
        showBackButton
        subtitle='Cadastrar novo cliente'
        title='Cliente'
      />
      <ClientFormComponent
        key={formKey}
        isLoading={false}
        onSubmit={onSubmit}
        shouldDisable={false}
        isSubmitting={isPostClientLoading}
      />
    </Stack>
  );
};
