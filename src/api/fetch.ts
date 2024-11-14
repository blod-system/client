import axios, { AxiosInstance, AxiosResponse } from "axios";

type ApiParams<T> = {
  apiPath: string;
  restfulParams?: (string | number)[];
  data?: T
}

type ApiResponse<T> = {
  status: number;
  message?: string;
  data?: T
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getApi<T>(params: ApiParams<T>): Promise<AxiosResponse> {
  const { apiPath, restfulParams } = params
  const urlParam = restfulParams?.reduce<null | string>((result, item) => {
    if (item) {
      result = result ? result : ''
      return result + '/' + item
    }
    return result
  }, null)
  const url = urlParam ? apiPath + urlParam : apiPath
  const response = await axiosInstance.get(url);

  return response;
}

export async function postApi<T, R>(params: ApiParams<T>): Promise<AxiosResponse<ApiResponse<R>>> {
  const { apiPath, data } = params
  const response = await axiosInstance.post(apiPath, data);

  return response;
}

export async function putApi<T, R>(params: ApiParams<T>): Promise<ApiResponse<ApiResponse<R>>> {
  const { apiPath, data } = params
  const response = await axiosInstance.put(apiPath, data);

  return response;
}