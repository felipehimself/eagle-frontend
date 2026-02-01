import { axiosInstanceExternal } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

const IBGE_BASE_URL: string = import.meta.env.CLIENT_IBGE_BASE_URL;

export type TUFs = {
  id: number;
  sigla: string;
  nome: string;
  regiao: TUFsRegiao;
};

export type TUFsRegiao = {
  id: number;
  sigla: string;
  nome: string;
};

export const getUFs = async (): Promise<TUFs[]> => {
  const axios = axiosInstanceExternal(IBGE_BASE_URL);
  return axios.get("/localidades/estados?orderBy=nome");
};

type QueryFnType = typeof getUFs;

type UseUFsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetUFs = ({ config }: UseUFsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["useGetUFs"],
    queryFn: getUFs,
  });
};
