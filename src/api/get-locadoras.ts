import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { TLocadora } from '@/types';
import { Formatter } from '@/utils/common';
import { useQuery } from 'react-query';

const f = new Formatter();

export const getLocadoras = async () => {
  const axios = axiosInstance();
  const data = (await axios.get(API_ROUTES.Locadoras.url)) as TLocadora[];

  return data.map((item) => {
    const formattedCNPJ = f.formatCNPJ(item.cnpj || '');
    return { ...item, cnpj: formattedCNPJ };
  });
};

type QueryFnType = typeof getLocadoras;

type UseGetLocadorasOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetLocadoras = ({ config }: UseGetLocadorasOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetLocadoras'],
    queryFn: getLocadoras,
  });
};
