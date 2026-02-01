import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { TClientResponse, TClientResponseGrid } from '@/types';
import { Formatter } from '@/utils/common';
import { useQuery } from 'react-query';

const f = new Formatter();

export const getClients = async () => {
  const axios = axiosInstance();
  const data = await axios.get(API_ROUTES.Clientes.url);

  const clients = data as unknown as TClientResponse[];

  const res: TClientResponseGrid[] = clients.map((item) => {
    const sanitizedCNPJ = f.formatCNPJ(item?.cnpj || '');
    const sanitizedCEP = f.formatCEP(
      item?.pessoaTipo?.pessoa?.enderecos?.[0]?.cep || ''
    );
    const sanitizedTelefone = f.formatPhone(
      item?.pessoaTipo?.pessoa?.telefone || ''
    );

    return {
      id: item.id!,
      cnpj: sanitizedCNPJ,
      flex: item.isFlex,
      nome: item?.pessoaTipo?.pessoa?.nome,
      bairro: item?.pessoaTipo?.pessoa?.enderecos?.[0]?.bairro || undefined,
      cep: sanitizedCEP,
      complemento:
        item?.pessoaTipo?.pessoa?.enderecos?.[0]?.complemento || undefined,
      email: item?.pessoaTipo?.pessoa?.email,
      logradouro:
        item?.pessoaTipo?.pessoa?.enderecos?.[0]?.logradouro || undefined,
      municipio: item?.pessoaTipo?.pessoa?.enderecos?.[0]?.cidade || undefined,
      numero: item?.pessoaTipo?.pessoa?.enderecos?.[0]?.numero || undefined,
      telefone: sanitizedTelefone,
      uf: item?.pessoaTipo?.pessoa?.enderecos?.[0]?.uf || undefined,
      regioesBase: item.regioesBase,
    };
  });

  return res;
};

type QueryFnType = typeof getClients;

type UseGetClientsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetClients = ({ config }: UseGetClientsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetClients'],
    queryFn: getClients,
  });
};
