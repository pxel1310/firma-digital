import useSWR, { SWRConfiguration } from "swr";
import { ISignature, IUser, UserAll } from "../interfaces";

export const useSignatures = (config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ISignature[]>("/api/signature/", config);

  return {
    dataSigs: data || [],
    isLoading1: !error && !data,
    isError: error,
  };
};

export const useSignature = (slug: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ISignature>(`/api/signature/${slug}`, config);

  return {
    dataSig: data || {},
    isLoading2: !error && !data,
    isError: error,
  };
};

export const useUsers = (config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<UserAll[]>("/api/user/allUsers", config);

  return {
    users: data || [],
    isLoading3: !error && !data,
    isError: error,
  };
};
