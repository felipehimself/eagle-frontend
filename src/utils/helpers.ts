import { TIPOS_VEICULO_POR_CLIENTE } from '@/constants';

export const getVehicleByClient = (
  client: string | undefined,
  isFlex: boolean
) => {
  if (!client) return [];
  if (isFlex)
    return TIPOS_VEICULO_POR_CLIENTE[
      'flex' as keyof typeof TIPOS_VEICULO_POR_CLIENTE
    ];
  return TIPOS_VEICULO_POR_CLIENTE[
    client as keyof typeof TIPOS_VEICULO_POR_CLIENTE
  ];
};
