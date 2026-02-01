import { axiosInstanceExternal } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

const BRASIL_API_BASE_URL: string = import.meta.env.CLIENT_BRASIL_API_BASE_URL;

export type TBank = {
  ispb: string;
  name: string;
  code: number;
  fullName: string;
};

export const getBank = async (): Promise<TBank[]> => {
  const axios = axiosInstanceExternal(BRASIL_API_BASE_URL);
  return axios.get("/api/banks/v1");
};

type QueryFnType = typeof getBank;

type UseGetBanksOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetBanks = ({ config }: UseGetBanksOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["useGetBanks"],
    queryFn: getBank,
  });
};
