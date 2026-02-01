// import { axiosInstance } from "@/lib/axios";
// import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
// import { useQuery } from "react-query";
// import { sleep } from "@/utils/common";
// import { MOCK_DRIVER_RESPONSE } from "@/mocks/mock-driver-response";

// export const getDriverData = async (
//   id: string
// ): Promise<typeof MOCK_DRIVER_RESPONSE> => {
//   // const axios = axiosInstance();
//   // return axios.get("/api/banks/v1");
//   await sleep(2000);

//   return MOCK_DRIVER_RESPONSE;
// };

// type QueryFnType = typeof getDriverData;

// type UseGetDriverOptions = {
//   config?: QueryConfig<QueryFnType>;
//   id: string;
// };

// export const useGetDriverData = ({ config, id }: UseGetDriverOptions) => {
//   return useQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: ["useGetDriverData", id],
//     queryFn: () => getDriverData(id),
//   });
// };
