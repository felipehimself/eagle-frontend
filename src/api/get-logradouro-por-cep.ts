import { axiosInstanceExternal } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

const CEP_BASE_URL: string = import.meta.env.CLIENT_CEP_BASE_URL;

export type TLogradouroPorCep = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export const getLogradouroPorCEP = async (
  cep: string
): Promise<TLogradouroPorCep> => {
  const axios = axiosInstanceExternal(CEP_BASE_URL);
  return axios.get(`/${cep}/json`);
};

type QueryFnType = typeof getLogradouroPorCEP;

type UseLogradouroPorCEPOptions = {
  config?: QueryConfig<QueryFnType>;
  cep: string;
};

export const useGetLogradouroPorCEP = ({
  config,
  cep,
}: UseLogradouroPorCEPOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["useGetLogradouroPorCEP", cep],
    queryFn: () => getLogradouroPorCEP(cep),
  });
};
