import { axiosInstanceExternal } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

const IBGE_BASE_URL: string = import.meta.env.CLIENT_IBGE_BASE_URL;

export type TMunicipioBase = {
  id: number;
  nome: string;
  municipio: TMunicipio;
};

export type TMunicipio = {
  id: number;
  nome: string;
  microrregiao: TMicrorregiao;
  'regiao-imediata': TRegiaoImediata;
};

export type TMicrorregiao = {
  id: number;
  nome: string;
  mesorregiao: TMesorregiao;
};

export type TMesorregiao = {
  id: number;
  nome: string;
  UF: TUf;
};

export type TUf = {
  id: number;
  sigla: string;
  nome: string;
  regiao: TRegiao;
};

export type TRegiao = {
  id: number;
  sigla: string;
  nome: string;
};

export type TRegiaoImediata = {
  id: number;
  nome: string;
  'regiao-intermediaria': TRegiaoIntermediaria;
};

export type TRegiaoIntermediaria = {
  id: number;
  nome: string;
  UF: TUf;
};

export const getMunicipiosByUFId = async (
  id: number,
): Promise<TMunicipioBase[]> => {
  const axios = axiosInstanceExternal(IBGE_BASE_URL);
  return axios.get(`/localidades/estados/${id}/municipios`);
};

type QueryFnType = typeof getMunicipiosByUFId;

type UseGetMunicipiosByIdOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export const useGetMunicipiosByUFId = ({
  id,
  config,
}: UseGetMunicipiosByIdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetMunicipiosByUFId', id],
    queryFn: () => getMunicipiosByUFId(id),
  });
};
