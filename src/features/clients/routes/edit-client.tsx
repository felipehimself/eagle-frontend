import { useGetClientById } from '@/api/get-client-by-id';
import { PageHeader } from '@/components/elements/page-header';
import { TFormRef } from '@/types';
import { Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePutClient } from '../api/put-client';
import { ClientFormComponent } from '../components/client-form-component';
import { TClientSchema } from '../types/client.type';
import { createClientPayload } from '../utils';

export const EditClient = () => {
  const { id } = useParams();
  const [shouldDisable, setShouldDisable] = useState(true);
  const formRef = useRef<TFormRef>(null);

  const { data: clientData, isLoading: isLoadingClient } = useGetClientById({
    id: String(id),
    config: {
      enabled: Boolean(id),
    },
  });

  const { mutate: putClient, isLoading: isLoadingPut } = usePutClient();

  const handleSubmit = (data: TClientSchema) => {
    setShouldDisable(true);
    const payload = createClientPayload(data);
    putClient(payload);
  };

  return (
    <Stack spacing={6}>
      <PageHeader
        handleEdit={() => setShouldDisable((prev) => !prev)}
        subtitle={shouldDisable ? 'Dados do cadastro' : 'Editando cadastro'}
        title='Clientes'
        showBackButton
        disableBackButton={isLoadingPut}
        disableEditButton={isLoadingClient || isLoadingPut}
      />

      <ClientFormComponent
        ref={formRef}
        isLoading={isLoadingClient}
        onSubmit={handleSubmit}
        shouldDisable={shouldDisable}
        isSubmitting={isLoadingPut}
        initialData={clientData}
      />
    </Stack>
  );
};
